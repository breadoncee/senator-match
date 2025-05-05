"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import {
  type SurveyResponse,
  type Candidate,
  type SurveyContextType,
  type ScreenType,
  type LoadingStatus,
} from "@/types/survey";

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider = ({ children }: { children: ReactNode }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("landing");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [matches, setMatches] = useState<Candidate[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] =
    useState<LoadingStatus>("preparing");

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
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
};
