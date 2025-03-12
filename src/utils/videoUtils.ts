
/**
 * Checks if a URL is a YouTube URL
 * @param url URL to check
 * @returns Boolean indicating if the URL is a YouTube URL
 */
export const isYouTubeUrl = (url: string): boolean => {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
};

/**
 * Extracts the video ID from a YouTube URL
 * @param url YouTube URL
 * @returns YouTube video ID or null if not a valid YouTube URL
 */
export const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  // Handle youtu.be format
  if (url.includes('youtu.be')) {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1].split('?')[0];
  }
  
  // Handle youtube.com/watch format
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Generates a YouTube embed URL that respects privacy (using youtube-nocookie.com)
 * @param videoId YouTube video ID
 * @param autoplay Whether to autoplay the video
 * @returns Embed URL for the YouTube video
 */
export const getYouTubeEmbedUrl = (videoId: string | null, autoplay: boolean = false): string => {
  if (!videoId) return '';
  
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0${autoplay ? '&autoplay=1' : ''}`;
};

/**
 * Gets a thumbnail URL for a YouTube video
 * @param videoId YouTube video ID
 * @returns URL for the video thumbnail
 */
export const getYouTubeThumbnailUrl = (videoId: string | null): string => {
  if (!videoId) return '';
  
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};
