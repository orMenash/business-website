
import { Link } from "react-router-dom";
import { ResponsiveImage } from "@/components/ui/optimized-image";

type ClientCardProps = {
  id?: string;
  name: string;
  description: string;
  logo: string;
  url?: string;
};

export const ClientCard = ({ id, name, description, logo, url }: ClientCardProps) => {
  const Card = () => (
    <div className="group bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg h-full flex flex-col items-center">
      <div className="w-32 h-32 mb-4 flex items-center justify-center">
        <ResponsiveImage 
          src={logo} 
          alt={name} 
          className="object-contain max-h-full max-w-full"
          width={128} 
          height={128}
          loading="lazy"
        />
      </div>
      <h3 className="text-xl font-serif text-center mb-2">{name}</h3>
      <div 
        className="text-gray-600 text-sm text-center"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );

  if (url && url.startsWith('http')) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full" aria-label={`לקוח: ${name}`}>
        <Card />
      </a>
    );
  } else if (url) {
    return (
      <Link to={url} className="block h-full" aria-label={`לקוח: ${name}`}>
        <Card />
      </Link>
    );
  }

  return <Card />;
};
