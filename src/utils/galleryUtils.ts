
import { Album, GalleryImage, GalleryImageWithAlbum, MediaType } from "@/types/gallery";

/**
 * Filters and processes images from gallery albums
 * @param albums The albums to process
 * @param maxDisplay Maximum number of images to display per album (not total)
 * @returns Processed gallery images with album information
 */
export const processGalleryImages = (
  albums: any[],  // Use any[] for input to handle JSON structure
  maxDisplay?: number | null
): GalleryImageWithAlbum[] => {
  // Filter visible albums
  const visibleAlbums = albums.filter(album => album.show_album);
  
  // Process images from each album
  const processedImages = visibleAlbums.flatMap(album => {
    // Apply maxDisplay per album if specified
    const imagesPerAlbum = maxDisplay && maxDisplay > 0 
      ? maxDisplay 
      : album.max_images;
    
    return album.images
      .filter((img: any) => img.show_image)
      .sort((a: any, b: any) => a.order - b.order)
      .slice(0, imagesPerAlbum)
      .map((img: any) => ({
        ...img,
        // Ensure type is a valid MediaType (default to "image" if not specified or invalid)
        type: isValidMediaType(img.type) ? img.type : "image",
        albumId: album.id,
        albumName: album.name
      }));
  });
  
  return processedImages;
};

/**
 * Validates that a media type is one of the allowed values
 * @param type The type to validate
 * @returns Whether the type is valid
 */
const isValidMediaType = (type: any): type is MediaType => {
  return type === "image" || type === "video";
};

/**
 * Safely get the next index in a circular array
 * @param currentIndex Current index
 * @param arrayLength Length of the array
 * @returns Next index
 */
export const getNextIndex = (currentIndex: number, arrayLength: number): number => {
  if (arrayLength <= 1) return 0;
  return (currentIndex + 1) % arrayLength;
};

/**
 * Safely get the previous index in a circular array
 * @param currentIndex Current index
 * @param arrayLength Length of the array
 * @returns Previous index
 */
export const getPreviousIndex = (currentIndex: number, arrayLength: number): number => {
  if (arrayLength <= 1) return 0;
  return (currentIndex - 1 + arrayLength) % arrayLength;
};
