
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "@/components/Breadcrumb";

interface AlbumHeaderProps {
  albumName: string;
  breadcrumbItems: Array<{ label: string; path: string }>;
}

export const AlbumHeader = ({ albumName, breadcrumbItems }: AlbumHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-serif font-semibold">{albumName}</h1>
        <Button 
          variant="outline"
          onClick={() => navigate("/gallery")}
          className="hover:scale-105 transition-transform duration-300"
        >
          חזרה לגלריה
        </Button>
      </div>
    </>
  );
};
