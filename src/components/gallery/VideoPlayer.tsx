
import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
  description?: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
  autoplay?: boolean;
}

/**
 * Component for playing local/direct video files
 */
export const VideoPlayer = ({
  url,
  thumbnail,
  description,
  onPlayStateChange,
  autoplay = false
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Notify parent component when playing state changes
  useEffect(() => {
    if (onPlayStateChange) {
      onPlayStateChange(isPlaying);
    }
  }, [isPlaying, onPlayStateChange]);
  
  // Handle autoplay
  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Autoplay failed:", err);
        setIsPlaying(false);
      });
    }
  }, [autoplay]);
  
  return (
    <div className="relative w-full h-full flex justify-center">
      <video
        ref={videoRef}
        src={url}
        poster={thumbnail}
        controls={isPlaying}
        className="max-h-full max-w-full"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={url} type="video/mp4" />
        דפדפן זה אינו תומך בהצגת סרטוני וידאו.
      </video>
      
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={() => {
            const video = videoRef.current;
            if (video) {
              video.play().catch(err => {
                console.error("Play failed:", err);
              });
              setIsPlaying(true);
            }
          }}
        >
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-full transition-transform hover:scale-110">
            <Play className="w-10 h-10 text-white" fill="white" />
          </div>
        </div>
      )}
    </div>
  );
};
