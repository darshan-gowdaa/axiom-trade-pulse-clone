'use client';

import { cn } from '@/lib/utils';
import { formatPercentage } from '@/utils';

interface PriceChangeProps {
  value: number;
  showIcon?: boolean;
  className?: string;
}

export function PriceChange({ value, showIcon = true, className }: PriceChangeProps) {
  const isPositive = value >= 0;
  
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 font-medium',
        isPositive ? 'text-[var(--primary-green)]' : 'text-[var(--primary-red)]',
        className
      )}
    >
      {showIcon && (
        <span className="text-[10px]">
          {isPositive ? '▲' : '▼'}
        </span>
      )}
      <span>{formatPercentage(value)}</span>
    </span>
  );
}
