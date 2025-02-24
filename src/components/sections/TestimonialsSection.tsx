
import { TestimonialCard } from "@/components/TestimonialCard";
import { SectionProps } from "@/types/section";
import testimonialsConfig from "@/config/testimonials.json";

export const TestimonialsSection = ({ section }: SectionProps) => {
  if (testimonialsConfig.testimonials.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-semibold mb-4">
            {section.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {section.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonialsConfig.testimonials
            .filter((testimonial: any) => testimonial.show)
            .slice(0, section.max_display)
            .map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                role={testimonial.role}
                company={testimonial.company}
                content={testimonial.content}
                rating={testimonial.rating}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
