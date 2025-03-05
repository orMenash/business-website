
import { useEffect } from "react";

interface AccessibilityStyleManagerProps {
  fontSize: number;
  isGrayscale: boolean;
  isHighContrast: boolean;
  isInvertedContrast: boolean;
  isLightBackground: boolean;
  areLinksHighlighted: boolean;
  isReadableFont: boolean;
}

export const AccessibilityStyleManager = ({
  fontSize,
  isGrayscale,
  isHighContrast,
  isInvertedContrast,
  isLightBackground,
  areLinksHighlighted,
  isReadableFont,
}: AccessibilityStyleManagerProps) => {
  useEffect(() => {
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
  }, [
    fontSize,
    isGrayscale,
    isHighContrast,
    isInvertedContrast,
    isLightBackground,
    areLinksHighlighted,
    isReadableFont,
  ]);

  return null;
};
