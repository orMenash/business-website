
import { Phone, Mail, MapPin, Navigation } from "lucide-react";
import { useBusiness } from "@/contexts/BusinessContext";
import { Link } from "react-router-dom";
import siteConfig from "@/config/site.json";
import { openInNavigation } from "@/utils/addressUtils";

export const Footer = () => {
  const { name, description, contact } = useBusiness();

  const quickLinks = siteConfig.navigation.links.filter(link => {
    if (link.path === "/testimonials") return link.show;
    const sectionKey = link.path.replace("/", "") || "hero";
    return siteConfig.sections[sectionKey]?.show && link.show;
  });

  // גיבוש הקישורים לקבוצות כדי לחסוך מקום
  const linkGroups = [];
  const linksPerGroup = 4;
  for (let i = 0; i < quickLinks.length; i += linksPerGroup) {
    linkGroups.push(quickLinks.slice(i, i + linksPerGroup));
  }

  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-serif mb-3">{name}</h3>
            <p className="text-gray-300 text-sm">
              {description}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">פרטי התקשרות</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <a href={`tel:${contact.phone}`} className="hover:text-accent transition-colors" aria-label={`טלפון: ${contact.phone}`}>
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a href={`mailto:${contact.email}`} className="hover:text-accent transition-colors" aria-label={`אימייל: ${contact.email}`}>
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {contact.addressClickable ? (
                  <button 
                    onClick={() => openInNavigation(contact.address)}
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-sm"
                    aria-label={`ניווט לכתובת: ${contact.address}`}
                  >
                    <span>{contact.address}</span>
                    <Navigation className="w-3 h-3 inline-block" />
                  </button>
                ) : (
                  <span className="text-sm">{contact.address}</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">קישורים מהירים</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {quickLinks.map((link) => (
                <li key={link.path} className="list-none">
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                    aria-label={link.title}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="flex justify-center gap-4 mb-3">
            {Object.entries(contact.social).map(([platform, data]) => {
              if (!data.show || !data.showInFooter) return null;
              
              return (
                <a
                  key={platform}
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200 text-sm"
                  aria-label={platform}
                >
                  <span className="capitalize">{platform}</span>
                </a>
              );
            })}
          </div>
          <div className="text-center text-gray-400 text-xs">
            <p>
              אתר זה נבנה ומנוהל על ידי <a href="https://www.flashweb.co.il" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">FlashWeb</a> – בונים לך נוכחות דיגיטלית במחיר מנצח.
              © 2025 כל הזכויות שמורות ל-FlashWeb.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
