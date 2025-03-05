
import { FileText, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AccessibilityActionsProps {
  onReset: () => void;
  onOpenStatement: () => void;
  showStatement: boolean;
  showReset: boolean;
}

export const AccessibilityActions = ({
  onReset,
  onOpenStatement,
  showStatement,
  showReset,
}: AccessibilityActionsProps) => {
  return (
    <>
      {showStatement && (
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onOpenStatement}
          aria-label="פתח הצהרת נגישות"
        >
          <FileText className="h-4 w-4 ml-2" />
          הצהרת נגישות
        </Button>
      )}

      {showReset && (
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onReset}
          aria-label="אפס הגדרות נגישות"
        >
          <RotateCcw className="h-4 w-4 ml-2" />
          איפוס הגדרות
        </Button>
      )}
    </>
  );
};
