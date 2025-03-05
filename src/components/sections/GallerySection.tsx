
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import galleryConfig from "@/config/gallery.json";
import type { Section } from "@/types/section";
import { ResponsiveImage } from "@/components/ui/optimized-image";

interface GallerySectionProps {
  section: Section;
}

export const GallerySection = ({ section }: GallerySectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    if (images.length <= 1 || !isVisible) return;
    
    const intervalTime = section.interval || 5000;
    const interval = setInterval(nextImage, intervalTime);
    return () => clearInterval(interval);
  }, [section.interval, isVisible, images.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (!images.length) return null;

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-secondary to-background relative">
      {section.background && section.showBackground && (
        <div 
          className="absolute inset-0 z-0"
          style={{ opacity: section.background.opacity }}
        >
          <ResponsiveImage
            src={section.background.image}
            alt={section.background.alt || "רקע למדור גלריה"}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            loading="lazy"
            sizes="100vw"
          />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 
            className="text-4xl font-serif font-semibold mb-4"
            dangerouslySetInnerHTML={{ __html: section.title }}
          />
          <div 
            className="text-muted-foreground max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: section.description }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl animate-on-scroll delay-200">
          <div className="aspect-[16/9] bg-black" style={{ height: '0', paddingBottom: '56.25%' }}>
            {images.map((image, index) => (
              <ResponsiveImage
                key={index}
                src={image.url}
                alt={image.description || `תמונה ${index + 1} מתוך אלבום ${image.albumName}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
                width={800}
                height={450}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="(max-width: 768px) 100vw, 800px"
              />
            ))}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={prevImage}
              className="transform -translate-x-2 hover:translate-x-0 transition-all duration-300 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full"
              aria-label="תמונה קודמת"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>
            <button
              onClick={nextImage}
              className="transform translate-x-2 hover:translate-x-0 transition-all duration-300 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full"
              aria-label="תמונה הבאה"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="text-2xl font-medium mb-2">{images[currentIndex].albumName}</h3>
            <p className="text-white/90">{images[currentIndex].description}</p>
          </div>

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
                  aria-label={`עבור לתמונה ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {section.showButton !== false && (
          <div className="mt-12 flex justify-center animate-on-scroll delay-300">
            <Link to="/gallery" aria-label="לגלריה המלאה">
              <Button 
                className="group hover-lift flex items-center gap-2"
              >
                <span>לגלריה המלאה</span>
                <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
