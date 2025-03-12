
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { ResponsiveImage } from "@/components/ui/optimized-image";

type ServiceCardProps = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  showImage?: boolean;
  clickable?: boolean;
};

export const ServiceCard = ({ id, title, description, icon, image, showImage, clickable }: ServiceCardProps) => {
  const Card = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      {showImage && image ? (
        <div className="mb-4 overflow-hidden rounded-lg aspect-w-16 aspect-h-9" style={{ paddingBottom: '56.25%', position: 'relative' }}>
          <ResponsiveImage 
            src={image} 
            alt={title} 
            className="absolute inset-0 object-cover w-full h-full hover:scale-105 transition-transform duration-300" 
            width={400} 
            height={225}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      ) : showImage && (
        <div className="mb-4 rounded-lg bg-gray-200 aspect-w-16 aspect-h-9" style={{ paddingBottom: '56.25%', position: 'relative' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-500">אין תמונה זמינה</span>
          </div>
        </div>
      )}
      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
        <Star className="w-6 h-6 text-accent" aria-hidden="true" />
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
      <Link to={`/service/${id}`} className="block group h-full" aria-label={`שירות: ${title}`}>
        <Card />
      </Link>
    );
  }

  return <Card />;
};
