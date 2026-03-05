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
        'bg-[#1a1a1f]',
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
    <div className="relative flex items-start pl-2 lg:pl-3 pr-1 py-2 border-b border-[#1a1b23] bg-transparent gap-2 min-h-[64px] mr-2">
      {/* Avatar block — matches TokenAvatarCard (55x55 square + badge + address) */}
      <div className="shrink-0 w-[55px]">
        <div className="relative w-[55px] h-[55px]">
          {/* Ring border placeholder */}
          <div className="absolute inset-[-2px] rounded-lg border-[1.5px] border-[#2a2a35]" />
          {/* Image area */}
          <Skeleton variant="rectangular" className="absolute inset-[1px] rounded-[6px] h-auto" />
          {/* Exchange badge */}
          <div className="absolute bottom-[-3px] right-[-3px] w-[18px] h-[18px] bg-black rounded-full border-[1.5px] border-[#2a2a35]" />
        </div>
        {/* Creator address */}
        <Skeleton className="h-[8px] w-[42px] mx-auto mt-1.5 rounded" />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1 justify-center">
        {/* Row 1: Name · Symbol · Copy | MC · Vol */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col min-w-0 pr-2">
            {/* Name + Symbol + Copy icon */}
            <div className="flex items-center gap-1.5 min-w-0">
              <Skeleton className="h-[12px] w-[80px]" />
              <Skeleton className="h-[10px] w-[32px]" />
              <Skeleton variant="rectangular" className="h-[10px] w-[10px] shrink-0" />
            </div>
            {/* Row 2: Time · Holders · Smart · Snipers */}
            <div className="flex items-center gap-1 mt-[2px]">
              <Skeleton className="h-[10px] w-[20px]" />
              <Skeleton variant="circular" className="h-[11px] w-[11px]" />
              <Skeleton className="h-[10px] w-[18px]" />
              <Skeleton variant="circular" className="h-[11px] w-[11px]" />
              <Skeleton className="h-[10px] w-[12px]" />
            </div>
          </div>

          {/* MC + Volume (right) */}
          <div className="flex flex-col items-end gap-[1px] shrink-0">
            <div className="flex items-center gap-[3px]">
              <Skeleton className="h-[9px] w-[14px]" />
              <Skeleton className="h-[12px] w-[46px]" />
            </div>
            <div className="flex items-center gap-[3px] -mt-0.5">
              <Skeleton className="h-[9px] w-[8px]" />
              <Skeleton className="h-[12px] w-[46px]" />
            </div>
          </div>
        </div>

        {/* Row 3: Liquidity · N change% | TX · buy/sell bar */}
        <div className="flex items-center justify-between w-full gap-2 -mt-0.5">
          <div className="flex items-center gap-[6px]">
            <Skeleton variant="circular" className="h-3 w-3" />
            <Skeleton className="h-[10px] w-[36px]" />
            <Skeleton className="h-[10px] w-[42px]" />
          </div>
          <div className="flex items-center gap-[6px] shrink-0">
            <Skeleton className="h-[9px] w-[14px]" />
            <Skeleton className="h-[10px] w-[16px]" />
            {/* Buy/sell bar */}
            <div className="flex w-[60px] h-[4px] rounded-[2px] overflow-hidden shrink-0">
              <Skeleton variant="rectangular" className="flex-1 h-full rounded-none" />
            </div>
          </div>
        </div>

        {/* Row 4: Holder % breakdown (5 items) · Quick-buy button */}
        <div className="flex items-center justify-between gap-2 -mt-0.5">
          <div className="flex items-center gap-[7px]">
            {/* 5 holder metric pairs: icon + percentage */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-[2px]">
                <Skeleton variant="circular" className="h-[10px] w-[10px]" />
                <Skeleton className="h-[9px] w-[16px]" />
              </div>
            ))}
          </div>
          {/* Quick-buy button */}
          <Skeleton variant="rectangular" className="h-[18px] w-[54px] rounded-xl shrink-0" />
        </div>
      </div>
    </div>
  );
}
