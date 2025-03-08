
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import galleryConfig from "@/config/gallery.json";
import type { Section } from "@/types/section";
import { ResponsiveImage } from "@/components/ui/optimized-image";
import { processGalleryImages } from "@/utils/galleryUtils";
import { GalleryCarousel } from "@/components/gallery/GalleryCarousel";
import { GalleryModal } from "@/components/gallery/GalleryModal";
import { GalleryImageWithAlbum } from "@/types/gallery";

interface GallerySectionProps {
  section: Section;
}

/**
 * Renders the gallery section on the homepage
 */
export const GallerySection = ({ section }: GallerySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const images = processGalleryImages(galleryConfig.albums, section.max_display);

  // Set up intersection observer to detect when section is visible
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
    <section 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-secondary to-background relative"
      id="gallery-section"
    >
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
          {section.description && (
            <div 
              className="text-muted-foreground max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{ __html: section.description }}
            />
          )}
        </div>

        <div className="max-w-5xl mx-auto animate-on-scroll delay-200 relative">
          <GalleryCarousel 
            images={images} 
            autoplayInterval={section.interval || 5000}
            pauseOnHover={true}
          />
          
          {/* Add navigation buttons */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button 
              onClick={() => {
                const carousel = document.querySelector('[data-carousel]');
                if (carousel) {
                  const previous = carousel.querySelector('[data-carousel-previous]');
                  if (previous instanceof HTMLElement) {
                    previous.click();
                  }
                }
              }}
              className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all mx-2"
              aria-label="תמונה קודמת"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button 
              onClick={() => {
                const carousel = document.querySelector('[data-carousel]');
                if (carousel) {
                  const next = carousel.querySelector('[data-carousel-next]');
                  if (next instanceof HTMLElement) {
                    next.click();
                  }
                }
              }}
              className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all mx-2"
              aria-label="תמונה הבאה"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
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
