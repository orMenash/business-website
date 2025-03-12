
import { useParams, Link } from "react-router-dom";
import NotFound from "./NotFound";
import articles from "@/config/articles.json";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { GalleryModal } from "@/components/gallery/GalleryModal";
import { GalleryImageWithAlbum } from "@/types/gallery";

const ArticlePage = () => {
  const { id } = useParams();
  const article = articles.articles.find((a) => a.id === id);
  const [showFullImage, setShowFullImage] = useState(false);

  if (!article || !article.show) {
    return <NotFound />;
  }

  const breadcrumbItems = [
    { label: "דף הבית", path: "/" },
    { label: "מאמרים", path: "/articles" },
    { label: article.title, path: `/article/${id}` }
  ];

  // Format date
  const formattedDate = new Date(article.date).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Create a single gallery image object for the article image
  const articleImage: GalleryImageWithAlbum = {
    url: article.image,
    type: "image",
    show_image: true,
    order: 0,
    description: article.title,
    albumId: "article",
    albumName: "מאמרים"
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="max-w-4xl mx-auto">
          {article.showImageOnPage && (
            <div 
              className="aspect-w-16 aspect-h-9 mb-8 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setShowFullImage(true)}
            >
              <img
                src={article.image}
                alt={article.title}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                {article.category}
              </span>
              
              <div className="flex items-center text-gray-500 text-sm">
                <CalendarIcon className="w-4 h-4 ml-1" />
                <span>{formattedDate}</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-serif font-semibold mb-4">{article.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-8">
              <UserIcon className="w-5 h-5 ml-2" />
              <span>{article.author}</span>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <div 
              className="text-gray-600 mb-8"
              dangerouslySetInnerHTML={{ __html: article.description }}
            />
            {article.fullDescription && (
              <div 
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: article.fullDescription }}
              />
            )}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link to="/articles">
              <Button variant="outline" className="hover-lift">
                חזרה לכל המאמרים
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Gallery Modal for article image */}
      {showFullImage && article.showImageOnPage && (
        <GalleryModal
          images={[articleImage]}
          selectedImageIndex={0}
          onClose={() => setShowFullImage(false)}
          onPrevious={() => {}}
          onNext={() => {}}
          onSelectImage={() => {}}
        />
      )}
    </div>
  );
};

export default ArticlePage;
