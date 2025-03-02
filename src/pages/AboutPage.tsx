
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { EmployeeCard } from "@/components/EmployeeCard";
import { useBusiness } from "@/contexts/BusinessContext";
import aboutConfig from "@/config/about.json";

const AboutPage = () => {
  const { employees } = useBusiness();
  
  if (!aboutConfig.show) return null;

  // מיון האזורים לפי סדר
  const sortedSections = [...aboutConfig.sections].sort((a, b) => a.order - b.order);
  
  return (
    <div className="min-h-screen pt-32 pb-16 animate-fadeIn">
      {/* רקע */}
      {aboutConfig.background.show && (
        <div 
          className="fixed inset-0 z-0"
          style={{ opacity: aboutConfig.background.opacity }}
        >
          <img
            src={aboutConfig.background.image}
            alt="רקע דף אודות"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-accent transition-colors">דף הבית</Link>
          <ChevronLeft className="w-4 h-4 mx-2" />
          <span className="text-accent">{aboutConfig.title.text}</span>
        </div>
        
        {/* כותרת ראשית */}
        {aboutConfig.title.show && (
          <div className="max-w-4xl mx-auto text-center mb-16 animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
              {aboutConfig.title.text}
            </h1>
            <p className="text-xl text-gray-600">
              {aboutConfig.title.subtitle}
            </p>
          </div>
        )}
        
        {/* תמונה ראשית */}
        {aboutConfig.mainImage.show && (
          <div className="max-w-5xl mx-auto mb-20 rounded-xl overflow-hidden shadow-xl animate-on-scroll">
            <img 
              src={aboutConfig.mainImage.image} 
              alt={aboutConfig.mainImage.alt} 
              className="w-full h-auto"
            />
          </div>
        )}
        
        {/* תוכן דינמי לפי סדר */}
        {sortedSections.map((section) => {
          if (!section.show) return null;

          switch (section.type) {
            case "boxes":
              return (
                <div key={section.id} className="mb-20 animate-on-scroll">
                  <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
                    {section.boxes
                      .filter(box => box.show)
                      .map((box, index) => (
                        <div 
                          key={index} 
                          className="flex-1 min-w-[300px] max-w-[400px] p-8 bg-white/90 shadow-lg rounded-xl glassmorphism"
                        >
                          <h2 className="text-2xl font-serif font-semibold mb-4 gradient-text">{box.title}</h2>
                          <p className="text-gray-700 text-balance">{box.content}</p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              );

            case "values":
              return (
                <div key={section.id} className="max-w-6xl mx-auto mb-20 animate-on-scroll">
                  {section.title.show && (
                    <h2 className="text-3xl font-serif font-semibold mb-8 text-center">
                      {section.title.text}
                    </h2>
                  )}
                  <div className="flex flex-wrap justify-center gap-6">
                    {section.values
                      .filter(value => value.show)
                      .map((value, index) => (
                        <div 
                          key={index} 
                          className="flex-1 min-w-[280px] max-w-[400px] p-6 card-gradient rounded-lg border border-gray-100 shadow-md hover-lift"
                        >
                          <h3 className="text-xl font-semibold mb-2 text-accent">{value.title}</h3>
                          <p className="text-gray-600">{value.description}</p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              );

            case "history":
              return (
                <div key={section.id} className="max-w-3xl mx-auto mb-20 animate-on-scroll text-center">
                  {section.title.show && (
                    <h2 className="text-3xl font-serif font-semibold mb-6">
                      {section.title.text}
                    </h2>
                  )}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-balance whitespace-pre-line">{section.content}</p>
                  </div>
                </div>
              );

            case "team":
              return (
                <div key={section.id} className="max-w-6xl mx-auto mb-20 animate-on-scroll">
                  {section.title.show && (
                    <h2 className="text-3xl font-serif font-semibold mb-8 text-center">
                      {section.title.text}
                    </h2>
                  )}
                  <div className="flex flex-wrap justify-center gap-8">
                    {employees
                      .filter(employee => employee.show)
                      .map((employee) => (
                        <div key={employee.id} className="flex-1 min-w-[280px] max-w-[350px]">
                          <EmployeeCard
                            id={employee.id}
                            name={employee.name}
                            title={employee.title}
                            description={employee.description}
                            image={employee.image}
                            clickable={employee.clickable}
                          />
                        </div>
                      ))
                    }
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default AboutPage;
