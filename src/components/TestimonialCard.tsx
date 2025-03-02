
import { Star } from "lucide-react";

type TestimonialCardProps = {
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
};

export const TestimonialCard = ({ name, position, company, content, rating }: TestimonialCardProps) => {
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
      </div>
    </div>
  );
};
