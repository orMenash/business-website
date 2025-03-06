
import { useBusiness } from "@/contexts/BusinessContext";
import { ServiceCard } from "@/components/ServiceCard";
import { Breadcrumb } from "@/components/Breadcrumb";

const ServicesPage = () => {
  const { services } = useBusiness();

  const breadcrumbItems = [
    { label: "דף הבית", path: "/" },
    { label: "שירותים", path: "/services" }
  ];

  // Filter visible services
  const visibleServices = services.filter(service => service.show);

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-serif font-semibold mb-4">
            השירותים שלנו
          </h1>
          <p className="text-gray-600">
            גלו את מגוון השירותים המקצועיים שלנו המותאמים לצרכים שלכם ולציפיות שלכם
          </p>
        </div>
        
        {visibleServices.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {visibleServices.map((service) => (
              <div key={service.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]">
                <ServiceCard
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  clickable={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600">אין שירותים להצגה כרגע.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
