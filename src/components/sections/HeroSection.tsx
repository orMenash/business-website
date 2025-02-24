
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useBusiness } from "@/contexts/BusinessContext";
import { SectionProps } from "@/types/section";

export const HeroSection = ({ section }: SectionProps) => {
  const { name, description } = useBusiness();

  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-white relative">
      {section.image && (
        <div className="absolute inset-0 z-0 opacity-10">
          <img
            src={section.image}
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 animate-fadeIn">
            {name}
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fadeIn">
            {description}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-md hover:bg-accent/90 transition-colors animate-fadeIn"
          >
            <span>{section.cta || "צור קשר"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
