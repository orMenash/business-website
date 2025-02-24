
import { Link } from "react-router-dom";

type ProjectCardProps = {
  id?: string;
  title: string;
  description: string;
  image: string;
  category: string;
  clickable?: boolean;
};

export const ProjectCard = ({ id, title, description, image, category, clickable }: ProjectCardProps) => {
  const Card = () => (
    <div className="group relative overflow-hidden rounded-lg shadow-lg">
      <div className="aspect-w-16 aspect-h-9">
        <img src={image} alt={title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <span className="text-sm text-white/80 mb-2">{category}</span>
        <h3 className="text-xl font-serif text-white mb-2">{title}</h3>
        <p className="text-white/90 text-sm">{description}</p>
      </div>
    </div>
  );

  if (clickable && id) {
    return (
      <Link to={`/project/${id}`} className="block">
        <Card />
      </Link>
    );
  }

  return <Card />;
};
