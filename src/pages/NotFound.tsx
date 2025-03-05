
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Home } from "lucide-react";
import { useBusiness } from "@/contexts/BusinessContext";

const NotFound = () => {
  const location = useLocation();
  const { name, logo } = useBusiness();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-32 pb-16">
      <div className="text-center bg-white p-12 rounded-lg shadow-lg max-w-lg w-full">
        <div className="mb-6 flex justify-center">
          {logo?.url && (
            <img 
              src={logo.url} 
              alt={`${name} לוגו`} 
              className="h-20 w-auto object-contain"
            />
          )}
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 text-red-500 font-bold rounded-full w-24 h-24 flex items-center justify-center text-5xl border-4 border-red-200">
            404
          </div>
        </div>
        
        <h1 className="text-3xl font-serif font-semibold mb-3">העמוד לא נמצא</h1>
        
        <div className="flex justify-center mb-6">
          <Search className="text-gray-400 w-12 h-12" />
        </div>
        
        <p className="text-lg text-gray-600 mb-4">
          אופס! הדף שחיפשת לא קיים.
        </p>
        <p className="text-gray-500 mb-8">
          ייתכן שכתובת ה-URL שהזנת שגויה או שהדף הוסר.
        </p>
        
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full flex items-center justify-center gap-2" size="lg">
              <Home className="w-4 h-4" />
              <span>חזרה לדף הבית</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
