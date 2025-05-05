import type React from "react";

export type SectionTitleProps = {
  children: React.ReactNode;
};

export type MatchBadgeProps = {
  matchScore: number;
  isTopMatch: boolean;
};

export type CandidateImageProps = {
  imageUrl: string;
  name: string;
  size?: "sm" | "md" | "lg";
};

export type TopMatchBadgeProps = {
  show: boolean;
};
