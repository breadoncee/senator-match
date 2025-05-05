import { type Candidate } from "../survey";
import { type CandidateProfile } from "../candidate-profile";

export type CandidateCardProps = {
  candidate: Candidate;
  onClick: (candidateId: string) => void;
  isSelected: boolean;
};

export type ResultsTemplateProps = {
  matches: Candidate[];
  onShare: () => void;
  onRestart: () => void;
  selectedCandidateId?: string | null;
  onSelectCandidate?: (id: string) => void;
};

export type CandidateProfileModalProps = {
  candidate: CandidateProfile;
  onClose: () => void;
  isOpen?: boolean;
  candidateId?: string;
  profile?: CandidateProfile;
};

export type CandidateDetailViewProps = {
  candidate: Candidate;
  profile?: CandidateProfile;
  isLoading?: boolean;
  onClose?: () => void;
  onViewProfile?: (candidateId: string) => void;
};
