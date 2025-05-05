"use client";

import { useEffect, useState } from "react";
import { SurveyProvider, useSurvey } from "@/context/survey-context";
import { surveyQuestions } from "@/data/survey-questions";
import {
  matchCandidates,
  generateSessionId,
} from "@/services/matching-service";
import { ResultsScreen } from "@/components/results-screen";
import { LoadingScreen } from "@/components/loading-screen";

// Generate random responses outside of the component to avoid re-generation on each render
function generateRandomResponses() {
  return surveyQuestions.map((question) => {
    let answer: string | string[];

    switch (question.inputType) {
      case "radio":
        // Pick a random option
        if (question.options && question.options.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * question.options.length
          );
          answer = question.options[randomIndex].value;
        } else {
          answer = "";
        }
        break;

      case "slider":
        // Generate a random value between min and max
        const min = question.min || 1;
        const max = question.max || 5;
        answer = String(Math.floor(Math.random() * (max - min + 1)) + min);
        break;

      case "checkbox":
        // Select a random number of options
        if (question.options && question.options.length > 0) {
          const numOptions =
            Math.floor(Math.random() * question.options.length) + 1;
          const shuffled = [...question.options].sort(
            () => 0.5 - Math.random()
          );
          answer = shuffled.slice(0, numOptions).map((opt) => opt.value);
        } else {
          answer = [];
        }
        break;

      default:
        answer = "";
    }

    return {
      questionId: question.id,
      answer,
    };
  });
}

function RandomResultsContent() {
  const { setCurrentScreen, addResponse, setMatches, setSessionId } =
    useSurvey();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      // Set the current screen to loading
      setCurrentScreen("loading");

      // Generate random responses
      const randomResponses = generateRandomResponses();

      // Add all responses at once to avoid multiple re-renders
      randomResponses.forEach((response) => {
        addResponse(response);
      });

      try {
        // Generate matches based on random responses
        const matchResults = await matchCandidates(
          randomResponses,
          surveyQuestions
        );

        // Generate a session ID for sharing
        const newSessionId = await generateSessionId();
        setSessionId(newSessionId);

        // Set the matches and go to results screen
        setMatches(matchResults);
        setCurrentScreen("results");
        setIsLoading(false);
      } catch (error) {
        console.error("Error generating matches:", error);
        // Handle error
        setIsLoading(false);
      }
    }

    fetchResults();
  }, [addResponse, setMatches, setSessionId, setCurrentScreen]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <ResultsScreen />;
}

export default function RandomResultsPage() {
  return (
    <SurveyProvider>
      <RandomResultsContent />
    </SurveyProvider>
  );
}
