
import { Breadcrumb } from "@/components/Breadcrumb";
import { ClientCard } from "@/components/ClientCard";
import clientsConfig from "@/config/clients.json";
import siteConfig from "@/config/site.json";

const ClientsPage = () => {
  const section = siteConfig.sections.clients;
  const title = section?.title || "הלקוחות שלנו";
  const description = section?.description || "";

  const breadcrumbItems = [
    { label: "דף הבית", path: "/" },
    { label: "הלקוחות שלנו", path: "/clients" }
  ];

  const visibleClients = clientsConfig.clients.filter(client => client.show);

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-serif font-semibold mb-4"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div 
            className="text-gray-600 max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {visibleClients.map((client, index) => (
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

        {visibleClients.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600">אין לקוחות להצגה כרגע.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsPage;
