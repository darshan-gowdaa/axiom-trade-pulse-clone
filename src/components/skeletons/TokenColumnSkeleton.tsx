'use client';

import { TokenCardSkeleton } from '@/components/atoms';

interface TokenColumnSkeletonProps {
    className?: string;
}

export function TokenColumnSkeleton({ className }: TokenColumnSkeletonProps) {
    return (
        <div className={`w-full flex flex-col h-full min-h-0 bg-[#101114] border-r border-[#1a1b2f] ${className || ''}`}>
            <div className="hidden lg:flex items-center justify-between px-3 py-1.5 border-b border-[#1a1a1f] bg-[#0c0c10] sticky top-0 z-10 mb-0.5 animate-pulse">
                <div className="h-4 w-24 bg-[#1a1b23] rounded" />
                <div className="flex items-center gap-2">
                    <div className="h-6 w-32 bg-[#1a1b23] rounded-full" />
                    <div className="w-5 h-5 bg-[#1a1b23] rounded" />
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                    <TokenCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
