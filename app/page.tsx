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
import { BrandBackground } from "@/components/ui/brand-background";
import { Footer } from "@/components/ui/footer";

function AppContent() {
  const { currentScreen, loadingStatus } = useSurvey();
  const searchParams = useSearchParams();

  // Extract UTM parameters from query string
  const utmParams = searchParams
    ? extractUTMParams(Object.fromEntries(searchParams))
    : {};

  return (
    <div className="h-full w-screen flex flex-col relative overflow-hidden">
      {/* Store UTM parameters in session storage */}
      <UTMHandler utmParams={utmParams} />

      {/* Floating background shapes */}
      <BrandBackground screenType={currentScreen} />

      <div className="w-full flex-1 flex items-center justify-center container mx-auto px-4 relative z-10 overflow-auto">
        {currentScreen === "landing" && <LandingScreen />}
        {currentScreen === "survey" && <SurveyScreen />}
        {currentScreen === "loading" && (
          <LoadingScreen status={loadingStatus} />
        )}
        {currentScreen === "results" && <ResultsScreen />}
        {currentScreen === "share_claim" && <ShareClaimScreen />}
      </div>

      {currentScreen !== "loading" && <Footer />}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <SurveyProvider>
        <AppContent />
      </SurveyProvider>
    </Suspense>
  );
}
