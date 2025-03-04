
import { useState } from "react";
import { Link } from "react-router-dom";
import galleryConfig from "@/config/gallery.json";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

const GalleryPage = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const breadcrumbItems = [
    { label: "דף הבית", path: "/" },
    { label: "גלריה", path: "/gallery" }
  ];

  const albums = galleryConfig.albums.filter((album) => album.show_album);
  
  const currentAlbumImages = selectedAlbum
    ? albums.find(a => a.id === selectedAlbum)?.images.filter(img => img.show_image) || []
    : [];

  const handlePrevious = () => {
    setSelectedImageIndex(prev => 
      prev !== null ? (prev > 0 ? prev - 1 : currentAlbumImages.length - 1) : null
    );
  };

  const handleNext = () => {
    setSelectedImageIndex(prev => 
      prev !== null ? (prev < currentAlbumImages.length - 1 ? prev + 1 : 0) : null
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") handleNext();
    if (e.key === "ArrowRight") handlePrevious();
    if (e.key === "Escape") {
      setSelectedImageIndex(null);
      setSelectedAlbum(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <Breadcrumb items={breadcrumbItems} />
      
      <h1 className="text-4xl font-serif font-semibold mb-12 text-center">גלריה</h1>
      <div className="space-y-16">
        {albums.map((album) => (
          <div key={album.id} className="space-y-6">
            <Link 
              to={`/gallery/${album.id}`}
              className="text-2xl font-serif font-medium hover:text-accent transition-colors block"
            >
              {album.name}
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {album.images
                .filter(img => img.show_image)
                .sort((a, b) => a.order - b.order)
                .slice(0, album.max_images)
                .map((image, index) => (
                  <div 
                    key={index}
                    className="group aspect-square rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                    onClick={() => {
                      setSelectedAlbum(album.id);
                      setSelectedImageIndex(index);
                    }}
                  >
                    <div className="relative h-full">
                      <img
                        src={image.url}
                        alt={image.description}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center">
                          <ZoomIn className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm px-4">{image.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog 
        open={selectedImageIndex !== null} 
        onOpenChange={() => {
          setSelectedImageIndex(null);
          setSelectedAlbum(null);
        }}
      >
        <DialogContent className="max-w-7xl h-[90vh] p-0 bg-gradient-to-b from-gray-900 to-black border-none">
          <div className="relative h-full flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 text-white/90 hover:text-white z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-all duration-300"
              onClick={() => {
                setSelectedImageIndex(null);
                setSelectedAlbum(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>
            
            {selectedImageIndex !== null && selectedAlbum && (
              <>
                <img
                  src={currentAlbumImages[selectedImageIndex].url}
                  alt={currentAlbumImages[selectedImageIndex].description}
                  className="max-h-[80vh] max-w-full object-contain mx-auto"
                />

                {currentAlbumImages[selectedImageIndex].description && (
                  <div className="absolute bottom-20 left-0 right-0 p-6 bg-black/50 backdrop-blur-sm text-white text-center">
                    <p className="text-lg">{currentAlbumImages[selectedImageIndex].description}</p>
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handlePrevious}
                      className="bg-white/90 hover:bg-white text-black p-3 rounded-full transition-all transform hover:-translate-x-1"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="flex justify-center gap-2">
                      {currentAlbumImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            idx === selectedImageIndex 
                              ? "bg-white scale-125" 
                              : "bg-white/50 hover:bg-white/80"
                          }`}
                        />
                      ))}
                    </div>
                    <button 
                      onClick={handleNext}
                      className="bg-white/90 hover:bg-white text-black p-3 rounded-full transition-all transform hover:translate-x-1"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryPage;
