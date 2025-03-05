
import { useState, useEffect, useRef } from "react";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { SectionProps } from "@/types/section";
import testimonialsData from "@/config/testimonials.json";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const TestimonialsSection = ({ section }: SectionProps) => {
  const [activeIndices, setActiveIndices] = useState([0, 1, 2]);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { testimonials } = testimonialsData;

  // Filter testimonials by show flag
  const filteredTestimonials = testimonials.filter(
    (testimonial) => testimonial.show
  );

  // Get the transition duration from JSON config (default to 7000ms if not specified)
  const transitionDuration = section.interval || 7000;

  // Initialize animation
  useEffect(() => {
    if (filteredTestimonials.length <= 3) {
      return; // No need for animation if we have 3 or fewer testimonials
    }

    // Set up rotation interval
    const interval = setInterval(() => {
      if (!isAnimating) {
        rotateTestimonials();
      }
    }, transitionDuration);

    return () => clearInterval(interval);
  }, [filteredTestimonials.length, transitionDuration, activeIndices, isAnimating]);

  // Function to handle testimonial rotation
  const rotateTestimonials = () => {
    setIsAnimating(true);
    
    // Calculate the next index (the new card that will enter from the right)
    const nextIndex = (activeIndices[2] + 1) % filteredTestimonials.length;
    
    setTimeout(() => {
      // Remove the first (leftmost) element and add the new index at the end
      setActiveIndices(prev => [...prev.slice(1), nextIndex]);
      setIsAnimating(false);
    }, 800); // Animation duration
  };

  if (filteredTestimonials.length === 0) return null;

  return (
    <section className="py-10 bg-gray-50 relative">
      {section.background && section.showBackground && (
        <div 
          className="absolute inset-0 z-0"
          style={{ opacity: section.background.opacity }}
        >
          <img
            src={section.background.image}
            alt={section.background.alt}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 max-w-2xl mx-auto animate-on-scroll">
          <h2 
            className="text-3xl font-serif font-semibold mb-4"
            dangerouslySetInnerHTML={{ __html: section.title }}
          />
          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: section.description }}
          />
        </div>

        <div 
          ref={carouselRef}
          className="relative overflow-hidden mb-8"
          style={{ minHeight: "280px" }}
        >
          <div className="flex justify-center">
            <div className="w-full max-w-5xl relative h-[280px]">
              {/* Container for the testimonials with conveyor belt animation */}
              <div className="flex gap-4 absolute inset-0">
                {filteredTestimonials.map((testimonial, index) => {
                  // Determine if this testimonial should be visible or in transition
                  const isActive = activeIndices.includes(index);
                  
                  // For entering card (from right)
                  const isEntering = isAnimating && index === (activeIndices[2] + 1) % filteredTestimonials.length;
                  
                  // For exiting card (to left)
                  const isExiting = isAnimating && index === activeIndices[0];
                  
                  // If not active and not animating, don't render
                  if (!isActive && !isEntering && !isExiting) return null;
                  
                  // Calculate position class for conveyor belt effect
                  let position = "";
                  let translateX = 0;
                  
                  if (isEntering) {
                    position = "right-entering"; // Starting to enter from right
                    translateX = 100; // Start from 100% right (fully off-screen)
                  } else if (isExiting) {
                    position = "left-exiting"; // Exiting to left
                    translateX = isAnimating ? -100 : 0; // Move from 0 to -100% (fully off-screen)
                  } else {
                    // Position based on index in activeIndices
                    const positionIndex = activeIndices.indexOf(index);
                    if (positionIndex === 0) {
                      position = "left"; // Leftmost card
                      translateX = isAnimating ? -100 : 0; // Move from 0 to -100% when animating
                    } else if (positionIndex === 1) {
                      position = "center"; // Center card
                      translateX = isAnimating ? -100 : 0; // Move from 0 to -100% when animating
                    } else if (positionIndex === 2) {
                      position = "right"; // Rightmost card
                      translateX = isAnimating ? -100 : 0; // Move from 0 to -100% when animating
                    }
                  }
                  
                  return (
                    <div
                      key={testimonial.id}
                      className="transition-all duration-800 ease-in-out w-full md:w-1/3 absolute"
                      style={{ 
                        transitionDuration: "800ms",
                        transform: isAnimating ? `translateX(${translateX}%)` : "translateX(0)",
                        right: position === "right" ? "0%" : 
                               position === "center" ? "33.33%" : 
                               position === "left" ? "66.66%" :
                               position === "right-entering" ? "-33.33%" : "100%"
                      }}
                    >
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {section.showButton !== false && (
          <div className="flex justify-center mt-6">
            <Link to="/testimonials">
              <Button
                variant="default"
                className="group flex items-center gap-2 animate-on-scroll"
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
