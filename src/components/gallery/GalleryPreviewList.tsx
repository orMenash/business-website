
import { Album, GalleryImageWithAlbum } from "@/types/gallery";
import { GalleryAlbumPreview } from "./GalleryAlbumPreview";

interface GalleryPreviewListProps {
  albums: Album[];
  onImageClick: (albumId: string, imageIndex: number) => void;
}

export const GalleryPreviewList = ({ albums, onImageClick }: GalleryPreviewListProps) => {
  if (!albums.length) return <p className="text-center py-8 text-gray-500">לא נמצאו אלבומים זמינים</p>;

  return (
    <div className="space-y-16">
      {albums.map((album) => (
        <GalleryAlbumPreview 
          key={album.id}
          album={album}
          onImageClick={onImageClick}
        />
      ))}
    </div>
  );
};
