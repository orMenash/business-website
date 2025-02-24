
import { useBusiness } from "@/contexts/BusinessContext";
import { ServiceCard } from "@/components/ServiceCard";
import { ContactForm } from "@/components/ContactForm";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { EmployeeCard } from "@/components/EmployeeCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { ProjectCard } from "@/components/ProjectCard";
import { FloatingContact } from "@/components/FloatingContact";
import siteConfig from "@/config/site.json";
import testimonialsConfig from "@/config/testimonials.json";
import projectsConfig from "@/config/projects.json";

const Index = () => {
  const { name, description, services, employees } = useBusiness();

  // מיון האזורים לפי הסדר שהוגדר בקונפיגורציה
  const sections = Object.entries(siteConfig.sections)
    .sort(([, a], [, b]) => a.order - b.order)
    .filter(([, section]) => section.show);

  const renderSection = (sectionId: string) => {
    const section = siteConfig.sections[sectionId];
    
    switch (sectionId) {
      case 'hero':
        return (
          <section key="hero" className="pt-32 pb-16 bg-gradient-to-b from-secondary to-white relative">
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

      case 'services':
        return services.length > 0 && (
          <section key="services" className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-semibold mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {section.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {services
                  .filter(service => service.show)
                  .slice(0, section.max_display)
                  .map((service) => (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      title={service.title}
                      description={service.description}
                      icon={service.icon}
                      clickable={service.clickable}
                    />
                  ))}
              </div>
            </div>
          </section>
        );

      case 'employees':
        return employees.length > 0 && (
          <section key="employees" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-semibold mb-4">
                  {siteConfig.sections.team.title}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {siteConfig.sections.team.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {employees
                  .filter(employee => employee.show)
                  .slice(0, siteConfig.sections.team.max_display)
                  .map((employee) => (
                    <EmployeeCard
                      key={employee.id}
                      id={employee.id}
                      name={employee.name}
                      title={employee.title}
                      description={employee.description}
                      image={employee.image}
                      clickable={employee.clickable}
                    />
                  ))}
              </div>
            </div>
          </section>
        );

      case 'testimonials':
        return testimonialsConfig.testimonials.length > 0 && (
          <section key="testimonials" className="py-16">
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
                {testimonialsConfig.testimonials
                  .filter((testimonial: any) => testimonial.show)
                  .slice(0, section.max_display)
                  .map((testimonial) => (
                    <TestimonialCard
                      key={testimonial.id}
                      name={testimonial.name}
                      role={testimonial.role}
                      company={testimonial.company}
                      content={testimonial.content}
                      rating={testimonial.rating}
                    />
                  ))}
              </div>
            </div>
          </section>
        );

      case 'projects':
        return projectsConfig.projects.length > 0 && (
          <section key="projects" className="py-16 bg-gray-50">
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

      case 'contact':
        return (
          <section key="contact" className="py-16 bg-secondary">
            <div className="container mx-auto px-4">
              <div className="max-w-xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-serif font-semibold mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600">
                    {section.description}
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <FloatingContact />
      {sections.map(([sectionId]) => renderSection(sectionId))}
    </div>
  );
};

export default Index;
