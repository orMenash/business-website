
import { useBusiness } from "@/contexts/BusinessContext";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionProps } from "@/types/section";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const ServicesSection = ({ section }: SectionProps) => {
  const { services } = useBusiness();
  
  if (services.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 animate-on-scroll">
          <h2 className="text-3xl font-serif font-semibold mb-4">
            {section.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {section.description}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {services
            .filter(service => service.show)
            .slice(0, section.max_display)
            .map((service, index) => (
              <div key={service.id} className={`w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] animate-on-scroll delay-${index * 100}`}>
                <ServiceCard
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  clickable={service.clickable}
                />
              </div>
            ))}
        </div>
        {section.showButton !== false && (
          <div className="flex justify-center animate-on-scroll delay-300">
            <Link to="/services">
              <Button className="group hover-lift flex items-center gap-2">
                <span>{section.cta || "לכל השירותים"}</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
