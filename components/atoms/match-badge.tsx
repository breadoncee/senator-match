"use client";

import { type MatchBadgeProps } from "@/types/components/atoms";

export const MatchBadge = ({ matchScore, isTopMatch }: MatchBadgeProps) => {
  const percentage = Math.round(matchScore * 100);

  let textColorClass = "text-gray-600";
  let bgColorClass = "bg-gray-400";

  if (isTopMatch) {
    textColorClass = "text-primary";
    bgColorClass = "bg-primary";
  } else if (percentage >= 80) {
    textColorClass = "text-primary";
    bgColorClass = "bg-primary";
  } else if (percentage >= 65) {
    textColorClass = "text-accent";
    bgColorClass = "bg-accent";
  } else if (percentage >= 50) {
    textColorClass = "text-gray-700";
    bgColorClass = "bg-gray-300";
  }
  // Default is already text-gray-600 and bg-gray-400 for scores < 50

  return (
    <div className="flex items-center">
      <div className={`h-2 w-2 rounded-full mr-1 ${bgColorClass}`}></div>
      <span className={`text-sm font-medium ${textColorClass}`}>
        {percentage}% Match
      </span>
    </div>
  );
};
