
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useBusiness } from "@/contexts/BusinessContext";
import { Link, useLocation } from "react-router-dom";
import siteConfig from "@/config/site.json";
import { ResponsiveImage } from "@/components/ui/optimized-image";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { name, logo } = useBusiness();
  const location = useLocation();

  const navigationLinks = siteConfig.navigation.links.filter(link => {
    if (link.path === "/testimonials") return link.show;
    const sectionKey = link.path.replace("/", "") || "hero";
    return siteConfig.sections[sectionKey]?.show && link.show;
  });

  // Helper function to handle logo width
  const getLogoWidth = () => {
    const width = logo.width;
    if (width === "auto" || !width) return "auto";
    return typeof width === "number" ? `${width}px` : width;
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="דף בית">
            <ResponsiveImage 
              src={logo.url} 
              alt={`${name} לוגו`}
              className="object-contain"
              width={logo.width || 60}
              height={logo.height || 60}
              loading="eager"
              fetchPriority="high"
              style={{ 
                height: logo.height,
                width: getLogoWidth()
              }} 
            />
            <span className="text-xl font-serif font-semibold">{name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-gray-600 hover:text-accent transition-colors px-2 ${
                  location.pathname === link.path ? "text-accent" : ""
                }`}
                aria-label={link.title}
                aria-current={location.pathname === link.path ? "page" : undefined}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
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
                  aria-label={link.title}
                  aria-current={location.pathname === link.path ? "page" : undefined}
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
