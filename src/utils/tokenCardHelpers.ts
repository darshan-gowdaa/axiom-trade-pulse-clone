'use client';

export const RING_COLORS = ['#16a34a', '#ef4444', '#fbbf24'];

export interface MetricData {
  icon: React.ReactNode;
  count?: string | number;
  suffix?: string;
  val?: string | number;
  isTime?: boolean;
  color?: string;
}

export interface TimeState {
  val: number;
  unit: 's' | 'm' | 'h' | 'd';
}

export interface BarWidths {
  green: number;
  red: number;
}

export const getRingColor = (tokenId: string): string =>
  RING_COLORS[tokenId.charCodeAt(0) % RING_COLORS.length];

export const getMarketCapColor = (marketCap: number): string => {
  if (marketCap > 2000000) return '#16a34a'; // Green
  if (marketCap > 1000000) return '#d6bc3a'; // Yellow
  return '#52c5ff'; // Blue
};

export const generateUserIconColor = (): string =>
  Math.random() > 0.5 ? '#51c4fe' : '#777a8c';

export function holderPct(count: number | undefined, total: number | undefined): number {
  if (!count || !total || total === 0) return 0;
  return Math.min(Math.round((count / total) * 100), 100);
}

