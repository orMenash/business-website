
import { useBusiness } from "@/contexts/BusinessContext";
import { useParams } from "react-router-dom";
import { User, Mail, Phone } from "lucide-react";

const EmployeePage = () => {
  const { id } = useParams();
  const { employees } = useBusiness();
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return <div className="min-h-screen pt-32 pb-16 text-center">העובד לא נמצא</div>;
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {employee.image ? (
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="w-40 h-40 rounded-full object-cover"
                />
              ) : (
                <div className="w-40 h-40 bg-accent/10 rounded-full flex items-center justify-center">
                  <User className="w-20 h-20 text-accent" />
                </div>
              )}
              <div className="text-center md:text-right flex-1">
                <h1 className="text-3xl font-serif font-semibold mb-2">
                  {employee.name}
                </h1>
                <h2 className="text-xl text-gray-600 mb-4">{employee.title}</h2>
                <p className="text-gray-700 mb-6">{employee.fullDescription}</p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-5 h-5 text-accent" />
                    <a
                      href={`mailto:${employee.email}`}
                      className="text-accent hover:underline"
                    >
                      {employee.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Phone className="w-5 h-5 text-accent" />
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
