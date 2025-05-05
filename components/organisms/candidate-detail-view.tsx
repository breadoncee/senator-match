"use client";

import { motion } from "framer-motion";
import { CandidateImage } from "../atoms/candidate-image";
import { MatchBadge } from "../atoms/match-badge";
import { X } from "lucide-react";

type CandidateDetailViewProps = {
  candidate: {
    candidateId: string;
    name: string;
    party: string;
    matchScore: number;
    keyStances: string[];
    explanation: string;
    imageUrl?: string;
    isTopMatch?: boolean;
  };
  onClose: () => void;
  onViewProfile: (candidateId: string) => void;
};

export function CandidateDetailView({
  candidate,
  onClose,
}: CandidateDetailViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <h2 className="text-xl font-bold">Candidate Details</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close details"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex flex-col md:flex-row gap-8">
          {/* Candidate card */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div
              className={`p-6 rounded-xl border-2 ${
                candidate.isTopMatch
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex flex-col items-center text-center mb-4">
                <CandidateImage
                  imageUrl={candidate.imageUrl || ""}
                  name={candidate.name}
                  size="lg"
                />
                <h3 className="text-xl font-bold mt-4">{candidate.name}</h3>
                <p className="text-gray-600">{candidate.party}</p>
                <div className="mt-2">
                  <MatchBadge
                    matchScore={candidate.matchScore}
                    isTopMatch={!!candidate.isTopMatch}
                  />
                </div>
              </div>

              {candidate.isTopMatch && (
                <div className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full text-center">
                  Top Match
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex-grow">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-blue-600 uppercase mb-3">
                  Why This Match
                </h3>
                <p className="text-gray-700">{candidate.explanation}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-blue-600 uppercase mb-3">
                  Key Stances
                </h3>
                <ul className="space-y-2">
                  {candidate.keyStances.map((stance, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 mt-1 text-green-500 flex-shrink-0">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 13L9 17L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span>{stance}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-bold text-blue-600 uppercase mb-3">
                  Additional Information
                </h3>
                <p className="text-gray-700">
                  This candidate&apos;s positions on key issues align with{" "}
                  {Math.round(candidate.matchScore * 100)}% of your survey
                  responses. Their policy priorities and legislative focus areas
                  match your indicated preferences.
                </p>
              </div>

              {/* View Profile Button */}
              {/* TODO: Hidden for now, but can be added back in */}
              {/* <div className="pt-4">
                <Button
                  onClick={() => onViewProfile(candidate.candidateId)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <UserCircle className="mr-2 h-5 w-5" />
                  View Full Candidate Profile
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
