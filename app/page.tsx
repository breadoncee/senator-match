"use client";
import { SurveyProvider, useSurvey } from "@/context/survey-context";
import { LandingScreen } from "@/components/landing-screen";
import SurveyScreen from "@/components/survey-screen";
import { LoadingScreen } from "@/components/loading-screen";
import { ResultsScreen } from "@/components/results-screen";
import ShareClaimScreen from "@/components/share-claim-screen";
import UTMHandler from "../context/utm-handler";
import { extractUTMParams } from "../utils/utm-utils";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AppContent() {
  const { currentScreen, loadingStatus } = useSurvey();
  const searchParams = useSearchParams();

  // Extract UTM parameters from query string
  const utmParams = searchParams
    ? extractUTMParams(Object.fromEntries(searchParams))
    : {};

  return (
    <main className="container mx-auto px-4 py-8 h-full">
      {/* Store UTM parameters in session storage */}
      <UTMHandler utmParams={utmParams} />

      {currentScreen === "landing" && <LandingScreen />}
      {currentScreen === "survey" && <SurveyScreen />}
      {currentScreen === "loading" && <LoadingScreen status={loadingStatus} />}
      {currentScreen === "results" && <ResultsScreen />}
      {currentScreen === "share_claim" && <ShareClaimScreen />}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <SurveyProvider>
        <AppContent />
      </SurveyProvider>
    </Suspense>
  );
}
