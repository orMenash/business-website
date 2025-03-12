
import { ArticleCard } from "@/components/ArticleCard";
import { SectionProps } from "@/types/section";
import articles from "@/config/articles.json";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const ArticlesSection = ({ section }: SectionProps) => {
  if (articles.articles.length === 0) return null;

  // Get background color from section configuration
  const backgroundColor = section.background?.backgroundColor || "#ffffff";

  return (
    <section 
      className="py-16 relative"
      style={{ backgroundColor }}
    >
      {section.background && section.showBackground && (
        <div 
          className="absolute inset-0 z-0"
          style={{ opacity: section.background.opacity }}
        >
          <img
            src={section.background.image}
            alt={section.background.alt || "רקע למדור מאמרים"}
            className="w-full h-full object-cover"
            width="1920"
            height="1080"
          />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-6 animate-on-scroll">
          <h2 
            className="text-3xl font-serif font-semibold mb-4"
            dangerouslySetInnerHTML={{ __html: section.title }}
          />
          <div 
            className="text-gray-600 mb-6"
            dangerouslySetInnerHTML={{ __html: section.description }}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {articles.articles
            .filter(article => article.show)
            .slice(0, section.max_display)
            .map((article, index) => (
              <div key={article.id} className={`w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] animate-on-scroll delay-${index * 100}`}>
                <ArticleCard
                  id={article.id}
                  title={article.title}
                  description={article.description}
                  image={article.image}
                  showImage={article.showImage}
                  category={article.category}
                  date={article.date}
                  author={article.author}
                  clickable={article.clickable}
                />
              </div>
            ))}
        </div>
        {section.showButton !== false && (
          <div className="flex justify-center animate-on-scroll delay-300">
            <Link to="/articles" aria-label="לכל המאמרים">
              <Button className="group hover-lift flex items-center gap-2">
                <span>{section.cta || "לכל המאמרים"}</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
