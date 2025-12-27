'use client';

import { useEffect, useState } from 'react';

interface UseLoadingStateOptions {
  initialLoading?: boolean;
  minLoadingTime?: number;
}

export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const { initialLoading = true, minLoadingTime = 300 } = options;
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [startTime] = useState(Date.now());

  const finishLoading = () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minLoadingTime - elapsed);
    setTimeout(() => setIsLoading(false), remaining);
  };

  return { isLoading, finishLoading, setIsLoading };
}

export function useIntersectionLoader(options: IntersectionObserverInit = {}) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0, ...options }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return { setRef, isVisible };
}

export function prefetchComponent(importFn: () => Promise<unknown>) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => importFn());
  } else {
    setTimeout(() => importFn(), 1);
  }
}

export function usePrefetch(importFns: Array<() => Promise<unknown>>) {
  useEffect(() => {
    importFns.forEach(prefetchComponent);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
