
import { ProjectCard } from "@/components/ProjectCard";
import { SectionProps } from "@/types/section";
import projectsConfig from "@/config/projects.json";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const ProjectsSection = ({ section }: SectionProps) => {
  if (projectsConfig.projects.length === 0) return null;

  // Get background color from section configuration
  const backgroundColor = section.background?.backgroundColor || "#f8f9fa";

  return (
    <section 
      className="py-16 relative"
      style={{ backgroundColor }}
    >
      {section.background && section.showBackground && (
        <div 
          className="absolute inset-0 z-0"
          style={{ opacity: section.background.opacity }}
        >
          <img
            src={section.background.image}
            alt={section.background.alt || "רקע למדור פרויקטים"}
            className="w-full h-full object-cover"
            width="1920"
            height="1080"
          />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-6 animate-on-scroll">
          <h2 
            className="text-3xl font-serif font-semibold mb-4"
            dangerouslySetInnerHTML={{ __html: section.title }}
          />
          <div 
            className="text-gray-600 mb-6"
            dangerouslySetInnerHTML={{ __html: section.description }}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {projectsConfig.projects
            .filter(project => project.show)
            .slice(0, section.max_display)
            .map((project, index) => (
              <div key={project.id} className={`w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] animate-on-scroll delay-${index * 100}`}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  showImage={project.showImage}
                  category={project.category}
                  clickable={project.clickable}
                  id={project.id}
                />
              </div>
            ))}
        </div>
        {section.showButton !== false && (
          <div className="flex justify-center animate-on-scroll delay-300">
            <Link to="/projects" aria-label="לכל הפרויקטים">
              <Button className="group hover-lift flex items-center gap-2">
                <span>{section.cta || "לכל הפרויקטים"}</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
