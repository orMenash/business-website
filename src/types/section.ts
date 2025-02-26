
export interface Section {
  show: boolean;
  order: number;
  max_display?: number | null;
  title: string;
  description: string;
  fullDescription?: string;
  cta?: string;
  image?: string;
  background?: {
    image: string;
    alt: string;
    opacity: number;
  };
}

export interface SectionProps {
  section: Section;
}
