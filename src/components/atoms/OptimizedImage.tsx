'use client';

import Image from 'next/image';
import { useState, memo } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    priority?: boolean;
    unoptimized?: boolean;
}

function OptimizedImageComponent({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    unoptimized = false,
}: OptimizedImageProps) {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const isExternalUnoptimized =
        unoptimized ||
        (!src.startsWith('/') &&
            !src.includes('axiom.trade') &&
            !src.includes('pollinations.ai') &&
            !src.includes('dicebear.com'));

    if (error) {
        return (
            <div className={`bg-[#1a1b23] flex items-center justify-center ${className}`} style={{ width, height }}>
                <span className="text-[8px] text-[#6b6b7a]">!</span>
            </div>
        );
    }

    return (
        <div className="relative" style={{ width, height }}>
            {!loaded && (
                <div className="absolute inset-0 bg-[#1a1b23] animate-pulse rounded-sm" style={{ width, height }} />
            )}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                loading={priority ? 'eager' : 'lazy'}
                priority={priority}
                unoptimized={isExternalUnoptimized}
            />
        </div>
    );
}

export const OptimizedImage = memo(OptimizedImageComponent);
