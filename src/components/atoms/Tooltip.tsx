'use client';

import { useState, useRef, useCallback, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tooltipVariants = cva(
    'absolute z-[9999] px-1 py-0.5 text-[9px] font-medium text-white bg-[#1a1b23] border border-[#2a2a38] rounded-sm shadow-lg whitespace-nowrap pointer-events-none transition-all duration-150 ease-out',
    {
        variants: {
            position: {
                top: 'bottom-full left-1/2 -translate-x-1/2 mb-2 origin-bottom',
                right: 'left-full top-1/2 -translate-y-1/2 ml-2 origin-left',
            },
        },
        defaultVariants: {
            position: 'top',
        },
    }
);

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
    content: ReactNode;
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function Tooltip({
    content,
    children,
    position = 'top',
    className,
    delay = 200,
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showTooltip = useCallback(() => {
        timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    }, [delay]);

    const hideTooltip = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsVisible(false);
    }, []);

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}
            <div
                role="tooltip"
                aria-hidden={!isVisible}
                className={cn(
                    tooltipVariants({ position }),
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
                    className
                )}
            >
                {content}
            </div>
        </div>
    );
}
