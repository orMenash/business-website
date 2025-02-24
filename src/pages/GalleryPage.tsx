
import { useState } from "react";
import { Link } from "react-router-dom";
import galleryConfig from "@/config/gallery.json";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const GalleryPage = () => {
  const albums = galleryConfig.albums.filter((album) => album.show_album);

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-serif font-semibold mb-12 text-center">גלריה</h1>
      <div className="space-y-16">
        {albums.map((album) => (
          <div key={album.id} className="space-y-6">
            <Link 
              to={`/gallery/${album.id}`}
              className="text-2xl font-serif font-medium hover:text-accent transition-colors block"
            >
              {album.name}
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {album.images
                .filter(img => img.show_image)
                .sort((a, b) => a.order - b.order)
                .slice(0, album.max_images)
                .map((image, index) => (
                  <div 
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={image.url}
                      alt={image.description}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
