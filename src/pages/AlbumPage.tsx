
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import galleryConfig from "@/config/gallery.json";
import { AlbumHeader } from "@/components/gallery/AlbumHeader";
import { AlbumGrid } from "@/components/gallery/AlbumGrid";
import { GalleryModal } from "@/components/gallery/GalleryModal";
import { GalleryImage, GalleryImageWithAlbum, MediaType } from "@/types/gallery";

const AlbumPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const album = galleryConfig.albums.find((a) => a.id === albumId);
  
  if (!album || !album.show_album) {
    navigate("/gallery");
    return null;
  }

  const breadcrumbItems = [
    { label: "דף הבית", path: "/" },
    { label: "גלריה", path: "/gallery" },
    { label: album.name, path: `/gallery/${albumId}` }
  ];

  // Filter and sort images
  const images = album.images
    .filter(img => img.show_image)
    .sort((a, b) => a.order - b.order) as GalleryImage[];

  // Convert images to required format for GalleryModal
  const galleryImages: GalleryImageWithAlbum[] = images.map(img => ({
    ...img,
    type: img.type as MediaType,
    albumId: album.id,
    albumName: album.name
  }));

  const handleSelectImage = (index: number) => {
    setIsPlaying(false);
    setSelectedImageIndex(index);
  };

  const handlePrevious = () => {
    setIsPlaying(false);
    setSelectedImageIndex((prev) => 
      prev !== null ? (prev > 0 ? prev - 1 : images.length - 1) : null
    );
  };

  const handleNext = () => {
    setIsPlaying(false);
    setSelectedImageIndex((prev) => 
      prev !== null ? (prev < images.length - 1 ? prev + 1 : 0) : null
    );
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    setIsPlaying(false);
  };

  // Reset video playing state when dialog closes
  useEffect(() => {
    if (selectedImageIndex === null) {
      setIsPlaying(false);
    }
  }, [selectedImageIndex]);

  return (
    <div className="container mx-auto px-4 py-24">
      <AlbumHeader 
        albumName={album.name}
        breadcrumbItems={breadcrumbItems}
      />

      <AlbumGrid 
        images={images as GalleryImage[]}
        onImageClick={handleSelectImage}
      />

      {/* Gallery Modal */}
      {selectedImageIndex !== null && (
        <GalleryModal
          images={galleryImages}
          selectedImageIndex={selectedImageIndex}
          onClose={handleCloseModal}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSelectImage={handleSelectImage}
        />
      )}
    </div>
  );
};

export default AlbumPage;
