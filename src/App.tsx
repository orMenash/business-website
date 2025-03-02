
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { BusinessProvider, useBusiness } from "@/contexts/BusinessContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { AccessibilityTools } from "@/components/AccessibilityTools";
import { CookieConsent } from "@/components/CookieConsent";
import { useEffect } from "react";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServicePage from "./pages/ServicePage";
import EmployeePage from "./pages/EmployeePage";
import ContactPage from "./pages/ContactPage";
import ProjectPage from "./pages/ProjectPage";
import ProjectsPage from "./pages/ProjectsPage";
import TeamPage from "./pages/TeamPage";
import GalleryPage from "./pages/GalleryPage";
import AlbumPage from "./pages/AlbumPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Reset scroll position on page change
    window.scrollTo(0, 0);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]);

  return <div className="transition-opacity duration-300">{children}</div>;
};

const AppContent = () => {
  const { name, logo } = useBusiness();

  useEffect(() => {
    document.title = name;
    
    // Set favicon from business config
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon && logo.faviconUrl) {
      favicon.href = logo.faviconUrl;
    }
  }, [name, logo.faviconUrl]);

  return (
    <div dir="rtl" className="font-sans min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <PageContainer>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/service/:id" element={<ServicePage />} />
            <Route path="/employee/:id" element={<EmployeePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/project/:id" element={<ProjectPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/:albumId" element={<AlbumPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageContainer>
      </main>
      <Footer />
      <FloatingContact />
      <AccessibilityTools />
      <CookieConsent />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BusinessProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BusinessProvider>
  </QueryClientProvider>
);

export default App;
