
import { Phone, Mail, MapPin } from "lucide-react";
import { useBusiness } from "@/contexts/BusinessContext";
import { Link } from "react-router-dom";
import siteConfig from "@/config/site.json";

export const Footer = () => {
  const { name, description, contact } = useBusiness();

  const quickLinks = siteConfig.navigation.links.filter(link => {
    const sectionKey = link.path.replace("/", "") || "hero";
    return siteConfig.sections[sectionKey]?.show && link.show;
  });

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <div>
            <h4 className="text-lg font-semibold mb-4">קישורים מהירים</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
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
