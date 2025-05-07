"use client";

import { CandidateImage } from "../atoms/candidate-image";
import { MatchBadge } from "../atoms/match-badge";
import { type CandidateHeaderProps } from "@/types/components/molecules";

export const CandidateHeader = ({
  name,
  party,
  imageUrl,
  matchScore,
  isTopMatch,
  onClick,
  ballot_number,
}: CandidateHeaderProps) => {
  return (
    <div className="flex items-center justify-between w-full" onClick={onClick}>
      <div className="flex items-center flex-grow min-w-0">
        <CandidateImage imageUrl={imageUrl} name={name} />
        <div className="ml-3 flex-grow min-w-0">
          <h3 className="font-bold text-lg leading-tight truncate" title={name}>
            {name}
          </h3>
          <p className="text-sm text-gray-600 mb-1 truncate">{party}</p>
          <MatchBadge matchScore={matchScore} isTopMatch={isTopMatch} />
        </div>
      </div>
      {ballot_number !== undefined && (
        <span className="ml-2 px-2.5 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full flex-shrink-0">
          #{ballot_number}
        </span>
      )}
    </div>
  );
};
