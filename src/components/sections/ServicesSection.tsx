
import { useBusiness } from "@/contexts/BusinessContext";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionProps } from "@/types/section";

export const ServicesSection = ({ section }: SectionProps) => {
  const { services } = useBusiness();
  
  if (services.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-semibold mb-4">
            {section.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {section.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services
            .filter(service => service.show)
            .slice(0, section.max_display)
            .map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                clickable={service.clickable}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
