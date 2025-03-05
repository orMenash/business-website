
import { useBusiness } from "@/contexts/BusinessContext";
import { ContactForm } from "@/components/ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

const ContactPage = () => {
  const { contact } = useBusiness();

  const breadcrumbItems = [
    { label: "דף הבית", path: "/" },
    { label: "צור קשר", path: "/contact" }
  ];

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-serif font-semibold mb-4">צור קשר</h1>
          <p className="text-gray-600">
            צרו איתנו קשר עוד היום. אנחנו כאן לעזור לכם בכל שאלה או בקשה
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl font-serif font-semibold mb-6">
              שלחו לנו הודעה
            </h2>
            <ContactForm />
          </div>

          <div>
            <h2 className="text-2xl font-serif font-semibold mb-6">
              פרטי התקשרות
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-accent" />
                  <div>
                    <h3 className="font-semibold mb-1">טלפון</h3>
                    <a 
                      href={`tel:${contact.phone}`} 
                      className="text-gray-600 hover:text-accent transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-accent" />
                  <div>
                    <h3 className="font-semibold mb-1">אימייל</h3>
                    <a 
                      href={`mailto:${contact.email}`} 
                      className="text-gray-600 hover:text-accent transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-accent" />
                  <div>
                    <h3 className="font-semibold mb-1">כתובת</h3>
                    <p className="text-gray-600">{contact.address}</p>
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

export default ContactPage;
