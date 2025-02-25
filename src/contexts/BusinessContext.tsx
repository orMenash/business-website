
import React, { createContext, useContext, ReactNode } from "react";
import businessConfig from "../config/business.json";
import servicesConfig from "../config/services.json";
import employeesConfig from "../config/employees.json";

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

type SocialLink = {
  show: boolean;
  url: string;
  showInFooter?: boolean;
  showFloating?: boolean;
};

type FormConfig = {
  redirectAfterSubmit: boolean;
  autoResponse: {
    enabled: boolean;
    message: string;
  };
  subject: string;
  captcha: boolean;
};

type BusinessContextType = {
  name: string;
  description: string;
  logo: {
    url: string;
    height: string;
    width: string;
  };
  services: Service[];
  employees: Employee[];
  contact: {
    email: string;
    phone: string;
    address: string;
    whatsapp: string;
    showFloatingWhatsapp: boolean;
    showFloatingPhone: boolean;
    form: FormConfig;
    social?: {
      facebook?: SocialLink;
      instagram?: SocialLink;
      tiktok?: SocialLink;
      twitter?: SocialLink;
    };
  };
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

