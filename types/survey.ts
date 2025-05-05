export type SurveyResponse = {
  questionId: string;
  answer: string | string[];
};

export type Candidate = {
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

export type LoadingStatus =
  | "preparing"
  | "sending"
  | "matching"
  | "analyzing"
  | "complete";
export type ScreenType =
  | "landing"
  | "survey"
  | "loading"
  | "results"
  | "share_claim";

export type SurveyContextType = {
  currentScreen: ScreenType;
  currentQuestionIndex: number;
  responses: SurveyResponse[];
  matches: Candidate[];
  sessionId: string | null;
  loadingStatus: LoadingStatus;
  setCurrentScreen: (screen: ScreenType) => void;
  setCurrentQuestionIndex: (index: number) => void;
  addResponse: (response: SurveyResponse) => void;
  setMatches: (matches: Candidate[]) => void;
  setSessionId: (id: string) => void;
  setLoadingStatus: (status: LoadingStatus) => void;
  resetSurvey: () => void;
};
