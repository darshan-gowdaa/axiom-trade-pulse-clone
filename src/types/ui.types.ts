/**
 * Display settings for the Pulse view
 */
export interface DisplaySettings {
  /** Layout style */
  layout: 'compact' | 'comfortable' | 'expanded';
  /** Whether to show the search bar */
  showSearchBar: boolean;
  /** Whether to show decimal values */
  showDecimals: boolean;
  /** Whether to use circular token images */
  circleImages: boolean;
  /** Whether to show social links */
  showSocials: boolean;
  /** Whether to show safety badges */
  showSafetyBadges: boolean;
  /** Whether to show volume metric */
  showVolume: boolean;
  /** Whether to show transaction count */
  showTxCount: boolean;
  /** Whether to show bonding progress */
  showBondingProgress: boolean;
}

/**
 * Sort configuration
 */
export interface SortConfig {
  field: SortField;
  direction: 'asc' | 'desc';
}

/**
 * Available sort fields
 */
export type SortField = 
  | 'marketCap'
  | 'volume24h'
  | 'txCount'
  | 'priceChange24h'
  | 'createdAt'
  | 'bondingCurveProgress';

/**
 * Active column tab (for mobile view)
 */
export type ActiveTab = 'newPairs' | 'finalStretch' | 'migrated';

/**
 * Supported blockchain chains
 */
export type Chain = 'sol' | 'bnb';

/**
 * UI state for the application
 */
export interface UIState {
  displaySettings: DisplaySettings;
  activeTab: ActiveTab;
  sortConfig: Record<ActiveTab, SortConfig>;
  activePresets: Record<ActiveTab, string | null>;
  isDisplaySettingsOpen: boolean;
  isMobile: boolean;
  activeChain: Chain;
  isChainLoading: boolean;
}
