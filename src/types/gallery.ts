
/**
 * Type of media item in the gallery
 */
export type MediaType = "image" | "video";

/**
 * Represents a media item (image or video) in a gallery album
 */
export interface GalleryImage {
  url: string;
  show_image: boolean;
  order: number;
  description: string;
  thumbnail?: string;
  alt?: string;
  type: MediaType; // Changed from optional to required, with default handling in the utils
}

/**
 * Represents an album in the gallery
 */
export interface Album {
  id: string;
  name: string;
  show_album: boolean;
  max_images: number;
  images: GalleryImage[];
}

/**
 * Configuration for the entire gallery
 */
export interface GalleryConfig {
  albums: Album[];
}

/**
 * Extended GalleryImage with album information for display
 */
export interface GalleryImageWithAlbum extends GalleryImage {
  albumId: string;
  albumName: string;
}
