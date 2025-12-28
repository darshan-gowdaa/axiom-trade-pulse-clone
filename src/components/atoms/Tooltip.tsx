'use client';

import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tooltipVariants = cva(
    'fixed z-[9999] px-2 py-1.5 text-xs font-medium text-white bg-[#1a1b23] border border-[#2a2a38] rounded-md shadow-lg whitespace-nowrap pointer-events-none transition-opacity duration-150',
    {
        variants: {
            position: {
                top: '-translate-x-1/2 -translate-y-[calc(100%+4px)]',
                right: 'translate-x-2 -translate-y-1/2',
                'bottom-left': 'translate-y-2',
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
    containerClassName?: string;
    delay?: number;
}

export function Tooltip({
    content,
    children,
    position = 'top',
    className,
    containerClassName,
    delay = 200,
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const updatePosition = useCallback(() => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();

        let top = 0;
        let left = 0;

        switch (position) {
            case 'top':
                top = rect.top;
                left = rect.left + rect.width / 2;
                break;
            case 'right':
                top = rect.top + rect.height / 2;
                left = rect.right;
                break;
            case 'bottom-left':
                top = rect.bottom;
                left = rect.left + rect.width;
                break;
            default:
                top = rect.top;
                left = rect.left + rect.width / 2;
        }

        setCoords({ top, left });
    }, [position]);

    const showTooltip = useCallback(() => {
        updatePosition();
        timeoutRef.current = setTimeout(() => {
            updatePosition(); // Re-calc in case of shifts
            setIsVisible(true);
        }, delay);
    }, [delay, updatePosition]);

    const hideTooltip = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsVisible(false);
    }, []);

    // Handle scroll/resize updates while visible
    useEffect(() => {
        if (isVisible) {
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [isVisible, updatePosition]);

    return (
        <div
            ref={triggerRef}
            className={cn("relative inline-flex", containerClassName)}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}
            {mounted && isVisible && createPortal(
                <div
                    role="tooltip"
                    style={{ top: coords.top, left: coords.left }}
                    className={cn(
                        tooltipVariants({ position }),
                        isVisible ? 'opacity-100' : 'opacity-0',
                        className
                    )}
                >
                    {content}
                </div>,
                document.body
            )}
        </div>
    );
}

