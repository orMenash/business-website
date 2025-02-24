
import { useState, useEffect } from "react";
import {
  Accessibility,
  TextIcon,
  Moon,
  Sun,
  Contrast,
  Link2,
  Type,
  RotateCcw,
} from "lucide-react";
import accessibilityConfig from "@/config/accessibility.json";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const AccessibilityTools = () => {
  const [fontSize, setFontSize] = useState(16);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isInvertedContrast, setIsInvertedContrast] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);
  const [areLinksHighlighted, setAreLinksHighlighted] = useState(false);
  const [isReadableFont, setIsReadableFont] = useState(false);

  const updateStyles = () => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    
    const classList = document.documentElement.classList;
    
    if (isGrayscale) classList.add("grayscale");
    else classList.remove("grayscale");
    
    if (isHighContrast) classList.add("high-contrast");
    else classList.remove("high-contrast");
    
    if (isInvertedContrast) classList.add("inverted-contrast");
    else classList.remove("inverted-contrast");
    
    if (isLightBackground) classList.add("light-background");
    else classList.remove("light-background");
    
    if (areLinksHighlighted) classList.add("highlight-links");
    else classList.remove("highlight-links");
    
    if (isReadableFont) classList.add("readable-font");
    else classList.remove("readable-font");
  };

  useEffect(() => {
    updateStyles();
  }, [
    fontSize,
    isGrayscale,
    isHighContrast,
    isInvertedContrast,
    isLightBackground,
    areLinksHighlighted,
    isReadableFont,
  ]);

  const increaseFontSize = () => {
    if (fontSize < accessibilityConfig.tools.fontSize.maxSize) {
      setFontSize(fontSize + accessibilityConfig.tools.fontSize.increment);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > accessibilityConfig.tools.fontSize.minSize) {
      setFontSize(fontSize - accessibilityConfig.tools.fontSize.increment);
    }
  };

  const resetAll = () => {
    setFontSize(16);
    setIsGrayscale(false);
    setIsHighContrast(false);
    setIsInvertedContrast(false);
    setIsLightBackground(false);
    setAreLinksHighlighted(false);
    setIsReadableFont(false);
  };

  if (!accessibilityConfig.showAccessibilityIcon) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="h-12 w-12">
            <Accessibility className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>כלי נגישות</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4">
            {accessibilityConfig.tools.fontSize.show && (
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={decreaseFontSize}
                  >
                    <TextIcon className="h-4 w-4" />-
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={increaseFontSize}
                  >
                    <TextIcon className="h-4 w-4" />+
                  </Button>
                </div>
                <span>גודל טקסט</span>
              </div>
            )}

            {accessibilityConfig.tools.grayscale.show && (
              <div className="flex justify-between items-center">
                <Switch
                  checked={isGrayscale}
                  onCheckedChange={setIsGrayscale}
                />
                <span>גווני אפור</span>
              </div>
            )}

            {accessibilityConfig.tools.highContrast.show && (
              <div className="flex justify-between items-center">
                <Switch
                  checked={isHighContrast}
                  onCheckedChange={setIsHighContrast}
                />
                <span>ניגודיות גבוהה</span>
              </div>
            )}

            {accessibilityConfig.tools.invertedContrast.show && (
              <div className="flex justify-between items-center">
                <Switch
                  checked={isInvertedContrast}
                  onCheckedChange={setIsInvertedContrast}
                />
                <span>ניגודיות הפוכה</span>
              </div>
            )}

            {accessibilityConfig.tools.lightBackground.show && (
              <div className="flex justify-between items-center">
                <Switch
                  checked={isLightBackground}
                  onCheckedChange={setIsLightBackground}
                />
                <span>רקע בהיר</span>
              </div>
            )}

            {accessibilityConfig.tools.highlightLinks.show && (
              <div className="flex justify-between items-center">
                <Switch
                  checked={areLinksHighlighted}
                  onCheckedChange={setAreLinksHighlighted}
                />
                <span>הדגשת קישורים</span>
              </div>
            )}

            {accessibilityConfig.tools.readableFont.show && (
              <div className="flex justify-between items-center">
                <Switch
                  checked={isReadableFont}
                  onCheckedChange={setIsReadableFont}
                />
                <span>פונט קריא</span>
              </div>
            )}

            {accessibilityConfig.tools.reset.show && (
              <Button
                variant="outline"
                className="w-full"
                onClick={resetAll}
              >
                <RotateCcw className="h-4 w-4 ml-2" />
                איפוס הגדרות
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
