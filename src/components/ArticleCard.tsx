
import { Link } from "react-router-dom";
import { ResponsiveImage } from "@/components/ui/optimized-image";
import { CalendarIcon, UserIcon } from "lucide-react";

type ArticleCardProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  showImage?: boolean;
  category: string;
  date: string;
  author: string;
  clickable?: boolean;
};

export const ArticleCard = ({ id, title, description, image, showImage = true, category, date, author, clickable }: ArticleCardProps) => {
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const Card = () => (
    <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      {showImage && (
        <div className="aspect-w-16 aspect-h-9 overflow-hidden" style={{ paddingBottom: '56.25%', position: 'relative' }}>
          <ResponsiveImage 
            src={image} 
            alt={title} 
            className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
            width={400} 
            height={225}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-accent bg-accent/10 px-3 py-1 rounded-full">
            {category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <CalendarIcon className="w-4 h-4 ml-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-serif font-semibold mb-2">{title}</h3>
        
        <div 
          className="text-gray-600 mb-4"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        
        <div className="flex items-center text-gray-500 text-sm">
          <UserIcon className="w-4 h-4 ml-1" />
          <span>{author}</span>
        </div>
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link to={`/article/${id}`} className="block" aria-label={`מאמר: ${title}`}>
        <Card />
      </Link>
    );
  }

  return <Card />;
};
