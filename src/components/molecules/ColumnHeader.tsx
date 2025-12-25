'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms';

interface ColumnHeaderProps {
  title: string;
  count?: number;
  presets?: { id: string; name: string }[];
  activePreset?: string | null;
  onPresetClick?: (presetId: string) => void;
  onSettingsClick?: () => void;
  className?: string;
}

export function ColumnHeader({
  title,
  count,
  presets = [],
  activePreset,
  onPresetClick,
  onSettingsClick,
  className,
}: ColumnHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-3 py-2 border-b border-[var(--border-default)] bg-[var(--background)]',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">
          {title}
        </h2>
        {typeof count === 'number' && (
          <span className="text-xs text-[var(--text-muted)]">({count})</span>
        )}
      </div>

      <div className="flex items-center gap-1">
        {presets.map((preset) => (
          <Button
            key={preset.id}
            variant={activePreset === preset.id ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onPresetClick?.(preset.id)}
            className="min-w-[2rem]"
          >
            {preset.name}
          </Button>
        ))}
        
        {onSettingsClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            className="ml-1"
            aria-label="Column settings"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
}
