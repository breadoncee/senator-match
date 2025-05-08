"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, RefreshCw, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CandidateCard } from "../organisms/candidate-card";
import { CandidateDetailView } from "../organisms/candidate-detail-view";
import { CandidateProfileModal } from "../organisms/candidate-profile-modal";
import { getCandidateProfile } from "../../services/candidate-profile-service";
import { type CandidateProfile } from "@/types/candidate-profile";
import { type ResultsTemplateProps } from "@/types/components/organisms";
import GptToolsSection from "../GptToolsSection";

export const ResultsTemplate = ({
  matches,
  onShare,
  onRestart,
}: ResultsTemplateProps) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null
  );
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null);
  const [candidateProfile, setCandidateProfile] =
    useState<CandidateProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  const selectedCandidate =
    matches.find((c) => c.candidateId === selectedCandidateId) || null;

  const handleCandidateClick = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
  };

  const handleCloseDetails = () => {
    setSelectedCandidateId(null);
  };

  const handleViewProfile = async (candidateId: string) => {
    setIsLoadingProfile(true);
    setViewingProfileId(candidateId);

    try {
      const profile = await getCandidateProfile(candidateId);
      setCandidateProfile(profile);
    } catch (error) {
      console.error("Error fetching candidate profile:", error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleCloseProfile = () => {
    setViewingProfileId(null);
    setCandidateProfile(null);
  };

  return (
    <div className="h-full w-full">
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 py-8 pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center text-white"
          >
            <Check className="w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Senator Matches
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Based on your responses, we&apos;ve selected 12 senators that best
            align with your values and priorities. The top 3 matches are
            highlighted.{" "}
            <span className="font-medium">
              Click on any candidate to see detailed information.
            </span>
          </p>
        </div>

        <Card className="border-2 border-primary/30 rounded-xl overflow-hidden mb-8">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary">
                Your Senatorial Ballot
              </h2>
              <p className="text-gray-500">
                These candidates have been pre-selected based on your
                preferences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matches.map((candidate, index) => (
                <CandidateCard
                  key={candidate.candidateId}
                  candidate={candidate}
                  onClick={handleCandidateClick}
                  isSelected={candidate.candidateId === selectedCandidateId}
                  isTopCandidate={index < 3}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-sm text-gray-500 text-center mt-6">
          Your responses are stored to help us improve the matching process and
          provide better results in the future.
        </p>

        <p className="text-sm text-gray-500 text-center mt-0 mb-8 mx-auto">
          For more comprehensive information and data about all senatorial
          candidates, visit{" "}
          <a
            href="https://ph.rappler.com/elections/2025/senatorial-race"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            Rappler&apos;s 2025 Senatorial Race Coverage
          </a>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <Button
            onClick={onShare}
            size="lg"
            className="flex-1 py-6 text-lg bg-secondary hover:bg-secondary/90"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share Your Results
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              window.open(
                "https://kodigoeleksyon2025.netlify.app/national?utm_source=candidatematch&utm_medium=website&utm_campaign=national_info",
                "_blank"
              );
            }}
            size="lg"
            className="flex-1 py-6 text-lg border-primary text-primary hover:bg-primary/10"
          >
            Go to Kodigo Eleksyon 2025
            <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />{" "}
          </Button>
        </div>

        <motion.div
          className="mt-10 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }} // Added delay to sync with other elements if needed
        >
          <GptToolsSection />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedCandidate && (
          <CandidateDetailView
            candidate={selectedCandidate}
            onClose={handleCloseDetails}
            onViewProfile={handleViewProfile}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewingProfileId && candidateProfile && (
          <CandidateProfileModal
            candidate={candidateProfile}
            onClose={handleCloseProfile}
          />
        )}
      </AnimatePresence>

      {/* Loading overlay for profile */}
      <AnimatePresence>
        {isLoadingProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-medium">
                Loading candidate profile...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
