"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { getMatchResultsById } from "@/services/matching-service";
import type { MatchResult } from "@/services/matching-service";
import Image from "next/image";
import UTMHandler from "@/context/utm-handler";
import { extractUTMParams, getUTMParamsFromStorage } from "@/utils/utm-utils";
import { useAnalytics } from "@/hooks/use-analytics";
import { BrandBackground } from "@/components/ui/brand-background";
import { Footer } from "@/components/ui/footer";

export default function SharedResultsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { sessionId: matchRequestId } = useParams<{ sessionId: string }>();
  const searchParams = useSearchParams();
  const { trackEvent } = useAnalytics();

  // Extract UTM parameters from query string
  const utmParams = searchParams
    ? extractUTMParams(Object.fromEntries(searchParams))
    : {};

  useEffect(() => {
    async function fetchMatchResults() {
      setIsLoading(true);
      try {
        // Fetch match results using the API service
        const results = await getMatchResultsById(matchRequestId);
        setMatchResults(results);
        setError(null);

        // Track successful view of shared results
        trackEvent(
          "SharedResults",
          "View_Shared_Results",
          `Session_${matchRequestId}_Candidates_${results.length}`
        );
      } catch (err) {
        console.error("Error fetching match results:", err);
        setError(
          "Failed to load the match results. The link may be invalid or expired."
        );

        // Track error viewing shared results
        trackEvent(
          "Error",
          "Shared_Results_Error",
          `Session_${matchRequestId}`
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchMatchResults();
  }, [matchRequestId]);

  const handleTakeSurvey = () => {
    // Track when user decides to take survey from shared results
    trackEvent(
      "SharedResults",
      "Take_Survey_From_Shared",
      `From_Session_${matchRequestId}`
    );

    // Preserve UTM parameters when redirecting to homepage
    const storedUtmParams = getUTMParamsFromStorage();
    const paramEntries = Object.entries(storedUtmParams);

    if (paramEntries.length > 0) {
      const queryString = paramEntries
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
        )
        .join("&");
      router.push(`/?${queryString}`);
    } else {
      router.push("/");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <BrandBackground className="loading" screenType="loading" />
        {/* Store UTM parameters even during loading state */}
        <UTMHandler utmParams={utmParams} />
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="mb-8 relative z-10">
            <div className="w-16 h-16 border-3 border-primary/70 border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-xl font-semibold relative z-10 text-primary/90">
            Loading shared results...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <BrandBackground className="screen-results" screenType="results" />
        {/* Store UTM parameters even during error state */}
        <UTMHandler utmParams={utmParams} />
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="text-center mb-8 relative z-10 bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-sm">
            <h1 className="text-2xl font-bold mb-4 text-primary/90">
              Error Loading Results
            </h1>
            <p className="text-gray-600/90 mb-8">{error}</p>
            <Button
              onClick={handleTakeSurvey}
              className="w-full bg-secondary hover:bg-secondary/90 rounded-lg shadow-sm"
            >
              Take the Survey Yourself
            </Button>
          </div>
        </div>

        {/* Custom non-sticky footer */}
        <footer className="py-3 border-t border-gray-200 bg-primary/5 mt-8">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-2 sm:mb-0">
              <Image
                src="/datos-pilipinas-logo.svg"
                alt="Datos Pilipinas Logo"
                width={80}
                height={40}
              />
            </div>
            <div className="text-xs text-gray-500">
              © 2025 All rights reserved
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Increased z-index for background shapes */}
      <BrandBackground className="screen-results" screenType="results" />

      {/* Store UTM parameters in session storage */}
      <UTMHandler utmParams={utmParams} />

      <div className="container mx-auto px-4 py-6 max-w-[1600px] relative">
        <motion.div
          className="flex flex-col relative z-[10]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.h1
              className="text-2xl sm:text-3xl font-bold mb-3 text-primary"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Shared Senator Matches
            </motion.h1>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Someone shared their senator match results with you. Take the
              survey to find your own matches!
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 max-w-[1600px] mx-auto px-2 sm:px-4">
            {matchResults.map((candidate, index) => (
              <motion.div
                key={candidate.candidateId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(index * 0.1, 0.9),
                }}
                className="h-full relative"
              >
                <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-gray-200 bg-white backdrop-blur-sm rounded-xl">
                  <CardHeader className="bg-primary text-white p-3 sm:p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 sm:gap-3">
                        {candidate.imageUrl && (
                          <Image
                            src={candidate.imageUrl}
                            alt={candidate.ballot_name || candidate.name}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white/90 shadow-sm"
                            width={100}
                            height={100}
                          />
                        )}
                        <CardTitle className="text-sm sm:text-base font-semibold">
                          {candidate.ballot_name || candidate.name}
                        </CardTitle>
                      </div>
                      <div className="text-base sm:text-lg font-bold whitespace-nowrap bg-white/20 px-2 py-1 rounded-full">
                        {Math.round(candidate.matchScore * 100)}%
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm mt-1 text-white/90">
                      {candidate.party}
                    </p>
                  </CardHeader>
                  <CardContent className="relative pt-3 sm:pt-4 p-3 sm:p-4 flex-grow flex flex-col bg-white">
                    <div className="mb-3 sm:mb-4 flex-grow">
                      <h3 className="font-medium text-xs sm:text-sm text-secondary mb-1 sm:mb-2">
                        KEY STANCES
                      </h3>
                      <ul className="list-disc pl-4 sm:pl-5 space-y-0.5 sm:space-y-1 marker:text-primary">
                        {candidate.keyStances
                          .slice(0, 3)
                          .map((stance: string, i: number) => (
                            <li
                              key={i}
                              className="text-xs sm:text-sm text-gray-600"
                            >
                              {stance}
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <h3 className="font-medium text-xs sm:text-sm text-secondary mb-1 sm:mb-2">
                        WHY THEY MATCHED
                      </h3>
                      <p className="text-xs text-gray-600">
                        {candidate.explanation}
                      </p>
                    </div>

                    {/* Ballot Number Badge - Inside CardContent, bottom right, diagonal upwards */}
                    {candidate.ballot_number !== undefined && (
                      <div
                        className="absolute bottom-0 right-0 z-10 overflow-hidden w-16 h-16 pointer-events-none" // Outer clipping container
                      >
                        <div
                          className="absolute transform -rotate-45 bg-secondary text-white text-[12px] font-semibold flex items-center justify-center shadow-md"
                          style={{
                            width: "120%", // Wider for full corner coverage when rotated
                            paddingTop: "4px",
                            paddingBottom: "4px",
                            right: "-20px", // Adjust: Pushes rotated element leftwards from container's right edge
                            bottom: "35px", // Adjust: Pushes rotated element upwards from container's bottom edge
                            transformOrigin: "bottom right", // Rotate around this point of the ribbon itself
                          }}
                        >
                          #{candidate.ballot_number}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 mb-12">
            <Button
              onClick={handleTakeSurvey}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white py-3 px-6 rounded-lg shadow-md"
            >
              Take the Survey Yourself
            </Button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
