
export interface GalleryImage {
  url: string;
  show_image: boolean;
  order: number;
  description: string;
}

export interface Album {
  id: string;
  name: string;
  show_album: boolean;
  max_images: number;
  images: GalleryImage[];
}

export interface GalleryConfig {
  albums: Album[];
}
