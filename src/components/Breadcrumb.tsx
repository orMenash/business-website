
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  path: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex items-center text-sm text-gray-500 mb-8">
      {items.map((item, index) => (
        <div key={item.path} className="flex items-center">
          {index < items.length - 1 ? (
            <>
              <Link to={item.path} className="hover:text-accent transition-colors">{item.label}</Link>
              <ChevronLeft className="w-4 h-4 mx-2" />
            </>
          ) : (
            <span className="text-accent">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
};
