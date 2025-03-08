
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImageWithAlbum } from "@/types/gallery";
import { GalleryImageSlide } from "./GalleryImageSlide";
import { GalleryCaption } from "./GalleryCaption";
import { cn } from "@/lib/utils";
import { getNextIndex, getPreviousIndex } from "@/utils/galleryUtils";
import { GalleryModal } from "./GalleryModal";

interface GalleryCarouselProps {
  images: GalleryImageWithAlbum[];
  autoplayInterval?: number;
  className?: string;
  pauseOnHover?: boolean;
  onImageClick?: (index: number) => void;
}

/**
 * A responsive and elegant image carousel component for gallery display
 */
export const GalleryCarousel = ({ 
  images, 
  autoplayInterval = 5000, 
  className,
  pauseOnHover = true,
  onImageClick
}: GalleryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);
  const autoplayTimerRef = useRef<number | null>(null);

  const handleNextImage = () => {
    setCurrentIndex(prev => getNextIndex(prev, images.length));
  };

  const handlePrevImage = () => {
    setCurrentIndex(prev => getPreviousIndex(prev, images.length));
  };

  const handleImageClick = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    setIsPaused(true);
    
    if (onImageClick) {
      onImageClick(index);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImageIndex(null);
    setIsPaused(false);
  };

  const currentImage = images[currentIndex];
  const isVideoActive = currentImage?.type === "video";

  // Clear the previous timer and set a new one
  const resetAutoplayTimer = () => {
    if (autoplayTimerRef.current) {
      window.clearTimeout(autoplayTimerRef.current);
    }
    
    if (!isPaused && !isModalOpen && images.length > 1) {
      autoplayTimerRef.current = window.setTimeout(handleNextImage, autoplayInterval);
    }
  };

  // Set up autoplay
  useEffect(() => {
    resetAutoplayTimer();
    
    return () => {
      if (autoplayTimerRef.current) {
        window.clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [currentIndex, isPaused, isModalOpen, autoplayInterval, images.length]);

  if (!images.length) return null;

  return (
    <>
      <div 
        className={cn(
          "relative rounded-xl overflow-hidden shadow-2xl transition-all duration-300", 
          className
        )}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        data-carousel
      >
        <div className="aspect-[16/9] bg-black" style={{ height: '0', paddingBottom: '56.25%' }}>
          {images.map((image, index) => (
            <div 
              key={index} 
              className="cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <GalleryImageSlide 
                image={image} 
                isActive={index === currentIndex}
                index={index} 
              />
            </div>
          ))}
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        
        {/* Side navigation buttons - always visible at mid-height */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="bg-black/30 hover:bg-black/50 text-white p-3 rounded-r-xl transition-all duration-300 transform hover:-translate-x-1 hover:scale-105"
            aria-label="תמונה קודמת"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="bg-black/30 hover:bg-black/50 text-white p-3 rounded-l-xl transition-all duration-300 transform hover:translate-x-1 hover:scale-105"
            aria-label="תמונה הבאה"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom pagination dots */}
        <div className={cn(
          "absolute left-0 right-0 bottom-4 px-8 z-20",
          isVideoActive && "bottom-24"
        )}>
          <div className="flex justify-center gap-3">
            {Array.from({ length: images.length }).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
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

        {/* Caption */}
        <GalleryCaption 
          image={images[currentIndex]} 
          isVideoActive={isVideoActive}
        />
      </div>

      {/* Gallery Modal */}
      {isModalOpen && (
        <GalleryModal
          images={images}
          selectedImageIndex={modalImageIndex}
          onClose={handleCloseModal}
          onPrevious={handlePrevImage}
          onNext={handleNextImage}
          onSelectImage={setModalImageIndex}
        />
      )}
    </>
  );
};
