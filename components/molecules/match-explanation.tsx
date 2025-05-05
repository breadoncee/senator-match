import { SectionTitle } from "../atoms/section-title";
import { type MatchExplanationProps } from "@/types/components/molecules";

export const MatchExplanation = ({ explanation }: MatchExplanationProps) => {
  return (
    <div>
      <SectionTitle>Why This Match</SectionTitle>
      <p className="text-gray-700">{explanation}</p>
    </div>
  );
};
