
import { useBusiness } from "@/contexts/BusinessContext";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import testimonialsData from "@/config/testimonials.json";
import { useEffect } from "react";

const TestimonialsPage = () => {
  const { name } = useBusiness();
  const { testimonials, title, fullDescription } = testimonialsData;

  // Filter testimonials by show flag
  const filteredTestimonials = testimonials.filter(
    (testimonial) => testimonial.show
  );

  // Add animation to elements when page loads
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumb
          items={[
            { label: "דף הבית", path: "/" },
            { label: "מה אומרים עלינו", path: "/testimonials" },
          ]}
        />

        <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
          <h1 className="text-4xl font-serif font-semibold mb-4"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div 
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: fullDescription }}
          />
        </div>

        {filteredTestimonials.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6 mb-12 max-w-6xl mx-auto">
            {filteredTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-1rem)] animate-on-scroll delay-${index * 100}`}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600">אין חוות דעת להצגה כרגע.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsPage;
