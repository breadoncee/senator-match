"use client";

import { useSurvey } from "@/context/survey-context";
import { ResultsTemplate } from "./organisms/results-template";
export default function ResultsScreen() {
  const { matches, resetSurvey, setCurrentScreen } = useSurvey();

  const handleRestart = () => {
    resetSurvey();
  };

  const handleShare = () => {
    setCurrentScreen("share_claim");
  };

  return (
    <ResultsTemplate
      matches={matches}
      onShare={handleShare}
      onRestart={handleRestart}
    />
  );
}
