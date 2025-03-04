
import { useState } from "react";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { SectionProps } from "@/types/section";
import testimonialsData from "@/config/testimonials.json";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const TestimonialsSection = ({ section }: SectionProps) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const { testimonials } = testimonialsData;

  // Filter testimonials by show flag
  const filteredTestimonials = testimonials.filter(
    (testimonial) => testimonial.show
  );

  if (filteredTestimonials.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-2xl mx-auto animate-on-scroll">
          <h2 className="text-3xl font-serif font-semibold mb-4">
            {testimonialsData.title}
          </h2>
          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: testimonialsData.description }}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {filteredTestimonials.slice(0, visibleCount).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] animate-on-scroll delay-${
                index * 100
              }`}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {visibleCount < filteredTestimonials.length && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setVisibleCount(filteredTestimonials.length)}
              className="animate-on-scroll delay-300"
            >
              {section.cta || "הצג עוד"}
            </Button>
          </div>
        )}

        {section.showButton !== false && filteredTestimonials.length > 3 && (
          <div className="flex justify-center mt-8">
            <Link to="/testimonials">
              <Button
                variant="default"
                className="group flex items-center gap-2 animate-on-scroll delay-400"
              >
                <span>כל חוות הדעת</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
