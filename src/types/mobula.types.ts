/**
 * Mobula Pulse Stream v2 API Types
 * Based on: https://docs.mobula.io/indexing-stream/stream/websocket/pulse-stream-v2
 */

// ─── Token Data (nested "token" object in API response) ────────────────────

export interface MobulaTokenData {
  address: string;
  chainId: string;
  symbol: string | null;
  name: string | null;
  decimals: number;
  id?: number | null;
  price: number;
  priceToken: number;
  priceTokenString: string;
  approximateReserveUSD: number;
  approximateReserveTokenRaw: string;
  approximateReserveToken: number;
  totalSupply: number;
  circulatingSupply: number;
  marketCap?: number;
  marketCapDiluted?: number;
  logo: string | null;
  originLogoUrl: string | null;
  exchange: {
    name: string;
    logo: string;
  };
  factory?: string | null;
  source: string | null;
  sourceFactory?: string | null;
  liquidity: number;
  liquidityMax?: number;
  bonded?: boolean;
  bondingPercentage?: number;
  bondingCurveAddress?: string | null;
  preBondingFactory?: string;
  poolAddress?: string;
  blockchain: string;
  type: string;
  createdAt: string | null;
  bonded_at: string | null;
  deployer: string | null;
  ath: number;
  atl: number;
  athDate: string | null;
  atlDate: string | null;
  holdersCount: number;
  top10HoldingsPercentage?: number;
  top50HoldingsPercentage?: number;
  top100HoldingsPercentage?: number;
  top200HoldingsPercentage?: number;
  devHoldingsPercentage?: number;
  insidersHoldingsPercentage?: number;
  bundlersHoldingsPercentage?: number;
  snipersHoldingsPercentage?: number;
  proTradersHoldingsPercentage?: number;
  freshTradersHoldingsPercentage?: number;
  smartTradersHoldingsPercentage?: number;
  insidersCount: number;
  bundlersCount: number;
  snipersCount: number;
  freshTradersCount: number;
  proTradersCount: number;
  smartTradersCount: number;
  freshTradersBuys: number;
  proTradersBuys: number;
  smartTradersBuys: number;
}

// ─── Security Flags ────────────────────────────────────────────────────────

export interface MobulaSecurityFlags {
  mintDisabled?: boolean;
  freezeDisabled?: boolean;
  lpLocked?: boolean;
  honeypot?: boolean;
  [key: string]: boolean | undefined;
}

// ─── Socials ───────────────────────────────────────────────────────────────

export interface MobulaSocials {
  twitter: string | null;
  website: string | null;
  telegram: string | null;
  others: Record<string, unknown> | null;
  uri?: string;
}

// ─── Holder Entry ──────────────────────────────────────────────────────────

export interface MobulaHolder {
  address: string;
  balance: number;
  nativeBalance: number;
  balanceUsd: number;
  boughtAmount: number;
  soldAmount: number;
  pnl: number;
}

// ─── Full Token Data Schema (each entry in views) ──────────────────────────

export interface MobulaTokenDataSchema {
  token: MobulaTokenData;

  // Timestamps
  created_at: string | null;
  latest_trade_date: string | null;

  // Current Price
  latest_price: number;

  // Price Changes
  price_change_1min: number;
  price_change_5min: number;
  price_change_1h: number;
  price_change_4h: number;
  price_change_6h: number;
  price_change_12h: number;
  price_change_24h: number;

  // Historical Prices
  price_1min_ago: number;
  price_5min_ago: number;
  price_1h_ago: number;
  price_4h_ago: number;
  price_6h_ago: number;
  price_12h_ago: number;
  price_24h_ago: number;

  // Market Data
  market_cap: number;
  latest_market_cap: number;

  // Volume Data
  volume_1min: number;
  volume_5min: number;
  volume_15min: number;
  volume_1h: number;
  volume_4h: number;
  volume_6h: number;
  volume_12h: number;
  volume_24h: number;

  // Volume Buy/Sell
  volume_buy_1min?: number;
  volume_buy_5min?: number;
  volume_buy_15min?: number;
  volume_buy_1h?: number;
  volume_buy_4h?: number;
  volume_buy_6h?: number;
  volume_buy_12h?: number;
  volume_buy_24h?: number;
  volume_sell_1min?: number;
  volume_sell_5min?: number;
  volume_sell_15min?: number;
  volume_sell_1h?: number;
  volume_sell_4h?: number;
  volume_sell_6h?: number;
  volume_sell_12h?: number;
  volume_sell_24h?: number;

  // Trading Activity
  trades_1min: number;
  trades_5min: number;
  trades_15min: number;
  trades_1h: number;
  trades_4h: number;
  trades_6h: number;
  trades_12h: number;
  trades_24h: number;

  // Buy/Sell Breakdown
  buys_1min: number;
  buys_5min: number;
  buys_15min: number;
  buys_1h: number;
  buys_4h: number;
  buys_6h: number;
  buys_12h: number;
  buys_24h: number;
  sells_1min: number;
  sells_5min: number;
  sells_15min: number;
  sells_1h: number;
  sells_4h: number;
  sells_6h: number;
  sells_12h: number;
  sells_24h: number;

  // Unique Participants
  buyers_1h?: number;
  sellers_1h?: number;
  traders_1h?: number;

  // Fees
  totalFeesPaidUSD?: number;

  // Social & Metadata
  description: string | null;
  socials: MobulaSocials;
  security: MobulaSecurityFlags | null;

  // Additional Metadata
  bonded_at: string | null;
  twitterReusesCount?: number;
  twitterRenameCount?: number;
  deployerMigrationsCount?: number;
  dexscreenerListed?: boolean | null;

  // Holders
  holders_list?: MobulaHolder[];
}

// ─── WebSocket Message Types ───────────────────────────────────────────────

export interface MobulaInitMessage {
  type: 'init';
  payload: Record<string, { data: MobulaTokenDataSchema[] }>;
}

export interface MobulaNewTokenMessage {
  type: 'new-token';
  payload: {
    viewName: string;
    token: MobulaTokenDataSchema;
  };
}

export interface MobulaUpdateMessage {
  type: 'update';
  payload: Record<string, { data: MobulaTokenDataSchema[] }>;
}

export interface MobulaPingMessage {
  event: 'ping';
}

export type MobulaIncomingMessage =
  | MobulaInitMessage
  | MobulaNewTokenMessage
  | MobulaUpdateMessage;

// ─── Subscription Message (sent to server) ─────────────────────────────────

export interface MobulaSubscribePayload {
  type: 'pulse-v2';
  authorization: string;
  payload: {
    model?: 'default';
    assetMode: boolean;
    chainId: string[];
    poolTypes: string[];
    compressed: boolean;
    views?: MobulaViewConfig[];
  };
}

export interface MobulaViewConfig {
  name: string;
  chainId: string[];
  poolTypes: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  limit: number;
  filters?: Record<string, Record<string, number | boolean | string>>;
}

export interface MobulaPauseMessage {
  type: 'pulse-pause';
  payload: {
    action: 'pause' | 'unpause';
    views: string[];
  };
}
