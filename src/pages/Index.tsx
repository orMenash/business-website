
import { FloatingContact } from "@/components/FloatingContact";
import siteConfig from "@/config/site.json";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  // מיון האזורים לפי הסדר שהוגדר בקונפיגורציה
  const sections = Object.entries(siteConfig.sections)
    .sort(([, a], [, b]) => a.order - b.order)
    .filter(([, section]) => section.show);

  const renderSection = (sectionId: string) => {
    const section = siteConfig.sections[sectionId];
    
    switch (sectionId) {
      case 'hero':
        return <HeroSection key="hero" section={section} />;
      case 'services':
        return <ServicesSection key="services" section={section} />;
      case 'team':
        return <TeamSection key="team" section={section} />;
      case 'testimonials':
        return <TestimonialsSection key="testimonials" section={section} />;
      case 'projects':
        return <ProjectsSection key="projects" section={section} />;
      case 'gallery':
        return <GallerySection key="gallery" section={section} />;
      case 'contact':
        return <ContactSection key="contact" section={section} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <FloatingContact />
      {sections.map(([sectionId]) => renderSection(sectionId))}
    </div>
  );
};

export default Index;
