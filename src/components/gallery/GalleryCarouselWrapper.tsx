
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GalleryCarouselWrapperProps {
  children: ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  fullWidth?: boolean;
}

export const GalleryCarouselWrapper = ({ 
  children, 
  className,
  onMouseEnter,
  onMouseLeave,
  onClick,
  fullWidth = false
}: GalleryCarouselWrapperProps) => {
  return (
    <div 
      className={cn(
        "relative overflow-hidden shadow-2xl transition-all duration-300", 
        fullWidth ? "w-full" : "rounded-xl",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-carousel
      onClick={onClick}
    >
      <div className="aspect-[16/9] max-h-[85vh] bg-gray-800" style={{ height: 'calc(85vh - 120px)', paddingBottom: '0' }}>
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
