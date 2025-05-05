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
  }, [matchRequestId, trackEvent]);

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
      <div className="container mx-auto px-4 py-8 max-w-md flex flex-col items-center justify-center min-h-screen">
        {/* Store UTM parameters even during loading state */}
        <UTMHandler utmParams={utmParams} />
        <div className="mb-8">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <h2 className="text-xl font-semibold">Loading shared results...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md flex flex-col items-center justify-center min-h-screen">
        {/* Store UTM parameters even during error state */}
        <UTMHandler utmParams={utmParams} />
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">Error Loading Results</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Button onClick={handleTakeSurvey} className="w-full">
            Take the Survey Yourself
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1600px]">
      {/* Store UTM parameters in session storage */}
      <UTMHandler utmParams={utmParams} />

      <motion.div
        className="flex flex-col min-h-[80vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Shared Senator Matches</h1>
          <p className="text-gray-600">
            Someone shared their senator match results with you. Take the survey
            to find your own matches!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8 max-w-[1600px] mx-auto px-2 sm:px-4">
          {matchResults.map((candidate, index) => (
            <motion.div
              key={candidate.candidateId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.1, 0.9) }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 sm:p-4 md:p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {candidate.imageUrl && (
                        <Image
                          src={candidate.imageUrl}
                          alt={candidate.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white"
                          width={100}
                          height={100}
                        />
                      )}
                      <CardTitle className="text-sm sm:text-base lg:text-lg">
                        {candidate.name}
                      </CardTitle>
                    </div>
                    <div className="text-base sm:text-lg xl:text-xl font-bold whitespace-nowrap">
                      {Math.round(candidate.matchScore * 100)}%
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm mt-1">{candidate.party}</p>
                </CardHeader>
                <CardContent className="pt-3 sm:pt-4 p-3 sm:p-4 md:p-6 flex-grow flex flex-col">
                  <div className="mb-3 sm:mb-4">
                    <h3 className="font-medium text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                      KEY STANCES
                    </h3>
                    <ul className="list-disc pl-4 sm:pl-5 space-y-0.5 sm:space-y-1">
                      {candidate.keyStances
                        .slice(0, 3)
                        .map((stance: string, i: number) => (
                          <li key={i} className="text-xs sm:text-sm">
                            {stance}
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="mt-2 sm:mt-3">
                    <h3 className="font-medium text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                      WHY THEY MATCHED
                    </h3>
                    <p className="text-xs">{candidate.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-auto text-center">
          <Button onClick={handleTakeSurvey} className="px-8 py-3 text-lg">
            Take the Survey Yourself
          </Button>

          <p className="text-xs text-gray-500 text-center mt-4">
            SenatorMatch helps Filipino voters find their ideal senatorial
            candidates.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
