
import { Star, ExternalLink } from "lucide-react";

export type TestimonialType = {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  fullContent: string;
  rating: number;
  link?: string;
  showLink?: boolean;
  show: boolean;
  linkText?: string; // Custom link text property
};

export type TestimonialCardProps = {
  testimonial: TestimonialType;
};

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const { name, position, company, content, rating, link, showLink, linkText } = testimonial;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
      <div className="flex items-center space-x-1 mb-4 flex-row-reverse">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <div 
        className="text-gray-600 mb-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="border-t pt-4">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{position}, {company}</p>
        
        {link && showLink && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-accent flex items-center gap-1 mt-2 text-sm hover:underline"
          >
            <span>{linkText || link}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};
