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

export function TokenCardSkeleton() {
  return (
    <div className="relative flex items-center px-2 lg:px-3 py-2 border-b border-[#1a1b23] bg-transparent gap-2 min-h-[64px]">
      {/* Avatar */}
      <Skeleton variant="circular" className="w-10 h-10 shrink-0" />

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1 justify-center">
        {/* Top row: name + metrics */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col min-w-0 pr-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-2.5 w-10" />
            </div>
            <div className="flex items-center gap-1 mt-[1px]">
              <Skeleton className="h-2.5 w-8" />
              <Skeleton variant="circular" className="h-2.5 w-2.5" />
              <Skeleton className="h-2.5 w-16" />
            </div>
          </div>

          {/* MC + Volume */}
          <div className="flex flex-col items-end gap-[1px] shrink-0">
            <div className="flex items-center gap-[3px]">
              <Skeleton className="h-2 w-4" />
              <Skeleton className="h-3 w-10" />
            </div>
            <div className="flex items-center gap-[3px] -mt-1">
              <Skeleton className="h-2 w-3" />
              <Skeleton className="h-3 w-10" />
            </div>
          </div>
        </div>

        {/* Middle row: F TX */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1" />
          <div className="flex items-center gap-1 shrink-0 -mt-1">
            <Skeleton className="h-2 w-12" />
            <Skeleton className="h-2 w-8" />
            <Skeleton className="h-[2px] w-5" />
          </div>
        </div>

        {/* Bottom row: metrics + button */}
        <div className="flex items-center justify-between gap-2 -mt-1">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-8 rounded" />
            <Skeleton className="h-4 w-8 rounded" />
            <Skeleton className="h-4 w-8 rounded" />
          </div>
          <Skeleton variant="rectangular" className="h-5 w-14 rounded-xl shrink-0" />
        </div>
      </div>
    </div>
  );
}
