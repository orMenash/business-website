
import React, { createContext, useContext, ReactNode } from "react";
import businessConfig from "../config/business.json";
import servicesConfig from "../config/services.json";
import employeesConfig from "../config/employees.json";
import type { BusinessConfig } from "@/types/business";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  show?: boolean;
  clickable?: boolean;
};

type Employee = {
  id: string;
  name: string;
  title: string;
  description: string;
  image?: string;
  fullDescription: string;
  email: string;
  phone: string;
  show?: boolean;
  clickable?: boolean;
};

type BusinessContextType = BusinessConfig & {
  services: Service[];
  employees: Employee[];
};

const BusinessContext = createContext<BusinessContextType>({
  ...businessConfig,
  services: servicesConfig.services,
  employees: employeesConfig.employees,
});

export const BusinessProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BusinessContext.Provider 
      value={{
        ...businessConfig,
        services: servicesConfig.services,
        employees: employeesConfig.employees,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return context;
};
