
import { useState, useEffect, useRef } from "react";
import { GalleryImageWithAlbum } from "@/types/gallery";
import { GalleryImageSlide } from "./GalleryImageSlide";
import { GalleryCaption } from "./GalleryCaption";
import { GalleryModal } from "./GalleryModal";
import { GalleryNavigationButton } from "./GalleryNavigationButton";
import { GalleryPaginationIndicators } from "./GalleryPaginationIndicators";
import { GalleryCarouselWrapper } from "./GalleryCarouselWrapper";
import { getNextIndex, getPreviousIndex } from "@/utils/galleryUtils";

interface GalleryCarouselProps {
  images: GalleryImageWithAlbum[];
  autoplayInterval?: number;
  className?: string;
  pauseOnHover?: boolean;
  isPaused?: boolean;
  onImageClick?: (index: number) => void;
  fullWidth?: boolean;
}

/**
 * A responsive and elegant image carousel component for gallery display
 */
export const GalleryCarousel = ({ 
  images, 
  autoplayInterval = 5000, 
  className,
  pauseOnHover = true,
  isPaused: externalPaused = false,
  onImageClick,
  fullWidth = false
}: GalleryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [internalPaused, setInternalPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);
  const autoplayTimerRef = useRef<number | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Combine all paused states
  const isPaused = externalPaused || internalPaused || isModalOpen || videoPlaying;

  const handleNextImage = () => {
    setCurrentIndex(prev => getNextIndex(prev, images.length));
  };

  const handlePrevImage = () => {
    setCurrentIndex(prev => getPreviousIndex(prev, images.length));
  };

  const handleImageClick = (index: number) => {
    if (onImageClick) {
      onImageClick(index);
    } else {
      // Important fix: Use the clicked index, not currentIndex
      setModalImageIndex(index);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImageIndex(null);
  };

  const currentImage = images[currentIndex];
  const isVideoActive = currentImage?.type === "video";

  // Handle video playback state
  const handleVideoStateChange = (isPlaying: boolean) => {
    setVideoPlaying(isPlaying);
  };

  const resetAutoplayTimer = () => {
    if (autoplayTimerRef.current) {
      window.clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    
    if (!isPaused && !isModalOpen && images.length > 1) {
      autoplayTimerRef.current = window.setTimeout(() => {
        handleNextImage();
      }, autoplayInterval);
    }
  };

  // Set up and clear autoplay timer
  useEffect(() => {
    resetAutoplayTimer();
    
    return () => {
      if (autoplayTimerRef.current) {
        window.clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [currentIndex, isPaused, isModalOpen, autoplayInterval, images.length, videoPlaying]);

  if (!images.length) return null;

  return (
    <>
      <GalleryCarouselWrapper
        className={className}
        onMouseEnter={() => pauseOnHover && setInternalPaused(true)}
        onMouseLeave={() => pauseOnHover && setInternalPaused(false)}
        fullWidth={fullWidth}
      >
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
              onVideoPlayStateChange={handleVideoStateChange}
            />
          </div>
        ))}
        
        <GalleryNavigationButton
          direction="previous"
          onClick={(e) => {
            e.stopPropagation();
            handlePrevImage();
          }}
        />
        
        <GalleryNavigationButton
          direction="next"
          onClick={(e) => {
            e.stopPropagation();
            handleNextImage();
          }}
        />

        <GalleryPaginationIndicators
          count={images.length}
          currentIndex={currentIndex}
          onClick={setCurrentIndex}
          isVideoActive={isVideoActive}
        />

        <GalleryCaption 
          image={images[currentIndex]} 
          isVideoActive={isVideoActive}
        />
      </GalleryCarouselWrapper>

      {isModalOpen && modalImageIndex !== null && !onImageClick && (
        <GalleryModal
          images={images}
          selectedImageIndex={modalImageIndex}
          onClose={handleCloseModal}
          onPrevious={() => {
            const newIndex = getPreviousIndex(modalImageIndex, images.length);
            setModalImageIndex(newIndex);
          }}
          onNext={() => {
            const newIndex = getNextIndex(modalImageIndex, images.length);
            setModalImageIndex(newIndex);
          }}
          onSelectImage={(index) => {
            setModalImageIndex(index);
          }}
        />
      )}
    </>
  );
};
