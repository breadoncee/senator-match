import { type SectionTitleProps } from "@/types/components/atoms";

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <h4 className="font-medium text-sm text-blue-600 mb-2 uppercase tracking-wider">
      {children}
    </h4>
  );
};
