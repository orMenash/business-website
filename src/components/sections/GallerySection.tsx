
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
  
  // מיון וסינון האלבומים והתמונות
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

  // אוטומציה של החלפת התמונות
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(nextImage, section.interval || 5000);
    return () => clearInterval(interval);
  }, [section.interval]);

  if (!images.length) return null;

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-semibold mb-4">{section.title}</h2>
          <p className="text-muted-foreground">{section.description}</p>
        </div>

        <div className="relative max-w-4xl mx-auto aspect-[16/9] overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-black/20 z-10" />
          
          {/* תמונה נוכחית */}
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].description}
            className="w-full h-full object-cover transition-transform duration-500"
          />
          
          {/* כפתורי ניווט */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* מידע על התמונה */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-20 text-white">
            <h3 className="text-lg font-medium mb-2">{images[currentIndex].albumName}</h3>
            <p className="text-sm opacity-90">{images[currentIndex].description}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/gallery">
            <Button variant="outline" size="lg">
              לגלריה המלאה
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
