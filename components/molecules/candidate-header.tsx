"use client";

import { CandidateImage } from "../atoms/candidate-image";
import { MatchBadge } from "../atoms/match-badge";

type CandidateHeaderProps = {
  name: string;
  party: string;
  imageUrl: string;
  matchScore: number;
  isTopMatch: boolean;
  isExpanded: boolean;
  onClick: () => void;
};

export function CandidateHeader({
  name,
  party,
  imageUrl,
  matchScore,
  isTopMatch,
  isExpanded,
  onClick,
}: CandidateHeaderProps) {
  return (
    <div className="flex items-center justify-between" onClick={onClick}>
      <div className="flex items-center">
        <CandidateImage src={imageUrl} alt={name} size="md" />
        <div className="ml-3">
          <h3 className="font-bold text-lg leading-tight">{name}</h3>
          <p className="text-sm text-gray-600 mb-1">{party}</p>
          <MatchBadge matchScore={matchScore} isTopMatch={isTopMatch} />
        </div>
      </div>
    </div>
  );
}
