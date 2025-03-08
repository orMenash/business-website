
import { GalleryImageWithAlbum } from "@/types/gallery";
import { ResponsiveImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";
import { isYouTubeUrl, getYouTubeVideoId } from "@/utils/videoUtils";

interface GalleryImageSlideProps {
  image: GalleryImageWithAlbum;
  isActive: boolean;
  index: number;
  className?: string;
}

/**
 * Renders a single gallery image or video slide
 */
export const GalleryImageSlide = ({ 
  image, 
  isActive, 
  index, 
  className 
}: GalleryImageSlideProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isVideo = image.type === "video";
  const isYouTube = isVideo && isYouTubeUrl(image.url);
  const altText = image.alt || image.description || `מדיה ${index + 1} מתוך אלבום ${image.albumName}`;
  
  // Reset playing state when slide changes
  useEffect(() => {
    if (!isActive) {
      setIsPlaying(false);
    }
  }, [isActive]);
  
  // For YouTube videos
  if (isVideo && isYouTube) {
    const videoId = getYouTubeVideoId(image.url);
    
    return (
      <div 
        className={cn(
          "absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out",
          isActive ? 'opacity-100' : 'opacity-0',
          className
        )}
      >
        {isActive && (
          <>
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                title={image.description || "YouTube video"}
                loading="lazy"
              ></iframe>
            ) : (
              <>
                <img
                  src={image.thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt={altText}
                  className="w-full h-full object-contain"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(true);
                  }}
                >
                  <div className="bg-white/20 backdrop-blur-md p-8 rounded-full transition-transform hover:scale-110">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  }
  
  // For direct video files
  if (isVideo) {
    return (
      <div 
        className={cn(
          "absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out",
          isActive ? 'opacity-100' : 'opacity-0',
          className
        )}
      >
        {isActive && (
          <video
            src={image.url}
            poster={image.thumbnail}
            controls
            autoPlay={isPlaying}
            className="w-full h-full object-contain"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={image.url} type="video/mp4" />
            דפדפן זה אינו תומך בהצגת סרטוני וידאו.
          </video>
        )}
        {!isPlaying && isActive && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              const videoElement = document.querySelector('video');
              if (videoElement) {
                videoElement.play();
                setIsPlaying(true);
              }
            }}
          >
            <div className="bg-white/20 backdrop-blur-md p-8 rounded-full transition-transform hover:scale-110">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Regular image slide
  return (
    <ResponsiveImage
      src={image.url}
      alt={altText}
      className={cn(
        "absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out",
        isActive ? 'opacity-100' : 'opacity-0',
        className
      )}
      width={800}
      height={450}
      loading={index === 0 ? "eager" : "lazy"}
      fetchPriority={index === 0 ? "high" : "auto"}
      sizes="(max-width: 768px) 100vw, 800px"
    />
  );
};
