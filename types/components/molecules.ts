export type CandidateHeaderProps = {
  name: string; // This will now be the ballot_name passed from CandidateCard
  fullName?: string; // Full name for accessibility or other uses if needed
  party: string;
  imageUrl: string;
  matchScore: number;
  isTopMatch: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
  ballot_number?: number;
};

export type KeyStanceListProps = {
  stances: string[];
};

export type MatchExplanationProps = {
  explanation: string;
};
