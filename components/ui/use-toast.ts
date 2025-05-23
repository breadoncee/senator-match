"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000;

type ToasterToast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

enum ActionType {
  ADD_TOAST,
  UPDATE_TOAST,
  DISMISS_TOAST,
  REMOVE_TOAST,
}

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type Action =
  | {
      type: ActionType.ADD_TOAST;
      toast: ToasterToast;
    }
  | {
      type: ActionType.UPDATE_TOAST;
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType.DISMISS_TOAST;
      toastId?: string;
    }
  | {
      type: ActionType.REMOVE_TOAST;
      toastId?: string;
    };

type State = {
  toasts: ToasterToast[];
};

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case ActionType.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case ActionType.DISMISS_TOAST: {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
              }
            : t
        ),
      };
    }
    case ActionType.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

function addToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: ActionType.REMOVE_TOAST,
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}

type Toast = Omit<ToasterToast, "id">;

function dispatch(action: Action) {
  state = reducer(state, action);
  listeners.forEach((listener) => {
    listener(state);
  });
}

let state: State = { toasts: [] };
const listeners: ((state: State) => void)[] = [];

function useToast() {
  const [toastState, setToastState] = useState<State>(state);

  useEffect(() => {
    listeners.push(setToastState);
    return () => {
      const index = listeners.indexOf(setToastState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  const toast = useCallback(({ ...props }: Toast) => {
    const id = genId();

    const update = (props: Toast) =>
      dispatch({
        type: ActionType.UPDATE_TOAST,
        toast: { ...props, id },
      });
    const dismiss = () =>
      dispatch({ type: ActionType.DISMISS_TOAST, toastId: id });

    dispatch({
      type: ActionType.ADD_TOAST,
      toast: {
        ...props,
        id,
      },
    });

    return {
      id: id,
      dismiss,
      update,
    };
  }, []);

  return {
    ...toastState,
    toast,
    dismiss: (toastId?: string) =>
      dispatch({ type: ActionType.DISMISS_TOAST, toastId }),
  };
}

export { useToast, type Toast };
