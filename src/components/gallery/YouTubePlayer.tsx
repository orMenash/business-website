
import { Play } from "lucide-react";
import { useState, useEffect } from "react";
import { getYouTubeVideoId, getYouTubeEmbedUrl } from "@/utils/videoUtils";

interface YouTubePlayerProps {
  url: string;
  thumbnail?: string;
  description?: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

/**
 * Component for displaying and playing YouTube videos
 */
export const YouTubePlayer = ({ 
  url, 
  thumbnail, 
  description, 
  onPlayStateChange 
}: YouTubePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYouTubeVideoId(url);
  const embedUrl = getYouTubeEmbedUrl(url);
  
  const handlePlay = () => {
    setIsPlaying(true);
    if (onPlayStateChange) {
      onPlayStateChange(true);
    }
  };
  
  // If URL changes, reset playing state
  useEffect(() => {
    setIsPlaying(false);
  }, [url]);
  
  if (!videoId) return null;
  
  return (
    <>
      {isPlaying ? (
        <iframe
          src={embedUrl || `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="max-h-[80vh] w-full aspect-video"
          title={description || "YouTube video"}
        ></iframe>
      ) : (
        <>
          <img
            src={thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={description || "YouTube video thumbnail"}
            className="max-h-[80vh] max-w-full object-contain mx-auto"
          />
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
            onClick={handlePlay}
          >
            <div className="bg-white/20 backdrop-blur-md p-8 rounded-full transition-transform hover:scale-110">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
        </>
      )}
    </>
  );
};
