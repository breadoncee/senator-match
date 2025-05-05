import { SectionTitle } from "../atoms/section-title";

type MatchExplanationProps = {
  explanation: string;
};

export function MatchExplanation({ explanation }: MatchExplanationProps) {
  return (
    <div>
      <SectionTitle>Why This Match</SectionTitle>
      <p className="text-gray-700">{explanation}</p>
    </div>
  );
}
