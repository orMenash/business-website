
import { ClientCard } from "@/components/ClientCard";
import { SectionProps } from "@/types/section";
import clientsConfig from "@/config/clients.json";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const ClientsSection = ({ section }: SectionProps) => {
  if (clientsConfig.clients.length === 0) return null;

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
            alt={section.background.alt || "רקע למדור לקוחות"}
            className="w-full h-full object-cover"
            width="1920"
            height="1080"
          />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 
            className="text-3xl font-serif font-semibold mb-4"
            dangerouslySetInnerHTML={{ __html: section.title }}
          />
          <div 
            className="text-gray-600 mb-6"
            dangerouslySetInnerHTML={{ __html: section.description }}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {clientsConfig.clients
            .filter(client => client.show)
            .slice(0, section.max_display)
            .map((client, index) => (
              <div key={client.id} className={`animate-on-scroll delay-${index * 100}`}>
                <ClientCard
                  name={client.name}
                  description={client.description}
                  logo={client.logo}
                  url={client.url}
                  id={client.id}
                />
              </div>
            ))}
        </div>
        {section.showButton !== false && (
          <div className="flex justify-center animate-on-scroll delay-300">
            <Link to="/clients" aria-label="לכל הלקוחות">
              <Button className="group hover-lift flex items-center gap-2">
                <span>{section.cta || "לכל הלקוחות"}</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
