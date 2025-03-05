
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { SheetHeader, SheetTitle, SheetContent } from "@/components/ui/sheet";
import { FontSizeControls } from "./FontSizeControls";
import { FeatureToggle } from "./FeatureToggle";
import { AccessibilityActions } from "./AccessibilityActions";
import accessibilityConfig from "@/config/accessibility.json";

interface AccessibilityState {
  fontSize: number;
  isGrayscale: boolean;
  isHighContrast: boolean;
  isInvertedContrast: boolean;
  isLightBackground: boolean;
  areLinksHighlighted: boolean;
  isReadableFont: boolean;
}

interface AccessibilityMenuProps {
  state: AccessibilityState;
  onStateChange: {
    setFontSize: (size: number) => void;
    setIsGrayscale: (value: boolean) => void;
    setIsHighContrast: (value: boolean) => void;
    setIsInvertedContrast: (value: boolean) => void;
    setIsLightBackground: (value: boolean) => void;
    setAreLinksHighlighted: (value: boolean) => void;
    setIsReadableFont: (value: boolean) => void;
  };
  onReset: () => void;
  onOpenStatement: () => void;
}

export const AccessibilityMenu = ({
  state,
  onStateChange,
  onReset,
  onOpenStatement,
}: AccessibilityMenuProps) => {
  const {
    fontSize,
    isGrayscale,
    isHighContrast,
    isInvertedContrast,
    isLightBackground,
    areLinksHighlighted,
    isReadableFont,
  } = state;

  const {
    setFontSize,
    setIsGrayscale,
    setIsHighContrast,
    setIsInvertedContrast,
    setIsLightBackground,
    setAreLinksHighlighted,
    setIsReadableFont,
  } = onStateChange;

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

  return (
    <SheetContent side="left" className="w-80">
      <SheetHeader>
        <SheetTitle>כלי נגישות</SheetTitle>
      </SheetHeader>
      <div className="py-4 space-y-4">
        {accessibilityConfig.tools.fontSize.show && (
          <FontSizeControls onIncrease={increaseFontSize} onDecrease={decreaseFontSize} />
        )}

        {accessibilityConfig.tools.grayscale.show && (
          <FeatureToggle
            isEnabled={isGrayscale}
            onToggle={setIsGrayscale}
            label="גווני אפור"
          />
        )}

        {accessibilityConfig.tools.highContrast.show && (
          <FeatureToggle
            isEnabled={isHighContrast}
            onToggle={setIsHighContrast}
            label="ניגודיות גבוהה"
          />
        )}

        {accessibilityConfig.tools.invertedContrast.show && (
          <FeatureToggle
            isEnabled={isInvertedContrast}
            onToggle={setIsInvertedContrast}
            label="ניגודיות הפוכה"
          />
        )}

        {accessibilityConfig.tools.lightBackground.show && (
          <FeatureToggle
            isEnabled={isLightBackground}
            onToggle={setIsLightBackground}
            label="רקע בהיר"
          />
        )}

        {accessibilityConfig.tools.highlightLinks.show && (
          <FeatureToggle
            isEnabled={areLinksHighlighted}
            onToggle={setAreLinksHighlighted}
            label="הדגשת קישורים"
          />
        )}

        {accessibilityConfig.tools.readableFont.show && (
          <FeatureToggle
            isEnabled={isReadableFont}
            onToggle={setIsReadableFont}
            label="פונט קריא"
          />
        )}

        <Separator className="my-4" />

        <AccessibilityActions
          onReset={onReset}
          onOpenStatement={onOpenStatement}
          showStatement={accessibilityConfig.showAccessibilityStatement}
          showReset={accessibilityConfig.tools.reset.show}
        />
      </div>
    </SheetContent>
  );
};
