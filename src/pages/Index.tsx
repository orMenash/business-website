
import { useMemo } from "react";
import siteConfig from "@/config/site.json";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ClientsSection } from "@/components/sections/ClientsSection";

interface SectionComponentMap {
  [key: string]: React.ComponentType<any>;
}

/**
 * Main index page component that displays all visible sections
 * in the order defined by their configuration
 */
const Index = () => {
  // Map section IDs to their corresponding components
  const sectionComponents: SectionComponentMap = {
    hero: HeroSection,
    about: AboutSection,
    services: ServicesSection,
    clients: ClientsSection,
    team: TeamSection,
    testimonials: TestimonialsSection,
    projects: ProjectsSection,
    articles: ArticlesSection,
    gallery: GallerySection,
    contact: ContactSection,
  };

  // Memoize the sorted and filtered sections to prevent unnecessary re-renders
  const orderedSections = useMemo(() => {
    return Object.entries(siteConfig.sections)
      .sort(([, a], [, b]) => a.order - b.order)
      .filter(([, section]) => section.show);
  }, []);

  return (
    <div className="min-h-screen">
      {orderedSections.map(([sectionId, sectionConfig]) => {
        const SectionComponent = sectionComponents[sectionId];
        
        if (!SectionComponent) return null;
        
        return (
          <div key={sectionId} id={sectionId}>
            <SectionComponent section={sectionConfig} />
          </div>
        );
      })}
    </div>
  );
};

export default Index;
