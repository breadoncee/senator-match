import type React from "react";
import { type Candidate } from "../survey";

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export type LoadingScreenProps = {
  status?: "preparing" | "sending" | "matching" | "analyzing" | "complete";
};

export type ShareClaimScreenProps = {
  matches: Candidate[];
  sessionId: string | null;
};

export type SurveyScreenProps = {};
