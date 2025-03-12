import { createContext, useContext } from "react";
import businessConfig from "@/config/business.json";
import services from "@/config/services.json";
import employees from "@/config/employees.json";
import projects from "@/config/projects.json";
import testimonials from "@/config/testimonials.json";
import clients from "@/config/clients.json";
import articles from "@/config/articles.json";

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: string;
  image?: string;
  showImage?: boolean;
  showImageOnPage?: boolean;
  show: boolean;
  clickable: boolean;
  faq?: FAQ[];
}

export interface Employee {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  fullDescription: string;
  email: string;
  phone: string;
  show: boolean;
  clickable: boolean;
  showImage?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  showImage?: boolean;
  showImageOnPage?: boolean;
  category: string;
  date: string;
  show: boolean;
  clickable: boolean;
  showGalleryButton?: boolean;
  galleryLink?: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  showImage: boolean;
  showImageOnPage: boolean;
  category: string;
  date: string;
  author: string;
  show: boolean;
  clickable: boolean;
}

export interface Client {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  logo: string;
  show: boolean;
  url?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  fullContent: string;
  avatar?: string;
  rating: number;
  show: boolean;
}

export interface SocialLink {
  show: boolean;
  showInFooter: boolean;
  showFloating: boolean;
  url: string;
}

export interface BusinessContextType {
  name: string;
  tagline: string;
  description: string;
  logo: {
    url: string;
    alt: string;
    width: number | string;
    height: number | string;
    faviconUrl: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    addressClickable: boolean;
    showFloatingWhatsapp: boolean;
    showFloatingPhone: boolean;
    social: {
      facebook: SocialLink;
      instagram: SocialLink;
      linkedin: SocialLink;
      twitter: SocialLink;
      youtube: SocialLink;
      tiktok: SocialLink;
    };
  };
  services: Service[];
  employees: Employee[];
  projects: Project[];
  articles: Article[];
  testimonials: Testimonial[];
  clients: Client[];
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
    faviconUrl: "",
  },
  contact: {
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    addressClickable: false,
    showFloatingWhatsapp: false,
    showFloatingPhone: false,
    social: {
      facebook: { show: false, showInFooter: false, showFloating: false, url: "" },
      instagram: { show: false, showInFooter: false, showFloating: false, url: "" },
      linkedin: { show: false, showInFooter: false, showFloating: false, url: "" },
      twitter: { show: false, showInFooter: false, showFloating: false, url: "" },
      youtube: { show: false, showInFooter: false, showFloating: false, url: "" },
      tiktok: { show: false, showInFooter: false, showFloating: false, url: "" },
    },
  },
  services: [],
  employees: [],
  projects: [],
  articles: [],
  testimonials: [],
  clients: [],
});

export const BusinessProvider = ({ children }: { children: React.ReactNode }) => {
  const filteredServices = services.services.filter((service) => service.show);
  const filteredEmployees = employees.employees.filter((employee) => employee.show);
  const filteredProjects = projects.projects.filter((project) => project.show);
  const filteredArticles = articles.articles.filter((article) => article.show);
  const filteredTestimonials = testimonials.testimonials.filter((testimonial) => testimonial.show);
  const filteredClients = clients.clients.filter((client) => client.show);

  return (
    <BusinessContext.Provider
      value={{
        name: businessConfig.name,
        tagline: "",
        description: businessConfig.description,
        logo: {
          url: businessConfig.logo.url,
          alt: businessConfig.name,
          width: businessConfig.logo.width,
          height: businessConfig.logo.height,
          faviconUrl: businessConfig.favicon?.url || businessConfig.logo.url
        },
        contact: {
          ...businessConfig.contact,
          addressClickable: businessConfig.contact.addressClickable || false,
        },
        services: filteredServices,
        employees: filteredEmployees,
        projects: filteredProjects,
        articles: filteredArticles,
        testimonials: filteredTestimonials,
        clients: filteredClients,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => useContext(BusinessContext);
