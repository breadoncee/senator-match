import { type TopMatchBadgeProps } from "@/types/components/atoms";

export const TopMatchBadge = ({ show }: TopMatchBadgeProps) => {
  if (!show) return null;

  return (
    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
      Top Match
    </div>
  );
};
