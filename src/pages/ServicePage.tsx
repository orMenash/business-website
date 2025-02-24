
import { useBusiness } from "@/contexts/BusinessContext";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";

const ServicePage = () => {
  const { id } = useParams();
  const { services } = useBusiness();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return <div className="min-h-screen pt-32 pb-16 text-center">השירות לא נמצא</div>;
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
              <Star className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl font-serif font-semibold mb-4">
              {service.title}
            </h1>
            <p className="text-gray-700">{service.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
