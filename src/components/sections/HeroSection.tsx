
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useBusiness } from "@/contexts/BusinessContext";
import { SectionProps } from "@/types/section";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ui/optimized-image";

export const HeroSection = ({ section }: SectionProps) => {
  const { name, description } = useBusiness();
  
  // Get background color from section configuration
  const backgroundColor = section.background?.backgroundColor || "#ffffff";

  return (
    <section 
      className="pt-32 pb-16 bg-gradient-to-b from-secondary to-white relative"
      style={{ backgroundColor }}
    >
      {section.background && section.showBackground && (
        <div 
          className="absolute inset-0 z-0"
          style={{ opacity: section.background.opacity }}
        >
          <ResponsiveImage
            src={section.background.image}
            alt={section.background.alt || "תמונת רקע ראשית"}
            className="w-full h-full object-cover"
            width={1920} 
            height={1080}
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
          />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-5xl font-serif font-semibold mb-4 animate-on-scroll"
            dangerouslySetInnerHTML={{ __html: name }}
          />
          <div 
            className="text-xl text-gray-600 mb-8 animate-on-scroll delay-200"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {section.showButton !== false && (
            <div className="flex justify-center animate-on-scroll delay-300">
              <Link to="/contact" aria-label="צור קשר">
                <Button className="group hover-lift flex items-center gap-2">
                  <span>{section.cta || "צור קשר"}</span>
                  <ArrowLeft className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
