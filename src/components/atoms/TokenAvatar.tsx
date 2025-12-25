'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TokenAvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  isCircle?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

const sizePx = {
  sm: 24,
  md: 32,
  lg: 40,
};

/**
 * Generates a deterministic color based on the alt text
 */
function getColorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 60%, 50%)`;
}

export function TokenAvatar({
  src,
  alt,
  size = 'md',
  isCircle = false,
  className,
}: TokenAvatarProps) {
  const [hasError, setHasError] = useState(false);
  const fallbackColor = getColorFromString(alt);
  const initial = alt.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        'relative overflow-hidden flex items-center justify-center text-white font-semibold',
        sizeClasses[size],
        isCircle ? 'rounded-full' : 'rounded-md',
        className
      )}
      style={{ backgroundColor: (!src || hasError) ? fallbackColor : 'transparent' }}
    >
      {src && !hasError ? (
        <Image
          src={src}
          alt={alt}
          width={sizePx[size]}
          height={sizePx[size]}
          className={cn('object-cover', isCircle ? 'rounded-full' : 'rounded-md')}
          onError={() => setHasError(true)}
          unoptimized
        />
      ) : (
        <span className="text-xs">{initial}</span>
      )}
    </div>
  );
}
