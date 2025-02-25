
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import galleryConfig from "@/config/gallery.json";
import type { Section } from "@/types/section";

interface GallerySectionProps {
  section: Section;
}

export const GallerySection = ({ section }: GallerySectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = galleryConfig.albums
    .filter(album => album.show_album)
    .flatMap(album => 
      album.images
        .filter(img => img.show_image)
        .sort((a, b) => a.order - b.order)
        .slice(0, section.max_display || 2)
        .map(img => ({
          ...img,
          albumId: album.id,
          albumName: album.name
        }))
    );

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(nextImage, section.interval || 5000);
    return () => clearInterval(interval);
  }, [section.interval]);

  if (!images.length) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-serif font-semibold mb-4">{section.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{section.description}</p>
        </div>

        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          <div className="aspect-[16/9] bg-black">
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].description}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Navigation Controls */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={prevImage}
              className="transform -translate-x-2 hover:translate-x-0 transition-all duration-300 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="transform translate-x-2 hover:translate-x-0 transition-all duration-300 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="text-2xl font-medium mb-2">{images[currentIndex].albumName}</h3>
            <p className="text-white/90">{images[currentIndex].description}</p>
          </div>

          {/* Thumbnail Navigation */}
          <div className="absolute bottom-0 left-0 right-0 px-8 pb-24">
            <div className="flex justify-center gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? "bg-white scale-125" 
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/gallery">
            <Button 
              variant="outline" 
              size="lg"
              className="hover:scale-105 transition-transform duration-300"
            >
              לגלריה המלאה
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
