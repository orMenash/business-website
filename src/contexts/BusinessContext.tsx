
import { createContext, useContext } from "react";
import businessConfig from "@/config/business.json";
import services from "@/config/services.json";
import employees from "@/config/employees.json";
import projects from "@/config/projects.json";
import testimonials from "@/config/testimonials.json";

export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: string;
  show: boolean;
  clickable: boolean;
}

export interface Employee {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  show: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  show: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  show: boolean;
}

export interface BusinessContextType {
  name: string;
  tagline: string;
  description: string;
  logo: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    social: {
      facebook: string;
      instagram: string;
      linkedin: string;
      twitter: string;
      youtube: string;
      tiktok: string;
    };
  };
  services: Service[];
  employees: Employee[];
  projects: Project[];
  testimonials: Testimonial[];
}

const BusinessContext = createContext<BusinessContextType>({
  name: "",
  tagline: "",
  description: "",
  logo: {
    url: "",
    alt: "",
    width: 0,
    height: 0,
  },
  contact: {
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      youtube: "",
      tiktok: "",
    },
  },
  services: [],
  employees: [],
  projects: [],
  testimonials: [],
});

export const BusinessProvider = ({ children }: { children: React.ReactNode }) => {
  const filteredServices = services.services.filter((service) => service.show);
  const filteredEmployees = employees.employees.filter((employee) => employee.show);
  const filteredProjects = projects.projects.filter((project) => project.show);
  const filteredTestimonials = testimonials.testimonials.filter((testimonial) => testimonial.show);

  return (
    <BusinessContext.Provider
      value={{
        ...businessConfig,
        services: filteredServices,
        employees: filteredEmployees,
        projects: filteredProjects,
        testimonials: filteredTestimonials,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => useContext(BusinessContext);
