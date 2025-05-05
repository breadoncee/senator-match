"use client";
import { SurveyProvider, useSurvey } from "@/context/survey-context";
import { LandingScreen } from "@/components/landing-screen";
import SurveyScreen from "@/components/survey-screen";
import { LoadingScreen } from "@/components/loading-screen";
import { ResultsScreen } from "@/components/results-screen";
import ShareClaimScreen from "@/components/share-claim-screen";
import Link from "next/link";

function AppContent() {
  const { currentScreen, loadingStatus } = useSurvey();

  return (
    <main className="container mx-auto px-4 py-8">
      {currentScreen === "landing" && <LandingScreen />}
      {currentScreen === "survey" && <SurveyScreen />}
      {currentScreen === "loading" && <LoadingScreen status={loadingStatus} />}
      {currentScreen === "results" && <ResultsScreen />}
      {currentScreen === "share_claim" && <ShareClaimScreen />}

      {/* Add a small link to the random results page in development */}
      {process.env.NODE_ENV === "development" &&
        currentScreen === "landing" && (
          <div className="fixed bottom-2 right-2 text-xs">
            <Link href="/results" className="text-gray-400 hover:text-gray-600">
              View Random Results
            </Link>
          </div>
        )}
    </main>
  );
}

export default function Home() {
  return (
    <SurveyProvider>
      <AppContent />
    </SurveyProvider>
  );
}
