
import { ProjectCard } from "@/components/ProjectCard";
import { SectionProps } from "@/types/section";
import projectsConfig from "@/config/projects.json";

export const ProjectsSection = ({ section }: SectionProps) => {
  if (projectsConfig.projects.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-semibold mb-4">
            {section.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {section.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projectsConfig.projects
            .filter(project => project.show)
            .slice(0, section.max_display)
            .map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                category={project.category}
                clickable={project.clickable}
                id={project.id}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
