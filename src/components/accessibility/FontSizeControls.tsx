
import { TextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FontSizeControlsProps {
  onIncrease: () => void;
  onDecrease: () => void;
}

export const FontSizeControls = ({ onIncrease, onDecrease }: FontSizeControlsProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={onDecrease}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="הקטן גודל טקסט"
        >
          <TextIcon className="h-4 w-4" />-
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={onIncrease}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="הגדל גודל טקסט"
        >
          <TextIcon className="h-4 w-4" />+
        </Button>
      </div>
      <span>גודל טקסט</span>
    </div>
  );
};
