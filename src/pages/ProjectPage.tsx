
import { useParams, Link } from "react-router-dom";
import NotFound from "./NotFound";
import projectsConfig from "@/config/projects.json";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

const ProjectPage = () => {
  const { id } = useParams();
  const project = projectsConfig.projects.find((p) => p.id === id);

  if (!project || !project.show) {
    return <NotFound />;
  }

  const breadcrumbItems = [
    { label: "דף הבית", path: "/" },
    { label: "פרויקטים", path: "/projects" },
    { label: project.title, path: `/project/${id}` }
  ];

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="max-w-4xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 mb-8 rounded-lg overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-4xl font-serif font-semibold mb-4">{project.title}</h1>
          <div className="mb-6 flex items-center gap-4">
            <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
              {project.category}
            </span>
            
            {project.showGalleryButton && (
              <Link to={project.galleryLink} className="inline-block">
                <Button variant="outline" size="sm" className="gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>גלריית תמונות</span>
                </Button>
              </Link>
            )}
          </div>
          <div className="prose max-w-none">
            <div 
              className="text-gray-600 mb-8"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
            {project.fullDescription && (
              <div className="mt-8">
                <h2 className="text-2xl font-serif font-semibold mb-4">על הפרויקט</h2>
                <div 
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: project.fullDescription }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
