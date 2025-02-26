
import siteConfig from "@/config/site.json";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const { about } = siteConfig;
  
  return (
    <div className="min-h-screen pt-32 pb-16 animate-fadeIn">
      {/* Background */}
      {about.background && (
        <div 
          className="fixed inset-0 z-0"
          style={{ opacity: about.background.opacity }}
        >
          <img
            src={about.background.image}
            alt="רקע דף אודות"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-accent transition-colors">דף הבית</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-accent">{about.title}</span>
        </div>
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-on-scroll">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
            {about.title}
          </h1>
          <p className="text-xl text-gray-600">
            {about.subtitle}
          </p>
        </div>
        
        {/* Main Image */}
        <div className="max-w-5xl mx-auto mb-20 rounded-xl overflow-hidden shadow-xl animate-on-scroll">
          <img 
            src={about.image} 
            alt={about.title} 
            className="w-full h-auto"
          />
        </div>
        
        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          <div className="p-8 bg-white/90 shadow-lg rounded-xl glassmorphism animate-on-scroll">
            <h2 className="text-2xl font-serif font-semibold mb-4 gradient-text">{about.missionTitle}</h2>
            <p className="text-gray-700 text-balance">{about.mission}</p>
          </div>
          
          <div className="p-8 bg-white/90 shadow-lg rounded-xl glassmorphism animate-on-scroll">
            <h2 className="text-2xl font-serif font-semibold mb-4 gradient-text">{about.visionTitle}</h2>
            <p className="text-gray-700 text-balance">{about.vision}</p>
          </div>
        </div>
        
        {/* Values */}
        <div className="max-w-6xl mx-auto mb-20 animate-on-scroll">
          <h2 className="text-3xl font-serif font-semibold mb-8 text-center">{about.valuesTitle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {about.values.map((value, index) => (
              <div 
                key={index} 
                className="p-6 card-gradient rounded-lg border border-gray-100 shadow-md hover-lift"
              >
                <h3 className="text-xl font-semibold mb-2 text-accent">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* History */}
        <div className="max-w-4xl mx-auto mb-20 animate-on-scroll">
          <h2 className="text-3xl font-serif font-semibold mb-6 text-center">{about.historyTitle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="prose prose-lg max-w-none">
                <p className="text-balance whitespace-pre-line">{about.history}</p>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg animated-border">
              <img 
                src={about.teamImage} 
                alt="צוות החברה" 
                className="w-full h-auto transform transition-transform hover:scale-105 duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
