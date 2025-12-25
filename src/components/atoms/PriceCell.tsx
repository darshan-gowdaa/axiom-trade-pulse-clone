'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PriceCellProps {
  value: string;
  flashDirection?: 'up' | 'down' | null;
  className?: string;
}

export function PriceCell({ value, flashDirection, className }: PriceCellProps) {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (flashDirection) {
      setIsFlashing(true);
      const timer = setTimeout(() => setIsFlashing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [flashDirection, value]);

  return (
    <span
      className={cn(
        'transition-colors duration-300 rounded px-1',
        isFlashing && flashDirection === 'up' && 'flash-up',
        isFlashing && flashDirection === 'down' && 'flash-down',
        className
      )}
    >
      {value}
    </span>
  );
}
