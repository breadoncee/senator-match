"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

type SurveyResponse = {
  questionId: string;
  answer: string | string[];
};

type Candidate = {
  candidateId: string;
  name: string;
  party: string;
  matchScore: number;
  keyStances: string[];
  explanation: string;
  imageUrl?: string;
  isTopMatch?: boolean;
  match_request_id?: string;
};

type SurveyContextType = {
  currentScreen: "landing" | "survey" | "loading" | "results" | "share_claim";
  currentQuestionIndex: number;
  responses: SurveyResponse[];
  matches: Candidate[];
  sessionId: string | null;
  loadingStatus:
    | "preparing"
    | "sending"
    | "matching"
    | "analyzing"
    | "complete";
  setCurrentScreen: (
    screen: "landing" | "survey" | "loading" | "results" | "share_claim"
  ) => void;
  setCurrentQuestionIndex: (index: number) => void;
  addResponse: (response: SurveyResponse) => void;
  setMatches: (matches: Candidate[]) => void;
  setSessionId: (id: string) => void;
  setLoadingStatus: (
    status: "preparing" | "sending" | "matching" | "analyzing" | "complete"
  ) => void;
  resetSurvey: () => void;
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<
    "landing" | "survey" | "loading" | "results" | "share_claim"
  >("landing");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [matches, setMatches] = useState<Candidate[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<
    "preparing" | "sending" | "matching" | "analyzing" | "complete"
  >("preparing");

  const addResponse = (response: SurveyResponse) => {
    setResponses((prev) => {
      const existingIndex = prev.findIndex(
        (r) => r.questionId === response.questionId
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = response;
        return updated;
      }
      return [...prev, response];
    });
  };

  const resetSurvey = () => {
    setCurrentScreen("landing");
    setCurrentQuestionIndex(0);
    setResponses([]);
    setMatches([]);
    setSessionId(null);
    setLoadingStatus("preparing");
  };

  return (
    <SurveyContext.Provider
      value={{
        currentScreen,
        currentQuestionIndex,
        responses,
        matches,
        sessionId,
        loadingStatus,
        setCurrentScreen,
        setCurrentQuestionIndex,
        addResponse,
        setMatches,
        setSessionId,
        setLoadingStatus,
        resetSurvey,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
}
