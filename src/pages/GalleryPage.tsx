
import { useState } from "react";
import { Link } from "react-router-dom";
import galleryConfig from "@/config/gallery.json";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const GalleryPage = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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

  return (
    <div className="container mx-auto px-4 py-24">
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
                        <p className="text-white text-center p-4">{image.description}</p>
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
        <DialogContent className="max-w-6xl h-[90vh] p-0 bg-black/90">
          <div className="relative h-full flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 text-white z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
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
                  className="max-h-full max-w-full object-contain"
                />
                <button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-3 rounded-full hover:bg-black/70 transition-colors transform -translate-x-2 hover:translate-x-0"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-3 rounded-full hover:bg-black/70 transition-colors transform translate-x-2 hover:translate-x-0"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                {currentAlbumImages[selectedImageIndex].description && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/50 backdrop-blur-sm text-white text-center">
                    {currentAlbumImages[selectedImageIndex].description}
                  </div>
                )}

                {/* Thumbnail Navigation */}
                <div className="absolute bottom-20 left-0 right-0 px-4">
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
