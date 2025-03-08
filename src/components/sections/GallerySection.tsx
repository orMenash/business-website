
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import galleryConfig from "@/config/gallery.json";
import type { Section } from "@/types/section";
import { ResponsiveImage } from "@/components/ui/optimized-image";
import { processGalleryImages } from "@/utils/galleryUtils";
import { GalleryCarousel } from "@/components/gallery/GalleryCarousel";

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
  // Ensure the interval is always passed correctly from JSON config
  const interval = section.interval || 5000;

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
      className="py-24 bg-gradient-to-b from-secondary/50 to-background relative overflow-hidden"
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

        <div className="max-w-5xl mx-auto animate-on-scroll delay-200">
          <GalleryCarousel 
            images={images} 
            autoplayInterval={interval}
            pauseOnHover={true}
            className="transform transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl"
          />
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
