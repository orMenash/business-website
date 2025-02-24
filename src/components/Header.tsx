
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useBusiness } from "@/contexts/BusinessContext";
import { Link, useLocation } from "react-router-dom";
import siteConfig from "@/config/site.json";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { name, logo } = useBusiness();
  const location = useLocation();

  // סינון הקישורים בהתאם להגדרות התצוגה של האזורים
  const navigationLinks = siteConfig.navigation.links.filter(link => {
    const sectionKey = link.path.replace("/", "") || "hero";
    return siteConfig.sections[sectionKey]?.show && link.show;
  });

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 text-xl font-serif font-semibold">
            <img 
              src={logo.url} 
              alt={name} 
              style={{ 
                height: logo.height,
                width: logo.width 
              }} 
            />
            <span>{name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-gray-600 hover:text-accent transition-colors px-2 ${
                  location.pathname === link.path ? "text-accent" : ""
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="תפריט"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 animate-fadeIn">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-gray-600 hover:text-accent transition-colors ${
                    location.pathname === link.path ? "text-accent" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
