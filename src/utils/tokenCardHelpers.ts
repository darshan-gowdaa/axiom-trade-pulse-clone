'use client';

import React from 'react';
import {
  RiGlobalLine,
  RiSendPlaneLine,
  RiTicketLine,
  RiSearchLine,
  RiUserLine,
  RiBarChartLine,
  RiTrophyLine,
  RiGroupLine,
  RiRestaurantLine,
  RiCrosshair2Line,
  RiGhostLine,
} from '@remixicon/react';

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

export const randomInRange = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateTopMetrics = (): MetricData[] =>
  [
    { icon: React.createElement(RiGlobalLine, { className: 'w-[12px] h-[12px]' }), count: randomInRange(10, 99) },
    { icon: React.createElement(RiSendPlaneLine, { className: 'w-[12px] h-[12px]' }), count: randomInRange(10, 99) },
    { icon: React.createElement(RiTicketLine, { className: 'w-[12px] h-[12px]' }), count: randomInRange(10, 99) },
    { icon: React.createElement(RiSearchLine, { className: 'w-[12px] h-[12px]' }), count: randomInRange(10, 99) },
    { icon: React.createElement(RiUserLine, { className: 'w-[12px] h-[12px]' }), count: randomInRange(10, 99) },
    { icon: React.createElement(RiBarChartLine, { className: 'w-[12px] h-[12px]' }), count: randomInRange(10, 99) },
    {
      icon: React.createElement(RiTrophyLine, { className: 'w-[12px] h-[12px]' }),
      count: `${randomInRange(0, 20)}/${randomInRange(20, 110)}`,
    },
  ]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

export const generateBottomMetrics = (): MetricData[] =>
  [
    { icon: React.createElement(RiGroupLine, { className: 'w-[10px] h-[10px]' }), suffix: '%', val: randomInRange(10, 99) },
    { icon: React.createElement(RiRestaurantLine, { className: 'w-[10px] h-[10px]' }), suffix: '', val: '', isTime: true },
    { icon: React.createElement(RiCrosshair2Line, { className: 'w-[10px] h-[10px]' }), suffix: '%', val: randomInRange(10, 99) },
    { icon: React.createElement(RiGhostLine, { className: 'w-[10px] h-[10px]' }), suffix: '%', val: randomInRange(10, 99) },
  ].map((m) => ({
    ...m,
    color: Math.random() > 0.5 ? '#16a34a' : '#ef4444',
  }));

export const generateBarWidths = (): BarWidths => {
  const green = randomInRange(10, 90);
  return { green, red: 100 - green };
};

export const generateInitialTimeState = (): TimeState => ({ val: 5, unit: 's' });

export const updateTimeState = (prev: TimeState): TimeState => {
  let newVal = prev.val + randomInRange(1, 5);
  let newUnit = prev.unit;

  if (newUnit === 's' && newVal > 59) {
    newVal = 1;
    newUnit = 'm';
  } else if (newUnit === 'm' && newVal > 59) {
    newVal = 1;
    newUnit = 'h';
  }

  return { val: newVal, unit: newUnit };
};

export const getRingColor = (tokenId: string): string => 
  RING_COLORS[tokenId.charCodeAt(0) % RING_COLORS.length];

export const getMarketCapColor = (marketCap: number): string => {
  if (marketCap > 2000000) return '#16a34a'; // Green
  if (marketCap > 1000000) return '#d6bc3a'; // Yellow
  return '#52c5ff'; // Blue
};

export const generateFeeValue = (): string => {
  const subscriptDigit = randomInRange(2, 4);
  const subscriptMap: Record<number, string> = {
    2: '₂',
    3: '₃',
    4: '₄',
  };
  const lastDigit = randomInRange(1, 9);
  return `0.00${subscriptMap[subscriptDigit]}${lastDigit}`;
};

export const generateUserIconColor = (): string => 
  Math.random() > 0.5 ? '#51c4fe' : '#777a8c';
