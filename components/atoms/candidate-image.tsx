type CandidateImageProps = {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
};

export function CandidateImage({ src, alt, size = "md" }: CandidateImageProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 flex-shrink-0`}
    >
      <img
        src={src || "/placeholder.svg?height=100&width=100"}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
