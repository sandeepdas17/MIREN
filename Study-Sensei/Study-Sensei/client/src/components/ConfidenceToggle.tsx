import { cn } from '@/lib/utils';
import type { ConfidenceLevel } from '@/lib/types';

interface ConfidenceToggleProps {
  value: ConfidenceLevel;
  onChange: (value: ConfidenceLevel) => void;
  compact?: boolean;
}

const confidenceOptions: { value: ConfidenceLevel; label: string; color: string; bgColor: string }[] = [
  { value: 'not-confident', label: 'Not Confident', color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/30' },
  { value: 'somewhat', label: 'Somewhat', color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { value: 'confident', label: 'Confident', color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' },
];

export default function ConfidenceToggle({ value, onChange, compact = false }: ConfidenceToggleProps) {
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Confidence level">
      {confidenceOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'rounded-md text-sm font-medium transition-colors',
            compact ? 'px-2 py-1' : 'px-3 py-1.5',
            value === option.value
              ? cn(option.bgColor, option.color)
              : 'bg-muted text-muted-foreground hover-elevate'
          )}
          data-testid={`toggle-confidence-${option.value}`}
        >
          {compact ? option.label.split(' ')[0] : option.label}
        </button>
      ))}
    </div>
  );
}
