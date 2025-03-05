
import { Switch } from "@/components/ui/switch";

interface FeatureToggleProps {
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
  label: string;
}

export const FeatureToggle = ({ isEnabled, onToggle, label }: FeatureToggleProps) => {
  return (
    <div className="flex justify-between items-center">
      <Switch
        checked={isEnabled}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-accent"
      />
      <span>{label}</span>
    </div>
  );
};
