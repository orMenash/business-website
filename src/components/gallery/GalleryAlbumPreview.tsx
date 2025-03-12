
import { useState } from "react";
import { Link } from "react-router-dom";
import { Album, GalleryImage } from "@/types/gallery";
import { AlbumGrid } from "./AlbumGrid";

interface GalleryAlbumPreviewProps {
  album: Album;
  onImageClick: (albumId: string, imageIndex: number) => void;
}

export const GalleryAlbumPreview = ({ album, onImageClick }: GalleryAlbumPreviewProps) => {
  // Filter and sort images for display
  const displayImages = album.images
    .filter(img => img.show_image)
    .sort((a, b) => a.order - b.order)
    .slice(0, album.max_images) as GalleryImage[];

  return (
    <div className="space-y-6">
      <Link 
        to={`/gallery/${album.id}`}
        className="text-2xl font-serif font-medium hover:text-accent transition-colors block"
      >
        {album.name}
      </Link>

      <AlbumGrid 
        images={displayImages}
        onImageClick={(index) => onImageClick(album.id, index)}
      />
    </div>
  );
};
