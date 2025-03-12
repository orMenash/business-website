
import { ArticleCard } from "@/components/ArticleCard";
import articles from "@/config/articles.json";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";

const ArticlesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const breadcrumbItems = [
    { label: "דף הבית", path: "/" },
    { label: "מאמרים", path: "/articles" }
  ];

  const visibleArticles = articles.articles
    .filter((article) => article.show)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalPages = Math.ceil(visibleArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = visibleArticles.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-semibold mb-2">
              {articles.title}
            </h1>
            <p className="text-gray-600">{articles.description}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {currentArticles.map((article) => (
              <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]" key={article.id}>
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

          {totalPages > 1 && (
            <Pagination className="justify-center">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
                  </PaginationItem>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
