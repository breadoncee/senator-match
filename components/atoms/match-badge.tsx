"use client";

type MatchBadgeProps = {
  matchScore: number;
  isTopMatch: boolean;
};

export function MatchBadge({ matchScore, isTopMatch }: MatchBadgeProps) {
  const percentage = Math.round(matchScore * 100);
  const color = isTopMatch
    ? "text-blue-600"
    : percentage >= 70
    ? "text-green-600"
    : percentage >= 50
    ? "text-amber-600"
    : "text-gray-600";

  return (
    <div className="flex items-center">
      <div
        className={`h-2 w-2 rounded-full mr-1 ${
          isTopMatch
            ? "bg-blue-500"
            : percentage >= 70
            ? "bg-green-500"
            : percentage >= 50
            ? "bg-amber-500"
            : "bg-gray-400"
        }`}
      ></div>
      <span className={`text-sm font-medium ${color}`}>
        {percentage}% Match
      </span>
    </div>
  );
}
