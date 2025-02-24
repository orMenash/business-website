
import { useBusiness } from "@/contexts/BusinessContext";
import { ServiceCard } from "@/components/ServiceCard";

const ServicesPage = () => {
  const { services } = useBusiness();

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-serif font-semibold mb-4">
            השירותים שלנו
          </h1>
          <p className="text-gray-600">
            גלו את מגוון השירותים המקצועיים שלנו המותאמים לצרכים שלכם ולציפיות שלכם
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              clickable={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
