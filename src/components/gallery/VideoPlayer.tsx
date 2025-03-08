
import { Play } from "lucide-react";
import { useState } from "react";

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
  description?: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

/**
 * Component for displaying and playing standard video files
 */
export const VideoPlayer = ({ 
  url, 
  thumbnail, 
  description, 
  onPlayStateChange 
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlay = () => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.play();
      setIsPlaying(true);
      if (onPlayStateChange) {
        onPlayStateChange(true);
      }
    }
  };
  
  const handleVideoStateChange = (playing: boolean) => {
    setIsPlaying(playing);
    if (onPlayStateChange) {
      onPlayStateChange(playing);
    }
  };
  
  return (
    <>
      <video
        src={url}
        poster={thumbnail}
        controls
        autoPlay={isPlaying}
        className="max-h-[80vh] max-w-full object-contain mx-auto"
        onPlay={() => handleVideoStateChange(true)}
        onPause={() => handleVideoStateChange(false)}
      >
        <source src={url} type="video/mp4" />
        דפדפן זה אינו תומך בהצגת סרטוני וידאו.
      </video>
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handlePlay();
          }}
        >
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-full transition-transform hover:scale-110">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
      )}
    </>
  );
};
