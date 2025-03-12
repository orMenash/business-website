
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { ResponsiveImage } from "@/components/ui/optimized-image";

type EmployeeCardProps = {
  id: string;
  name: string;
  title: string;
  description: string;
  image?: string;
  clickable?: boolean;
  showImage?: boolean;
};

export const EmployeeCard = ({ id, name, title, description, image, clickable, showImage = true }: EmployeeCardProps) => {
  const CardContent = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center space-x-4 space-x-reverse mb-4">
        {image && showImage ? (
          <ResponsiveImage 
            src={image} 
            alt={`${name} - ${title}`} 
            className="w-12 h-12 rounded-full object-cover" 
            width={48} 
            height={48}
            loading="lazy"
          />
        ) : (
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-accent" aria-hidden="true" />
          </div>
        )}
        <div>
          <h3 className="text-xl font-serif font-semibold">{name}</h3>
          <p className="text-gray-600">{title}</p>
        </div>
      </div>
      <div 
        className="text-gray-600"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );

  if (clickable) {
    return (
      <Link to={`/employee/${id}`} className="block group" aria-label={`צוות: ${name}, ${title}`}>
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};
