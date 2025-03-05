
import { useState } from "react";
import { Accessibility } from "lucide-react";
import accessibilityConfig from "@/config/accessibility.json";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AccessibilityMenu } from "./accessibility/AccessibilityMenu";
import { AccessibilityStyleManager } from "./accessibility/AccessibilityStyleManager";

export const AccessibilityTools = () => {
  const [fontSize, setFontSize] = useState(16);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isInvertedContrast, setIsInvertedContrast] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);
  const [areLinksHighlighted, setAreLinksHighlighted] = useState(false);
  const [isReadableFont, setIsReadableFont] = useState(false);

  const resetAll = () => {
    setFontSize(16);
    setIsGrayscale(false);
    setIsHighContrast(false);
    setIsInvertedContrast(false);
    setIsLightBackground(false);
    setAreLinksHighlighted(false);
    setIsReadableFont(false);
  };

  const openAccessibilityStatement = () => {
    window.open(accessibilityConfig.accessibilityStatementPath, '_blank');
  };

  if (!accessibilityConfig.showAccessibilityIcon) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <AccessibilityStyleManager
        fontSize={fontSize}
        isGrayscale={isGrayscale}
        isHighContrast={isHighContrast}
        isInvertedContrast={isInvertedContrast}
        isLightBackground={isLightBackground}
        areLinksHighlighted={areLinksHighlighted}
        isReadableFont={isReadableFont}
      />
      
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            size="icon" 
            variant="outline" 
            className="h-12 w-12"
            aria-label="פתח תפריט נגישות"
          >
            <Accessibility className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        
        <AccessibilityMenu
          state={{
            fontSize,
            isGrayscale,
            isHighContrast,
            isInvertedContrast,
            isLightBackground,
            areLinksHighlighted,
            isReadableFont,
          }}
          onStateChange={{
            setFontSize,
            setIsGrayscale,
            setIsHighContrast,
            setIsInvertedContrast,
            setIsLightBackground,
            setAreLinksHighlighted,
            setIsReadableFont,
          }}
          onReset={resetAll}
          onOpenStatement={openAccessibilityStatement}
        />
      </Sheet>
    </div>
  );
};
