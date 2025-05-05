"use client";

import { useSurvey } from "@/context/survey-context";
import { ResultsTemplate } from "./organisms/results-template";
import { useAnalytics } from "@/hooks/use-analytics";
import { useEffect } from "react";

export const ResultsScreen = () => {
  const { matches, resetSurvey, setCurrentScreen, sessionId } = useSurvey();
  const { trackEvent } = useAnalytics();

  // Track when results are viewed
  useEffect(() => {
    trackEvent("Results", "View_Results", `Match_Count_${matches.length}`);
  }, [trackEvent, matches.length]);

  const handleRestart = () => {
    trackEvent("Results", "Restart_Survey", "From_Results_Page");
    resetSurvey();
  };

  const handleShare = () => {
    trackEvent("Results", "Share_Results", sessionId || "No_Session_ID");
    setCurrentScreen("share_claim");
  };

  return (
    <ResultsTemplate
      matches={matches}
      onShare={handleShare}
      onRestart={handleRestart}
    />
  );
};
