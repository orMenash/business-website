
import { Link } from "react-router-dom";
import { User } from "lucide-react";

type EmployeeCardProps = {
  id: string;
  name: string;
  title: string;
  description: string;
  image?: string;
  clickable?: boolean;
};

export const EmployeeCard = ({ id, name, title, description, image, clickable }: EmployeeCardProps) => {
  const CardContent = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center space-x-4 space-x-reverse mb-4">
        {image ? (
          <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-accent" />
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
      <Link to={`/employee/${id}`} className="block group">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};
