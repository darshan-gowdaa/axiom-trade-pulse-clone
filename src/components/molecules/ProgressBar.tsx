'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function ProgressBar({
  value,
  showLabel = false,
  size = 'sm',
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  // Color changes based on progress
  const getBarColor = () => {
    if (clampedValue >= 90) return 'bg-[var(--primary-green)]';
    if (clampedValue >= 70) return 'bg-teal-400';
    if (clampedValue >= 50) return 'bg-cyan-400';
    return 'bg-[var(--primary-blue)]';
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'relative overflow-hidden rounded-full bg-[var(--background-card)]',
          size === 'sm' ? 'h-1.5 flex-1' : 'h-2 flex-1'
        )}
      >
        <div
          className={cn(
            'absolute inset-y-0 left-0 rounded-full transition-all duration-300',
            getBarColor()
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-[var(--text-secondary)] tabular-nums min-w-[2.5rem] text-right">
          {clampedValue.toFixed(0)}%
        </span>
      )}
    </div>
  );
}
