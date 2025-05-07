"use client";

import { candidates } from "@/data/mock-candidates";
import type { SurveyQuestion } from "@/data/survey-questions";
import { surveyQuestions } from "@/data/survey-questions";

type SurveyResponse = {
  questionId: string;
  answer: string | string[];
};

export type MatchResult = {
  candidateId: string;
  name: string;
  party: string;
  matchScore: number;
  keyStances: string[];
  explanation: string;
  imageUrl: string;
  isTopMatch?: boolean;
  match_request_id: string;
};

// Types for API requests and responses
export type QuestionAnswer = {
  question_id: string;
  question: string;
  answer: string;
};

export type CreateMatchRequest = {
  question_answer: QuestionAnswer[];
};

export type Match = {
  score: number;
  label: string;
};

export type KeyStance = {
  issue: string;
  stance: string;
};

export type MatchResponse = {
  match_request_id: string;
  candidate_id: string;
  name: string;
  party: string;
  image_url: string;
  match: Match;
  why_this_match: string;
  key_stances: string[];
  additional_info: string;
  bailiwick: string;
  birth_date: string;
  education: Record<string, any>;
  notable_legislation?: string[];
  political_experience: any;
  years_of_service?: number;
  policy_focus?: string[];
};

// Base URL for API
const API_BASE_URL =
  "https://cyv2izcdgrhprua6xlmzefbp2a0fptfh.lambda-url.ap-southeast-2.on.aws/api";
// Format responses for API submission
export const formatResponsesForAPI = (
  responses: { questionId: string; answer: string | string[] }[],
  questions: SurveyQuestion[]
): QuestionAnswer[] => {
  return responses.map((response) => {
    // Find the full question text
    const question = questions.find((q) => q.id === response.questionId);

    // Format answer for array types (checkboxes)
    const formattedAnswer = Array.isArray(response.answer)
      ? response.answer.join(", ")
      : response.answer;

    return {
      question_id: response.questionId,
      question: question?.text || "",
      answer: formattedAnswer,
    };
  });
};

// Create a match by sending survey responses to API
export const createMatch = async (
  responses: { questionId: string; answer: string | string[] }[]
): Promise<MatchResponse[]> => {
  try {
    const formattedResponses = formatResponsesForAPI(
      responses,
      surveyQuestions
    );

    const requestBody: CreateMatchRequest = {
      question_answer: formattedResponses,
    };

    const response = await fetch(`${API_BASE_URL}/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating match:", error);
    throw error;
  }
};

// Get match results by ID
export const getMatchById = async (
  matchRequestId: string
): Promise<MatchResponse[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/match/${matchRequestId}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting match results:", error);
    throw error;
  }
};

// Generate a unique session ID
export const generateSessionId = async (): Promise<string> => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
};

// Match candidates - will use our new API service
export const matchCandidates = async (
  responses: { questionId: string; answer: string | string[] }[],
  questions: SurveyQuestion[],
  setLoadingStatus?: (
    status: "preparing" | "sending" | "matching" | "analyzing" | "complete"
  ) => void
): Promise<MatchResult[]> => {
  try {
    // Update loading status to sending explicitly
    setLoadingStatus?.("sending");

    // Short delay before API call to ensure UI shows sending state
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Call the API to get matches
    const apiMatches = await createMatch(responses);

    // Update loading status to matching
    setLoadingStatus?.("matching");

    // Simulate processing time in the matching phase with incremental steps
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Halfway through matching phase - this helps ensure progress beyond 45%
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update to analyzing
    setLoadingStatus?.("analyzing");

    // Simulate analysis time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Transform API response to match the expected MatchResult format for the UI
    const results = apiMatches.map((match) => ({
      candidateId: match.candidate_id,
      name: match.name,
      party: match.party || "Independent",
      matchScore: match.match.score,
      keyStances: match.key_stances,
      explanation: match.why_this_match,
      imageUrl: match.image_url,
      isTopMatch: match.match.label === "High Match",
      match_request_id: match.match_request_id,
    }));

    // Completing
    setLoadingStatus?.("complete");
    await new Promise((resolve) => setTimeout(resolve, 500));

    return results;
  } catch (error) {
    console.error("Error in matchCandidates:", error);
    throw error;
  }
};

// Retrieve match by ID and convert to UI format
export const getMatchResultsById = async (
  matchRequestId: string
): Promise<MatchResult[]> => {
  try {
    // Get match results from API
    const apiMatches = await getMatchById(matchRequestId);

    // Transform API response to match the expected format for the UI
    return apiMatches.map((match) => ({
      candidateId: match.candidate_id,
      name: match.name,
      party: match.party || "Independent",
      matchScore: match.match.score,
      keyStances: match.key_stances,
      explanation: match.why_this_match,
      imageUrl: match.image_url,
      isTopMatch: match.match.label === "High Match",
      match_request_id: match.match_request_id,
    }));
  } catch (error) {
    console.error("Error retrieving match results:", error);
    throw error;
  }
};

export type SendResultsEmailPayload = {
  email: string;
  match_request_id: string;
};

export type SendResultsEmailResponse = {
  message: string;
};

export const sendResultsByEmail = async (
  payload: SendResultsEmailPayload
): Promise<SendResultsEmailResponse> => {
  const response = await fetch(`${API_BASE_URL}/match/send-results`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    // Throw an error with the message from the API, or a default one
    throw new Error(data.message || "Failed to send results email.");
  }

  return data;
};
