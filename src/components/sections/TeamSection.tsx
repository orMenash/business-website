
import { useBusiness } from "@/contexts/BusinessContext";
import { EmployeeCard } from "@/components/EmployeeCard";
import { SectionProps } from "@/types/section";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const TeamSection = ({ section }: SectionProps) => {
  const { employees } = useBusiness();
  
  if (employees.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 animate-on-scroll">
          <h2 className="text-3xl font-serif font-semibold mb-4">
            {section.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {section.description}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {employees
            .filter(employee => employee.show)
            .slice(0, section.max_display)
            .map((employee, index) => (
              <div key={employee.id} className={`w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] animate-on-scroll delay-${index * 100}`}>
                <EmployeeCard
                  id={employee.id}
                  name={employee.name}
                  title={employee.title}
                  description={employee.description}
                  image={employee.image}
                  clickable={employee.clickable}
                />
              </div>
            ))}
        </div>
        {section.showButton !== false && (
          <div className="flex justify-center animate-on-scroll delay-300">
            <Link to="/team">
              <Button className="group hover-lift flex items-center gap-2">
                <span>{section.cta || "הכירו את כל הצוות"}</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
