
import { cn } from "@/lib/utils";

interface GalleryPaginationIndicatorsProps {
  count: number;
  currentIndex: number;
  onClick: (index: number) => void;
  className?: string;
  isVideoActive?: boolean;
}

export const GalleryPaginationIndicators = ({
  count,
  currentIndex,
  onClick,
  className,
  isVideoActive
}: GalleryPaginationIndicatorsProps) => {
  return (
    <div className={cn(
      "absolute left-0 right-0 bottom-4 px-8 z-20",
      isVideoActive && "bottom-24",
      className
    )}>
      <div className="flex justify-center gap-3">
        {Array.from({ length: count }).map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              onClick(idx);
            }}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-500",
              idx === currentIndex 
                ? "bg-white scale-125 shadow-glow" 
                : "bg-white/40 hover:bg-white/70"
            )}
            aria-label={`עבור לתמונה ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
