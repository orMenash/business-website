
import { Phone, Facebook, Twitter, Instagram, WhatsApp } from "lucide-react";
import { useBusiness } from "@/contexts/BusinessContext";
import { TiktokIcon } from "./TiktokIcon";

export const FloatingContact = () => {
  const { contact } = useBusiness();

  return (
    <div className="fixed bottom-6 left-6 flex flex-col space-y-4 z-50">
      {contact.social?.facebook?.show && (
        <a
          href={contact.social.facebook.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1877F2] text-white p-3 rounded-full shadow-lg hover:bg-[#1877F2]/90 transition-colors"
        >
          <Facebook className="w-6 h-6" />
        </a>
      )}
      {contact.social?.instagram?.show && (
        <a
          href={contact.social.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#E4405F] text-white p-3 rounded-full shadow-lg hover:bg-[#E4405F]/90 transition-colors"
        >
          <Instagram className="w-6 h-6" />
        </a>
      )}
      {contact.social?.tiktok?.show && (
        <a
          href={contact.social.tiktok.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-black/90 transition-colors"
        >
          <TiktokIcon className="w-6 h-6" />
        </a>
      )}
      {contact.social?.twitter?.show && (
        <a
          href={contact.social.twitter.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1DA1F2] text-white p-3 rounded-full shadow-lg hover:bg-[#1DA1F2]/90 transition-colors"
        >
          <Twitter className="w-6 h-6" />
        </a>
      )}
      {contact.showFloatingWhatsapp && (
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#25D366]/90 transition-colors"
        >
          <WhatsApp className="w-6 h-6" />
        </a>
      )}
      {contact.showFloatingPhone && (
        <a
          href={`tel:${contact.phone}`}
          className="bg-accent text-white p-3 rounded-full shadow-lg hover:bg-accent/90 transition-colors"
        >
          <Phone className="w-6 h-6" />
        </a>
      )}
    </div>
  );
};
