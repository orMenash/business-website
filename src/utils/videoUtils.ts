
/**
 * Utility functions for handling video URLs and playback
 */

/**
 * Checks if a URL is a YouTube link - supports multiple YouTube URL formats
 * @param url The URL to check
 * @returns Whether the URL is a YouTube video link
 */
export const isYouTubeUrl = (url: string): boolean => {
  if (!url) return false;
  
  const youtubePatterns = [
    'youtube.com',
    'youtu.be',
    'youtube-nocookie.com',
    'youtube.com/embed',
    'youtube.com/watch',
    'youtu.be/',
    'youtube.com/v/'
  ];
  
  return youtubePatterns.some(pattern => url.includes(pattern));
};

/**
 * Extracts the YouTube video ID from various YouTube URL formats
 * @param url The YouTube URL
 * @returns The video ID if valid, null otherwise
 */
export const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  // Handle youtu.be/VIDEO_ID format
  if (url.includes('youtu.be/')) {
    const parts = url.split('youtu.be/');
    if (parts.length > 1) {
      const idWithParams = parts[1].split('?')[0].split('&')[0];
      if (idWithParams.length === 11) return idWithParams;
    }
  }
  
  // Handle youtube.com/watch?v=VIDEO_ID format
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Gets a valid YouTube embed URL from any YouTube URL format
 * @param url The YouTube URL
 * @returns A valid embed URL
 */
export const getYouTubeEmbedUrl = (url: string): string | null => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  
  // Use youtube-nocookie.com for better privacy and compatibility
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
};
