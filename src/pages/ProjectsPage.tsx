
import React from "react";
import { ProjectCard } from "@/components/ProjectCard";
import projectsConfig from "@/config/projects.json";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";

const ProjectsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const breadcrumbItems = [
    { label: "דף הבית", path: "/" },
    { label: "פרויקטים", path: "/projects" }
  ];

  const visibleProjects = projectsConfig.projects
    .filter((project) => project.show)
    .sort((a, b) => Number(a.id) - Number(b.id));

  const totalPages = Math.ceil(visibleProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = visibleProjects.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-semibold mb-2">
              {projectsConfig.title}
            </h1>
            <p className="text-gray-600">{projectsConfig.description}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {currentProjects.map((project) => (
              <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]" key={project.id}>
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  category={project.category}
                  clickable={project.clickable}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="justify-center">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
                  </PaginationItem>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
