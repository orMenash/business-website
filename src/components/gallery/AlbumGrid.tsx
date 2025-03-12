
import { Play, ZoomIn } from "lucide-react";
import { GalleryImage } from "@/types/gallery";
import { isYouTubeUrl, getYouTubeVideoId } from "@/utils/videoUtils";

interface AlbumGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export const AlbumGrid = ({ images, onImageClick }: AlbumGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image, index) => {
        const showImage = image.show_image !== false;
        
        return (
          <div 
            key={index}
            className="group aspect-square rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => onImageClick(index)}
          >
            <div className="relative h-full">
              {showImage && (image.type === "video" ? (image.thumbnail || (isYouTubeUrl(image.url) ? `https://img.youtube.com/vi/${getYouTubeVideoId(image.url)}/hqdefault.jpg` : image.url)) : image.url) ? (
                <img
                  src={image.type === "video" ? (image.thumbnail || (isYouTubeUrl(image.url) ? `https://img.youtube.com/vi/${getYouTubeVideoId(image.url)}/hqdefault.jpg` : image.url)) : image.url}
                  alt={image.description}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">
                    {image.type === "video" ? "סרטון לא זמין" : "תמונה לא זמינה"}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  {image.type === "video" ? (
                    <Play className="w-8 h-8 mx-auto mb-2" />
                  ) : (
                    <ZoomIn className="w-8 h-8 mx-auto mb-2" />
                  )}
                  <p className="text-sm px-4">{image.description}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
