
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SectionProps } from "@/types/section";
import { Button } from "@/components/ui/button";

export const AboutSection = ({ section }: SectionProps) => {
  return (
    <section className="section-spacing relative overflow-hidden">
      {section.background && section.showBackground && (
        <div 
          className="absolute inset-0 z-0"
          style={{ opacity: section.background.opacity }}
        >
          <img
            src={section.background.image}
            alt={section.background.alt}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="container container-padding mx-auto relative z-10">
        <div className={`grid ${section.showImage ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-12 items-center justify-center`}>
          <div className="animate-on-scroll flex flex-col items-center text-center">
            <h2 className="text-3xl font-serif font-semibold mb-4">
              {section.title}
            </h2>
            <p 
              className="text-gray-600 mb-6"
              dangerouslySetInnerHTML={{ __html: section.description }}
            />
            <div className="mb-6 prose prose-gray max-w-none">
              {section.fullDescription && (
                <div 
                  className="text-balance"
                  dangerouslySetInnerHTML={{ __html: section.fullDescription.slice(0, 200) + '...' }}
                />
              )}
            </div>
            <Link to="/about">
              <Button className="group hover-lift flex items-center gap-2">
                <span>{section.cta || "קרא עוד"}</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          {section.showImage && section.image && (
            <div className="relative animate-on-scroll flex justify-center">
              <div className="rounded-lg overflow-hidden shadow-xl animated-border">
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="w-full h-auto rounded-lg transform transition-transform hover:scale-105 duration-500"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-lg -z-10"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/5 rounded-lg -z-10"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
