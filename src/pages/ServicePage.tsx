
import { useBusiness } from "@/contexts/BusinessContext";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";

const ServicePage = () => {
  const { id } = useParams();
  const { services } = useBusiness();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen pt-32 pb-16 text-center">
        <h1 className="text-3xl font-serif font-semibold mb-6">השירות לא נמצא</h1>
        <Link to="/services">
          <Button variant="outline">חזרה לשירותים</Button>
        </Link>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "דף הבית", path: "/" },
    { label: "שירותים", path: "/services" },
    { label: service.title, path: `/service/${id}` }
  ];

  return (
    <div className="min-h-screen pt-32 pb-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8 card-gradient">
            <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6 hover:bg-accent/20 transition-colors">
              <Star className="w-8 h-8 text-accent" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              {service.title}
            </h1>
            
            <div className="mb-8 text-lg text-gray-700">
              <p 
                className="font-medium"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>
            
            <div className="prose prose-lg prose-gray max-w-none mb-8">
              <h3 className="text-xl font-semibold mb-4">פרטים נוספים</h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div 
                  className="text-balance whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: service.fullDescription }}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/contact">
                <Button className="hover-lift">
                  צור קשר
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="hover-lift">
                  לכל השירותים
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
