import { type CandidateImageProps } from "@/types/components/atoms";
import Image from "next/image";
export const CandidateImage = ({
  imageUrl,
  name,
  size = "md",
}: CandidateImageProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 flex-shrink-0`}
    >
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={name}
        className="w-full h-full object-cover"
        width={100}
        height={100}
      />
    </div>
  );
};
