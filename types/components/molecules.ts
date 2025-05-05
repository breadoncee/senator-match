export type CandidateHeaderProps = {
  name: string;
  party: string;
  imageUrl: string;
  matchScore: number;
  isTopMatch: boolean;
  isExpanded?: boolean;
  onClick: () => void;
};

export type KeyStanceListProps = {
  stances: string[];
};

export type MatchExplanationProps = {
  explanation: string;
};
