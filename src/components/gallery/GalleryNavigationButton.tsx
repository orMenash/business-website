
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryNavigationButtonProps {
  direction: 'next' | 'previous';
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

export const GalleryNavigationButton = ({ 
  direction, 
  onClick, 
  className 
}: GalleryNavigationButtonProps) => {
  const Icon = direction === 'next' ? ChevronLeft : ChevronRight;
  const position = direction === 'next' ? 'left-0' : 'right-0';
  const hoverTransform = direction === 'next' 
    ? 'hover:translate-x-1' 
    : 'hover:-translate-x-1';

  return (
    <div className={cn(`absolute inset-y-0 ${position} flex items-center`, className)}>
      <button 
        onClick={onClick}
        className={cn(
          "bg-black/30 hover:bg-black/50 text-white p-3 transition-all duration-300 transform hover:scale-105",
          direction === 'next' ? 'rounded-r-xl' : 'rounded-l-xl',
          hoverTransform
        )}
        aria-label={direction === 'next' ? 'תמונה הבאה' : 'תמונה קודמת'}
      >
        <Icon className="w-6 h-6" />
      </button>
    </div>
  );
};
