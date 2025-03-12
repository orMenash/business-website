
export interface Section {
  show: boolean;
  order: number;
  max_display?: number | null;
  title: string;
  description: string;
  fullDescription?: string;
  cta?: string;
  image?: string;
  showImage?: boolean;
  showButton?: boolean;
  showBackground?: boolean;
  interval?: number;
  fullWidth?: boolean;
  background?: {
    image: string;
    alt: string;
    opacity: number;
    backgroundColor?: string;
  };
  tagline?: string;
}

export interface SectionProps {
  section: Section;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  showImage: boolean;
  showImageOnPage: boolean;
  category: string;
  date: string;
  author: string;
  show: boolean;
  clickable: boolean;
  fullDescription: string;
}
