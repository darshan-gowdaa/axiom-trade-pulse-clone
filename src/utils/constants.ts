import { type FilterPreset } from '@/types';


export const DEFAULT_PRESETS: Record<string, FilterPreset[]> = {
  newPairs: [
    { id: 'p1', name: 'P1', minMarketCap: 0, maxMarketCap: 50000 },
    { id: 'p2', name: 'P2', minMarketCap: 50000, maxMarketCap: 100000 },
    { id: 'p3', name: 'P3', minMarketCap: 100000 },
  ],
  finalStretch: [
    { id: 'p1', name: 'P1', minBondingProgress: 80 },
    { id: 'p2', name: 'P2', minBondingProgress: 90 },
    { id: 'p3', name: 'P3', minBondingProgress: 95 },
  ],
  migrated: [
    { id: 'p1', name: 'P1', minMarketCap: 100000 },
    { id: 'p2', name: 'P2', minMarketCap: 500000 },
    { id: 'p3', name: 'P3', minMarketCap: 1000000 },
  ],
};


export const NAV_LINKS = [
  { href: '/discover', label: 'Discover', active: false },
  { href: '/pulse', label: 'Pulse', active: true },
  { href: '/trackers', label: 'Trackers', active: false },
  { href: '/perpetuals', label: 'Perpetuals', active: false },
  { href: '/yield', label: 'Yield', active: false },
  { href: '/vision', label: 'Vision', active: false },
  { href: '/portfolio', label: 'Portfolio', active: false },
  { href: '/rewards', label: 'Rewards', active: false },
] as const;


export const PULSE_TABS: { id: 'newPairs' | 'finalStretch' | 'migrated'; label: string }[] = [
  { id: 'newPairs', label: 'New Pairs' },
  { id: 'finalStretch', label: 'Final Stretch' },
  { id: 'migrated', label: 'Migrated' },
];


export const CHAINS = [
  { id: 'sol', name: 'SOL', icon: '◎' },
  { id: 'bnb', name: 'BNB', icon: '🟡' },
] as const;


export const WS_UPDATE_INTERVAL = 2000;


export const INITIAL_TOKENS_COUNT = 25;


export const VIRTUAL_SCROLL_OVERSCAN = 5;


export const ANIMATION = {
  PRICE_FLASH: 300,
  FADE_IN: 200,
  HOVER: 150,
} as const;


export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
