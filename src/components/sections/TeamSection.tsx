
import { useBusiness } from "@/contexts/BusinessContext";
import { EmployeeCard } from "@/components/EmployeeCard";
import { SectionProps } from "@/types/section";

export const TeamSection = ({ section }: SectionProps) => {
  const { employees } = useBusiness();
  
  if (employees.length === 0) return null;

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
          {employees
            .filter(employee => employee.show)
            .slice(0, section.max_display)
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
};
