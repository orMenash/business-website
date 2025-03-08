
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import galleryConfig from "@/config/gallery.json";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn, Play } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

// Utility functions to handle YouTube URLs
const isYouTubeUrl = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const GalleryPage = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const breadcrumbItems = [
    { label: "דף הבית", path: "/" },
    { label: "גלריה", path: "/gallery" }
  ];

  const albums = galleryConfig.albums.filter((album) => album.show_album);
  
  const currentAlbumImages = selectedAlbum
    ? albums.find(a => a.id === selectedAlbum)?.images.filter(img => img.show_image) || []
    : [];

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

  // Reset video playing state when dialog closes
  useEffect(() => {
    if (selectedImageIndex === null) {
      setIsPlaying(false);
    }
  }, [selectedImageIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
                      setIsPlaying(false);
                    }}
                  >
                    <div className="relative h-full">
                      <img
                        src={image.type === "video" ? (image.thumbnail || (isYouTubeUrl(image.url) ? `https://img.youtube.com/vi/${getYouTubeVideoId(image.url)}/hqdefault.jpg` : image.url)) : image.url}
                        alt={image.description}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center">
                          {image.type === "video" ? (
                            <Play className="w-8 h-8 mx-auto mb-2" />
                          ) : (
                            <ZoomIn className="w-8 h-8 mx-auto mb-2" />
                          )}
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
        onOpenChange={(open) => {
          if (!open) {
            setSelectedImageIndex(null);
            setSelectedAlbum(null);
            setIsPlaying(false);
          }
        }}
      >
        <DialogContent className="max-w-7xl h-[90vh] p-0 bg-gradient-to-b from-gray-900 to-black border-none">
          <div className="relative h-full flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 text-white/90 hover:text-white z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-all duration-300"
              onClick={() => {
                setSelectedImageIndex(null);
                setSelectedAlbum(null);
                setIsPlaying(false);
              }}
            >
              <X className="w-6 h-6" />
            </button>
            
            {selectedImageIndex !== null && selectedAlbum && (
              <>
                {currentAlbumImages[selectedImageIndex].type === "video" && isYouTubeUrl(currentAlbumImages[selectedImageIndex].url) ? (
                  // YouTube Video
                  <>
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentAlbumImages[selectedImageIndex].url)}?autoplay=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="max-h-[80vh] w-full aspect-video"
                        title={currentAlbumImages[selectedImageIndex].description || "YouTube video"}
                      ></iframe>
                    ) : (
                      <>
                        <img
                          src={currentAlbumImages[selectedImageIndex].thumbnail || `https://img.youtube.com/vi/${getYouTubeVideoId(currentAlbumImages[selectedImageIndex].url)}/hqdefault.jpg`}
                          alt={currentAlbumImages[selectedImageIndex].description}
                          className="max-h-[80vh] max-w-full object-contain mx-auto"
                        />
                        <div 
                          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                          onClick={() => setIsPlaying(true)}
                        >
                          <div className="bg-white/20 backdrop-blur-md p-8 rounded-full transition-transform hover:scale-110">
                            <Play className="w-12 h-12 text-white" />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : currentAlbumImages[selectedImageIndex].type === "video" ? (
                  // Standard Video
                  <video
                    src={currentAlbumImages[selectedImageIndex].url}
                    poster={currentAlbumImages[selectedImageIndex].thumbnail}
                    controls
                    autoPlay
                    className="max-h-[80vh] max-w-full object-contain mx-auto"
                  >
                    <source src={currentAlbumImages[selectedImageIndex].url} type="video/mp4" />
                    דפדפן זה אינו תומך בהצגת סרטוני וידאו.
                  </video>
                ) : (
                  // Image
                  <img
                    src={currentAlbumImages[selectedImageIndex].url}
                    alt={currentAlbumImages[selectedImageIndex].description}
                    className="max-h-[80vh] max-w-full object-contain mx-auto"
                  />
                )}

                {currentAlbumImages[selectedImageIndex].description && (
                  <div className="absolute bottom-20 left-0 right-0 p-6 bg-black/50 backdrop-blur-sm text-white text-center">
                    <p className="text-lg">{currentAlbumImages[selectedImageIndex].description}</p>
                  </div>
                )}

                {/* Navigation Controls - Adjusted position when showing video */}
                <div className={`absolute ${isPlaying ? 'bottom-24' : 'bottom-4'} left-0 right-0 flex flex-col items-center gap-4`}>
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
                          onClick={() => {
                            setIsPlaying(false);
                            setSelectedImageIndex(idx);
                          }}
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
