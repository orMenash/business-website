
import { useState, useEffect, useRef } from "react";
import { GalleryImageWithAlbum } from "@/types/gallery";
import { GalleryNavigation } from "./GalleryNavigation";
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
 * A responsive image carousel component for gallery display
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

  const handleSelectIndex = (index: number) => {
    setCurrentIndex(index);
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
        className={cn("relative rounded-2xl overflow-hidden shadow-2xl", className)}
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
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <GalleryNavigation 
          onNext={handleNextImage}
          onPrevious={handlePrevImage}
          totalItems={images.length}
          currentIndex={currentIndex}
          onSelectIndex={handleSelectIndex}
          isVideoActive={isVideoActive}
        />

        {/* Hidden buttons for external control */}
        <button 
          className="hidden" 
          data-carousel-previous 
          onClick={handlePrevImage}
          aria-hidden="true"
        />
        <button 
          className="hidden" 
          data-carousel-next 
          onClick={handleNextImage}
          aria-hidden="true"
        />

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
          onPrevious={() => {
            if (modalImageIndex !== null) {
              setModalImageIndex(getPreviousIndex(modalImageIndex, images.length));
            }
          }}
          onNext={() => {
            if (modalImageIndex !== null) {
              setModalImageIndex(getNextIndex(modalImageIndex, images.length));
            }
          }}
          onSelectImage={setModalImageIndex}
        />
      )}
    </>
  );
};
