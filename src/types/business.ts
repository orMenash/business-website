
export interface SocialLink {
  show: boolean;
  showInFooter: boolean;
  showFloating: boolean;
  url: string;
}

export interface Social {
  facebook: SocialLink;
  instagram: SocialLink;
  tiktok: SocialLink;
  twitter: SocialLink;
}

export interface BusinessContact {
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
  showFloatingWhatsapp: boolean;
  showFloatingPhone: boolean;
  social: Social;
}

export interface BusinessConfig {
  name: string;
  description: string;
  logo: {
    url: string;
    height: string;
    width: string;
  };
  contact: BusinessContact;
}
