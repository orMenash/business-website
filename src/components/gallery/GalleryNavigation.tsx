
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  totalItems: number;
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  className?: string;
  isVideoActive?: boolean;
}

/**
 * Renders the navigation controls for the gallery carousel
 */
export const GalleryNavigation = ({
  onNext,
  onPrevious,
  totalItems,
  currentIndex,
  onSelectIndex,
  className,
  isVideoActive = false,
}: GalleryNavigationProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Side navigation buttons - positioned higher when video is active */}
      <div className={cn(
        "absolute inset-x-0 flex items-center justify-between p-4 z-20",
        isVideoActive ? "top-1/4" : "top-1/2 transform -translate-y-1/2"
      )}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="transform -translate-x-2 hover:translate-x-0 transition-all duration-300 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full"
          aria-label="תמונה קודמת"
        >
          <ChevronLeft className="w-6 h-6" aria-hidden="true" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="transform translate-x-2 hover:translate-x-0 transition-all duration-300 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full"
          aria-label="תמונה הבאה"
        >
          <ChevronRight className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      {/* Bottom pagination dots - positioned higher when video is active */}
      <div className={cn(
        "absolute left-0 right-0 px-8 z-20",
        isVideoActive ? "bottom-24" : "bottom-4"
      )}>
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalItems }).map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                onSelectIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? "bg-white scale-125" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`עבור לתמונה ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
