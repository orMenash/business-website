
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { GalleryImageWithAlbum } from "@/types/gallery";
import { isYouTubeUrl, getYouTubeVideoId } from "@/utils/videoUtils";
import { YouTubePlayer } from "./YouTubePlayer";
import { VideoPlayer } from "./VideoPlayer";
import { useState, useEffect } from "react";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

interface GalleryModalProps {
  images: GalleryImageWithAlbum[];
  selectedImageIndex: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelectImage: (index: number) => void;
}

/**
 * Modal dialog for full-screen image/video viewing
 * Used across all pages for consistent image viewing experience
 */
export const GalleryModal = ({
  images,
  selectedImageIndex,
  onClose,
  onPrevious,
  onNext,
  onSelectImage
}: GalleryModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Reset video playing state when dialog closes or slide changes
  useEffect(() => {
    setIsPlaying(false);
  }, [selectedImageIndex]);
  
  if (selectedImageIndex === null || !images.length) {
    return null;
  }
  
  const currentImage = images[selectedImageIndex];
  const isVideo = currentImage.type === "video";
  const modalDescription = currentImage.description || (isVideo ? "סרטון" : "תמונה");
  const modalTitle = isVideo ? "סרטון מהגלריה" : "תמונה מהגלריה";
  const itemNumber = `${selectedImageIndex + 1} מתוך ${images.length}`;
  
  return (
    <Dialog 
      open={selectedImageIndex !== null} 
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent 
        className="max-w-[100vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-black border-none overflow-hidden"
        aria-describedby="gallery-modal-description"
      >
        {/* Use DialogTitle for accessibility */}
        <DialogTitle id="gallery-modal-title" className="sr-only">
          {modalTitle} - {itemNumber} - {currentImage.description || ""}
        </DialogTitle>
        
        <div 
          className="relative h-full flex flex-col items-center justify-center" 
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") onNext();
            if (e.key === "ArrowRight") onPrevious();
            if (e.key === "Escape") onClose();
          }}
        >
          <button 
            className="absolute top-4 right-4 text-white/90 hover:text-white z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-all duration-300"
            onClick={onClose}
            aria-label="סגור"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex-grow w-full flex items-center justify-center overflow-hidden">
            {currentImage.type === "video" && isYouTubeUrl(currentImage.url) ? (
              // YouTube Video
              <div className="w-full max-h-[75vh]">
                <YouTubePlayer 
                  url={currentImage.url}
                  thumbnail={currentImage.thumbnail}
                  description={currentImage.description}
                  onPlayStateChange={setIsPlaying}
                  autoplay={false}
                />
              </div>
            ) : currentImage.type === "video" ? (
              // Standard Video
              <div className="w-full max-h-[75vh]">
                <VideoPlayer 
                  url={currentImage.url}
                  thumbnail={currentImage.thumbnail}
                  description={currentImage.description}
                  onPlayStateChange={setIsPlaying}
                  autoplay={false}
                />
              </div>
            ) : (
              // Image - now full-width for small screens
              <img
                src={currentImage.url}
                alt={currentImage.description || "תמונת גלריה"}
                className="max-h-[75vh] w-full sm:w-auto sm:max-w-full object-contain mx-auto"
              />
            )}

            {/* Hidden description for screen readers */}
            <div id="gallery-modal-description" className="sr-only">
              {currentImage.type === "video" ? "סרטון: " : "תמונה: "}{modalDescription}, {itemNumber}
            </div>
          </div>

          {/* Footer area with all controls and description */}
          <div className="w-full mt-auto bg-black/80 pt-3 pb-6">
            {/* Description */}
            {currentImage.description && (
              <div 
                aria-hidden="true"
                className="mb-4 px-4 text-white text-center"
              >
                <p className="text-lg">{currentImage.description}</p>
              </div>
            )}

            {/* Navigation Controls - All at the bottom now */}
            <div className="flex justify-center items-center gap-8">
              <button 
                onClick={onPrevious}
                className="bg-white/90 hover:bg-white text-black p-3 rounded-full transition-all transform hover:-translate-x-1"
                aria-label="לתמונה הקודמת"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Indicator dots */}
              <div className="flex justify-center gap-3" role="tablist">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectImage(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === selectedImageIndex 
                        ? "bg-white scale-125" 
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`עבור לתמונה ${idx + 1} מתוך ${images.length}`}
                    role="tab"
                    aria-selected={idx === selectedImageIndex}
                    tabIndex={idx === selectedImageIndex ? 0 : -1}
                  />
                ))}
              </div>
              
              <button 
                onClick={onNext}
                className="bg-white/90 hover:bg-white text-black p-3 rounded-full transition-all transform hover:translate-x-1"
                aria-label="לתמונה הבאה"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
