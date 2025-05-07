"use client";

import { motion } from "framer-motion";
import { CandidateHeader } from "../molecules/candidate-header";
import { TopMatchBadge } from "../atoms/top-match-badge";
import { type CandidateCardProps } from "@/types/components/organisms";

export const CandidateCard = ({
  candidate,
  onClick,
  isSelected,
  isTopCandidate,
}: CandidateCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
        isSelected
          ? "border-primary bg-primary/10 shadow-md"
          : isTopCandidate
          ? "border-accent bg-primary/10 shadow-lg hover:shadow-xl"
          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
      }`}
      onClick={() => onClick(candidate.candidateId)}
    >
      <div className="p-4">
        <CandidateHeader
          name={candidate.ballot_name || candidate.name}
          party={candidate.party}
          imageUrl={candidate.imageUrl || ""}
          matchScore={candidate.matchScore}
          isTopMatch={!!isTopCandidate}
          ballot_number={candidate.ballot_number}
        />
        <TopMatchBadge show={!!isTopCandidate} />
      </div>
    </motion.div>
  );
};
