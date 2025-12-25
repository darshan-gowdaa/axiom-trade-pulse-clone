'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-[#1a1a1f]',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded',
        variant === 'text' && 'rounded h-3',
        className
      )}
    />
  );
}

/**
 * Skeleton for a compact token card
 */
export function TokenCardSkeleton() {
  return (
    <div className="flex items-start gap-2 px-2 py-1.5 border-b border-[#1a1a1f]">
      {/* Avatar */}
      <Skeleton variant="rectangular" className="w-10 h-10 shrink-0" />
      
      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-8" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-2.5 w-16" />
          <Skeleton className="h-2.5 w-12" />
        </div>
      </div>
      
      {/* Metrics */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex flex-col items-end gap-0.5">
          <Skeleton className="h-2 w-6" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <Skeleton className="h-2 w-4" />
          <Skeleton className="h-3 w-10" />
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <Skeleton className="h-2 w-4" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>
      
      {/* Button */}
      <Skeleton variant="rectangular" className="h-6 w-14 rounded" />
    </div>
  );
}
