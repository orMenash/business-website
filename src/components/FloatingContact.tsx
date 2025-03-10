
import { Phone, Facebook, Twitter, Instagram, MessageCircle } from "lucide-react";
import { useBusiness } from "@/contexts/BusinessContext";
import { TiktokIcon } from "./TiktokIcon";

export const FloatingContact = () => {
  const { contact } = useBusiness();

  return (
    <div className="fixed bottom-6 left-6 flex flex-col space-y-4 z-50">
      {contact.social.facebook.show && contact.social.facebook.showFloating && (
        <a
          href={contact.social.facebook.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1877F2] text-white p-3 rounded-full shadow-lg hover:bg-[#1877F2]/90 transition-colors"
          aria-label="פייסבוק"
        >
          <Facebook className="w-6 h-6" aria-hidden="true" />
        </a>
      )}
      {contact.social.instagram.show && contact.social.instagram.showFloating && (
        <a
          href={contact.social.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#E4405F] text-white p-3 rounded-full shadow-lg hover:bg-[#E4405F]/90 transition-colors"
          aria-label="אינסטגרם"
        >
          <Instagram className="w-6 h-6" aria-hidden="true" />
        </a>
      )}
      {contact.social.tiktok.show && contact.social.tiktok.showFloating && (
        <a
          href={contact.social.tiktok.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-black/90 transition-colors"
          aria-label="טיקטוק"
        >
          <TiktokIcon className="w-6 h-6" aria-hidden="true" />
        </a>
      )}
      {contact.social.twitter.show && contact.social.twitter.showFloating && (
        <a
          href={contact.social.twitter.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1DA1F2] text-white p-3 rounded-full shadow-lg hover:bg-[#1DA1F2]/90 transition-colors"
          aria-label="טוויטר"
        >
          <Twitter className="w-6 h-6" aria-hidden="true" />
        </a>
      )}
      {contact.showFloatingWhatsapp && (
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#25D366]/90 transition-colors"
          aria-label="ווטסאפ"
        >
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
        </a>
      )}
      {contact.showFloatingPhone && (
        <a
          href={`tel:${contact.phone}`}
          className="bg-accent text-white p-3 rounded-full shadow-lg hover:bg-accent/90 transition-colors"
          aria-label="טלפון"
        >
          <Phone className="w-6 h-6" aria-hidden="true" />
        </a>
      )}
    </div>
  );
};
