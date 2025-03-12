
import { Link } from "react-router-dom";
import { ResponsiveImage } from "@/components/ui/optimized-image";

type ProjectCardProps = {
  id?: string;
  title: string;
  description: string;
  image: string;
  showImage?: boolean;
  category: string;
  clickable?: boolean;
};

export const ProjectCard = ({ id, title, description, image, showImage = true, category, clickable }: ProjectCardProps) => {
  const Card = () => (
    <div className="group relative overflow-hidden rounded-lg shadow-lg h-full">
      {showImage && image ? (
        <div className="aspect-w-16 aspect-h-9" style={{ paddingBottom: '56.25%', position: 'relative' }}>
          <ResponsiveImage 
            src={image} 
            alt={title} 
            className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" 
            width={400} 
            height={225}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      ) : (
        <div className="aspect-w-16 aspect-h-9 bg-gray-200" style={{ paddingBottom: '56.25%', position: 'relative' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-500">אין תמונה זמינה</span>
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <span className="text-sm text-white/80 mb-2">{category}</span>
        <h3 className="text-xl font-serif text-white mb-2">{title}</h3>
        <div 
          className="text-white/90 text-sm"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );

  if (clickable && id) {
    return (
      <Link to={`/project/${id}`} className="block h-full" aria-label={`פרויקט: ${title}`}>
        <Card />
      </Link>
    );
  }

  return <Card />;
};
