
import { useBusiness } from "@/contexts/BusinessContext";
import { useParams, Link } from "react-router-dom";
import { User, Mail, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

const EmployeePage = () => {
  const { id } = useParams();
  const { employees } = useBusiness();
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return <div className="min-h-screen pt-32 pb-16 text-center">העובד לא נמצא</div>;
  }

  const breadcrumbItems = [
    { label: "דף הבית", path: "/" },
    { label: "הצוות שלנו", path: "/team" },
    { label: employee.name, path: `/employee/${id}` }
  ];

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {employee.image ? (
                <img
                  src={employee.image}
                  alt={`${employee.name} - ${employee.title}`}
                  className="w-24 h-24 rounded-full object-cover"
                  width="96"
                  height="96"
                  loading="lazy"
                />
              ) : (
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-accent" />
                </div>
              )}
              <div className="text-center md:text-right flex-1">
                <h1 className="text-3xl font-serif font-semibold mb-2">
                  {employee.name}
                </h1>
                <h2 className="text-xl text-gray-600 mb-4">{employee.title}</h2>
                <div 
                  className="text-gray-700 mb-6"
                  dangerouslySetInnerHTML={{ __html: employee.fullDescription }}
                />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-5 h-5 text-accent" aria-hidden="true" />
                    <a
                      href={`mailto:${employee.email}`}
                      className="text-accent hover:underline"
                    >
                      {employee.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Phone className="w-5 h-5 text-accent" aria-hidden="true" />
                    <a
                      href={`tel:${employee.phone}`}
                      className="text-accent hover:underline"
                    >
                      {employee.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
