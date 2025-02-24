
import { ContactForm } from "@/components/ContactForm";
import { SectionProps } from "@/types/section";

export const ContactSection = ({ section }: SectionProps) => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold mb-4">
              {section.title}
            </h2>
            <p className="text-gray-600">
              {section.description}
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
