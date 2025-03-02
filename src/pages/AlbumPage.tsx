import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import galleryConfig from "@/config/gallery.json";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";

const AlbumPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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

  const images = album.images.filter(img => img.show_image).sort((a, b) => a.order - b.order);

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => 
      prev !== null ? (prev > 0 ? prev - 1 : images.length - 1) : null
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => 
      prev !== null ? (prev < images.length - 1 ? prev + 1 : 0) : null
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") handleNext();
    if (e.key === "ArrowRight") handlePrevious();
    if (e.key === "Escape") setSelectedImageIndex(null);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-serif font-semibold">{album.name}</h1>
        <Button 
          variant="outline"
          onClick={() => navigate("/gallery")}
          className="hover:scale-105 transition-transform duration-300"
        >
          חזרה לגלריה
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div 
            key={index}
            className="group aspect-square rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => setSelectedImageIndex(index)}
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

      <Dialog 
        open={selectedImageIndex !== null} 
        onOpenChange={() => setSelectedImageIndex(null)}
      >
        <DialogContent className="max-w-7xl h-[90vh] p-0 bg-gradient-to-b from-gray-900 to-black border-none">
          <div className="relative h-full flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 text-white/90 hover:text-white z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-all duration-300"
              onClick={() => setSelectedImageIndex(null)}
            >
              <X className="w-6 h-6" />
            </button>
            
            {selectedImageIndex !== null && (
              <>
                <img
                  src={images[selectedImageIndex].url}
                  alt={images[selectedImageIndex].description}
                  className="max-h-[80vh] max-w-full object-contain mx-auto"
                />

                {images[selectedImageIndex].description && (
                  <div className="absolute bottom-20 left-0 right-0 p-6 bg-black/50 backdrop-blur-sm text-white text-center">
                    <p className="text-lg">{images[selectedImageIndex].description}</p>
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
                      {images.map((_, idx) => (
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

export default AlbumPage;
