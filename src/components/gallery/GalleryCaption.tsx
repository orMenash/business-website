
import { GalleryImageWithAlbum } from "@/types/gallery";
import { cn } from "@/lib/utils";

interface GalleryCaptionProps {
  image: GalleryImageWithAlbum;
  className?: string;
  isVideoActive?: boolean;
}

/**
 * Renders the caption for a gallery image
 */
export const GalleryCaption = ({ image, className, isVideoActive }: GalleryCaptionProps) => {
  return (
    <div className={cn(
      "absolute left-0 right-0 p-8 text-white bg-gradient-to-t from-black/70 to-transparent z-10", 
      isVideoActive ? "bottom-20" : "bottom-0",
      className
    )}>
      <h3 className="text-2xl font-medium mb-2">{image.albumName}</h3>
      <p className="text-white/90">{image.description}</p>
    </div>
  );
};
