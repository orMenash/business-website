
export interface Section {
  show: boolean;
  order: number;
  max_display?: number | null;
  title: string;
  description: string;
  cta?: string;
  image?: string;
  interval?: number;
}

export interface SectionProps {
  section: Section;
}
