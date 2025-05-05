"use client";

import { motion } from "framer-motion";
import { CandidateHeader } from "../molecules/candidate-header";
import { TopMatchBadge } from "../atoms/top-match-badge";
import { type CandidateCardProps } from "@/types/components/organisms";

export const CandidateCard = ({
  candidate,
  onClick,
  isSelected,
}: CandidateCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-md"
          : candidate.isTopMatch
          ? "border-blue-500 hover:shadow-md"
          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
      }`}
      onClick={() => onClick(candidate.candidateId)}
    >
      <div className="p-4">
        <CandidateHeader
          name={candidate.name}
          party={candidate.party}
          imageUrl={candidate.imageUrl || ""}
          matchScore={candidate.matchScore}
          isTopMatch={!!candidate.isTopMatch}
          isExpanded={isSelected}
          onClick={() => {}}
        />
        <TopMatchBadge show={!!candidate.isTopMatch} />
      </div>
    </motion.div>
  );
};
