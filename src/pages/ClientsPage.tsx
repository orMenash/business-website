
import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ClientCard } from "@/components/ClientCard";
import clientsConfig from "@/config/clients.json";
import siteConfig from "@/config/site.json";

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const section = siteConfig.sections.clients;
  const title = section?.title || "הלקוחות שלנו";
  const description = section?.description || "";

  const breadcrumbItems = [
    { label: "דף הבית", path: "/" },
    { label: "הלקוחות שלנו", path: "/clients" }
  ];

  const filteredClients = clientsConfig.clients
    .filter(client => client.show)
    .filter(client => 
      client.name.includes(searchTerm) || 
      client.description.includes(searchTerm)
    );

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="text-center mb-8">
          <h1 
            className="text-4xl font-serif font-semibold mb-4"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div 
            className="text-gray-600 max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="חיפוש לקוחות..."
            className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {filteredClients.map((client, index) => (
            <div key={client.id} className={`animate-on-scroll delay-${index % 4 * 100}`}>
              <ClientCard
                name={client.name}
                description={client.description}
                logo={client.logo}
                url={client.url}
                id={client.id}
              />
            </div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600">לא נמצאו לקוחות התואמים את החיפוש שלך.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsPage;
