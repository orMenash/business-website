
import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { getYouTubeVideoId, getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from "@/utils/videoUtils";

interface YouTubePlayerProps {
  url: string;
  thumbnail?: string;
  description?: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
  autoplay?: boolean;
}

/**
 * Component for playing YouTube videos
 */
export const YouTubePlayer = ({
  url,
  thumbnail,
  description,
  onPlayStateChange,
  autoplay = false
}: YouTubePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const videoId = getYouTubeVideoId(url);
  
  // Generate thumbnail URL if none provided
  const thumbnailUrl = thumbnail || (videoId ? getYouTubeThumbnailUrl(videoId) : '');
  
  // Notify parent component when playing state changes
  useEffect(() => {
    if (onPlayStateChange) {
      onPlayStateChange(isPlaying);
    }
  }, [isPlaying, onPlayStateChange]);
  
  // Start playing if autoplay is true
  useEffect(() => {
    if (autoplay) {
      setIsPlaying(true);
    }
  }, [autoplay]);
  
  if (!videoId) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
        <p>קישור יוטיוב לא תקין</p>
      </div>
    );
  }
  
  return (
    <div className="relative w-full h-full aspect-video">
      {isPlaying ? (
        <iframe
          src={getYouTubeEmbedUrl(videoId, true)}
          title={description || "סרטון YouTube"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      ) : (
        <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
          <img
            src={thumbnailUrl}
            alt={description || "תמונה ממוזערת של סרטון"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-full transition-transform hover:scale-110">
              <Play className="w-10 h-10 text-white" fill="white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
