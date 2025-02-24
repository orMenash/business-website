
"use client";

import * as React from "react";
import { useState } from "react";
import { EmployeeCard } from "@/components/EmployeeCard";
import { useBusiness } from "@/contexts/BusinessContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TeamPage: React.FC = () => {
  const { employees } = useBusiness();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const visibleEmployees = employees
    .filter((employee) => employee.show)
    .sort((a, b) => Number(a.id) - Number(b.id));

  const totalPages = Math.ceil(visibleEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = visibleEmployees.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-semibold mb-2">הצוות שלנו</h1>
            <p className="text-gray-600">הכירו את הצוות המקצועי שלנו</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {currentEmployees.map((employee) => (
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

export default TeamPage;
