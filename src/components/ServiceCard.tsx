
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

type ServiceCardProps = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  clickable?: boolean;
};

export const ServiceCard = ({ id, title, description, icon, clickable }: ServiceCardProps) => {
  const Card = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
        <Star className="w-6 h-6 text-accent" />
      </div>
      <h3 className="text-xl font-serif font-semibold mb-2">{title}</h3>
      <div 
        className="text-gray-600"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );

  if (clickable) {
    return (
      <Link to={`/service/${id}`} className="block group">
        <Card />
      </Link>
    );
  }

  return <Card />;
};
