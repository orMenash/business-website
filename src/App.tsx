
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BusinessProvider, useBusiness } from "@/contexts/BusinessContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { AccessibilityTools } from "@/components/AccessibilityTools";
import { CookieConsent } from "@/components/CookieConsent";
import { useEffect } from "react";
import Index from "./pages/Index";
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

const AppContent = () => {
  const { name } = useBusiness();

  useEffect(() => {
    document.title = name;
  }, [name]);

  return (
    <div dir="rtl" className="font-sans">
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
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
          </main>
          <Footer />
          <FloatingContact />
          <AccessibilityTools />
          <CookieConsent />
        </div>
      </BrowserRouter>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BusinessProvider>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </BusinessProvider>
  </QueryClientProvider>
);

export default App;
