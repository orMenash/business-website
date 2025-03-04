
import { Phone, Mail, MapPin } from "lucide-react";
import { useBusiness } from "@/contexts/BusinessContext";
import { Link } from "react-router-dom";
import siteConfig from "@/config/site.json";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const { name, description, contact } = useBusiness();

  const quickLinks = siteConfig.navigation.links.filter(link => {
    const sectionKey = link.path.replace("/", "") || "hero";
    return siteConfig.sections[sectionKey]?.show && link.show;
  });

  // Calculate how many columns we need based on the number of quick links
  // with a maximum of 3 links per column
  const linksPerColumn = 3;
  const columnCount = Math.ceil(quickLinks.length / linksPerColumn);
  
  // Create an array of columns, each containing up to 3 links
  const linkColumns = Array.from({ length: columnCount }, (_, columnIndex) => {
    const startIndex = columnIndex * linksPerColumn;
    return quickLinks.slice(startIndex, startIndex + linksPerColumn);
  });

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-8", {
          "md:grid-cols-4": columnCount > 1,
          "md:grid-cols-5": columnCount > 2,
        })}>
          <div>
            <h3 className="text-xl font-serif mb-4">{name}</h3>
            <p className="text-gray-300">
              {description}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">פרטי התקשרות</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${contact.phone}`} className="hover:text-accent transition-colors">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${contact.email}`} className="hover:text-accent transition-colors">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{contact.address}</span>
              </div>
            </div>
          </div>
          
          {/* Render each column of quick links */}
          {linkColumns.map((columnLinks, columnIndex) => (
            <div key={`link-column-${columnIndex}`}>
              <h4 className="text-lg font-semibold mb-4">קישורים מהירים {columnCount > 1 ? columnIndex + 1 : ''}</h4>
              <ul className="space-y-2">
                {columnLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex justify-center gap-6">
            {Object.entries(contact.social).map(([platform, data]) => {
              if (!data.show || !data.showInFooter) return null;
              
              return (
                <a
                  key={platform}
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
                >
                  <span className="capitalize">{platform}</span>
                </a>
              );
            })}
          </div>
          <div className="mt-4 text-center text-gray-400">
            <p>© {new Date().getFullYear()} {name}. כל הזכויות שמורות.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
