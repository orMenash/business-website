
import { useState, useEffect } from "react";
import galleryConfig from "@/config/gallery.json";
import { Breadcrumb } from "@/components/Breadcrumb";
import { GalleryModal } from "@/components/gallery/GalleryModal";
import { GalleryPreviewList } from "@/components/gallery/GalleryPreviewList";
import { Album, GalleryImageWithAlbum, MediaType } from "@/types/gallery";

const GalleryPage = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Breadcrumb setup
  const breadcrumbItems = [
    { label: "דף הבית", path: "/" },
    { label: "גלריה", path: "/gallery" }
  ];

  // Filter visible albums
  const albums = galleryConfig.albums.filter(
    (album) => album.show_album
  ) as Album[];
  
  // Get images from the selected album if any
  const currentAlbumImages = selectedAlbum
    ? albums.find(a => a.id === selectedAlbum)?.images
        .filter(img => img.show_image)
        .sort((a, b) => a.order - b.order) || []
    : [];

  // Convert images for GalleryModal
  const galleryImagesForModal: GalleryImageWithAlbum[] = 
    selectedAlbum ? currentAlbumImages.map(img => ({
      ...img,
      type: img.type as MediaType,
      albumId: selectedAlbum,
      albumName: albums.find(a => a.id === selectedAlbum)?.name || ""
    })) : [];

  // Handle navigation in the modal
  const handlePrevious = () => {
    setIsPlaying(false);
    setSelectedImageIndex(prev => 
      prev !== null ? (prev > 0 ? prev - 1 : currentAlbumImages.length - 1) : null
    );
  };

  const handleNext = () => {
    setIsPlaying(false);
    setSelectedImageIndex(prev => 
      prev !== null ? (prev < currentAlbumImages.length - 1 ? prev + 1 : 0) : null
    );
  };

  // Handle image selection from album previews
  const handleSelectImage = (albumId: string, index: number) => {
    setSelectedAlbum(albumId);
    setSelectedImageIndex(index);
    setIsPlaying(false);
  };

  // Reset playing state when modal closes
  useEffect(() => {
    if (selectedImageIndex === null) {
      setIsPlaying(false);
    }
  }, [selectedImageIndex]);

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    setSelectedAlbum(null);
    setIsPlaying(false);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <Breadcrumb items={breadcrumbItems} />
      
      <h1 className="text-4xl font-serif font-semibold mb-12 text-center">גלריה</h1>

      <GalleryPreviewList 
        albums={albums}
        onImageClick={handleSelectImage}
      />

      {/* Gallery Modal */}
      {selectedImageIndex !== null && selectedAlbum && (
        <GalleryModal
          images={galleryImagesForModal}
          selectedImageIndex={selectedImageIndex}
          onClose={handleCloseModal}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSelectImage={setSelectedImageIndex}
        />
      )}
    </div>
  );
};

export default GalleryPage;
