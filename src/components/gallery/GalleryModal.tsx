
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GalleryImageWithAlbum } from "@/types/gallery";
import { isYouTubeUrl } from "@/utils/videoUtils";
import { YouTubePlayer } from "./YouTubePlayer";
import { VideoPlayer } from "./VideoPlayer";
import { useState, useEffect } from "react";

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
  
  return (
    <Dialog 
      open={selectedImageIndex !== null} 
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-7xl h-[90vh] p-0 bg-gradient-to-b from-gray-900 to-black border-none">
        <div 
          className="relative h-full flex items-center justify-center" 
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") onNext();
            if (e.key === "ArrowRight") onPrevious();
            if (e.key === "Escape") onClose();
          }}
        >
          <button 
            className="absolute top-4 right-4 text-white/90 hover:text-white z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-all duration-300"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
          
          {selectedImageIndex !== null && (
            <>
              {currentImage.type === "video" && isYouTubeUrl(currentImage.url) ? (
                // YouTube Video
                <YouTubePlayer 
                  url={currentImage.url}
                  thumbnail={currentImage.thumbnail}
                  description={currentImage.description}
                  onPlayStateChange={setIsPlaying}
                />
              ) : currentImage.type === "video" ? (
                // Standard Video
                <VideoPlayer 
                  url={currentImage.url}
                  thumbnail={currentImage.thumbnail}
                  description={currentImage.description}
                  onPlayStateChange={setIsPlaying}
                />
              ) : (
                // Image
                <img
                  src={currentImage.url}
                  alt={currentImage.description}
                  className="max-h-[80vh] max-w-full object-contain mx-auto"
                />
              )}

              {currentImage.description && (
                <div className="absolute bottom-20 left-0 right-0 p-6 bg-black/50 backdrop-blur-sm text-white text-center">
                  <p className="text-lg">{currentImage.description}</p>
                </div>
              )}

              {/* Navigation Controls */}
              <div className={`absolute ${isPlaying ? 'bottom-24' : 'bottom-4'} left-0 right-0 flex flex-col items-center gap-4`}>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={onPrevious}
                    className="bg-white/90 hover:bg-white text-black p-3 rounded-full transition-all transform hover:-translate-x-1"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="flex justify-center gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSelectImage(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === selectedImageIndex 
                            ? "bg-white scale-125" 
                            : "bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={onNext}
                    className="bg-white/90 hover:bg-white text-black p-3 rounded-full transition-all transform hover:translate-x-1"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
