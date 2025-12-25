'use client';

import { cn } from '@/lib/utils';
import { PriceCell } from '@/components/atoms';
import { formatCurrency, formatCompactNumber } from '@/utils';

interface MetricBlockProps {
  label: string;
  value: number;
  type?: 'currency' | 'number';
  flashDirection?: 'up' | 'down' | null;
  showDecimals?: boolean;
  className?: string;
}

export function MetricBlock({
  label,
  value,
  type = 'currency',
  flashDirection,
  showDecimals = true,
  className,
}: MetricBlockProps) {
  const formattedValue =
    type === 'currency'
      ? formatCurrency(value, showDecimals)
      : formatCompactNumber(value);

  return (
    <div className={cn('flex flex-col items-end', className)}>
      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wide">
        {label}
      </span>
      <PriceCell
        value={formattedValue}
        flashDirection={flashDirection}
        className="text-sm font-medium text-[var(--text-primary)] tabular-nums"
      />
    </div>
  );
}
