
import { ContactForm } from "@/components/ContactForm";
import { SectionProps } from "@/types/section";

export const ContactSection = ({ section }: SectionProps) => {
  // Get background color from section configuration
  const backgroundColor = section.background?.backgroundColor || "#f8f9fa";

  return (
    <section 
      className="py-16 relative"
      style={{ backgroundColor }}
    >
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
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 
              className="text-3xl font-serif font-semibold mb-4"
              dangerouslySetInnerHTML={{ __html: section.title }}
            />
            <div 
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: section.description }}
            />
          </div>
          <div className="animate-on-scroll delay-200">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
