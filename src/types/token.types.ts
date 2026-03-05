/**
 * Token interface representing a cryptocurrency token
 * in the Axiom Trade Pulse feed
 */
export interface Token {
  /** Unique identifier for the token */
  id: string;
  /** Contract address on Solana */
  address: string;
  /** Token name */
  name: string;
  /** Token symbol/ticker */
  symbol: string;
  /** URL to token image/logo */
  imageUrl: string;
  /** Market capitalization in USD */
  marketCap: number;
  /** 24h trading volume in USD */
  volume24h: number;
  /** Total number of transactions */
  txCount: number;
  /** Current price in SOL */
  priceInSol: number;
  /** Price change percentage (positive or negative) */
  priceChange24h: number;
  /** Bonding curve progress (0-100) */
  bondingCurveProgress: number;
  /** Timestamp when token was created/launched */
  createdAt: number;
  /** Social links */
  socials: TokenSocials;
  /** Safety/audit metrics */
  safety: TokenSafety;
  /** Token status */
  status: TokenStatus;
  // ── Extended fields from real Mobula API ──
  /** Chain identifier (e.g., "solana:solana") */
  chainId?: string;
  /** Liquidity in USD */
  liquidity?: number;
  /** Whether the token is fully bonded */
  bonded?: boolean;
  /** Number of holders */
  holdersCount?: number;
  /** 1h price change % */
  priceChange1h?: number;
  /** 5min price change % */
  priceChange5m?: number;
  /** 1h volume in USD */
  volume1h?: number;
  /** Buy count in 1h */
  buys1h?: number;
  /** Sell count in 1h */
  sells1h?: number;
  /** 5m volume in USD */
  volume5m?: number;
  /** Trades in 5m */
  trades5m?: number;
  /** Deployer address */
  deployer?: string;
  /** Token source (e.g., "pumpfun") */
  source?: string;
  /** Token description */
  description?: string;
  /** Direct logo URL from API */
  logoUrl?: string;
  /** Exchange/source logo URL (e.g. PumpFun pill icon) */
  exchangeLogo?: string;
  /** Exchange/source name (e.g. "PumpFun") */
  exchangeName?: string;

  // Real API holder analysis metrics
  /** Smart traders count */
  smartTradersCount?: number;
  /** Snipers count */
  snipersCount?: number;
  /** Fresh traders count */
  freshTradersCount?: number;
  /** Insiders count */
  insidersCount?: number;
}

/**
 * Social media links for a token
 */
export interface TokenSocials {
  twitter?: string;
  telegram?: string;
  website?: string;
  discord?: string;
}

/**
 * Safety and audit information for a token
 */
export interface TokenSafety {
  /** Whether the token is verified */
  isVerified: boolean;
  /** Audit score (0-100) */
  auditScore: number;
  /** Whether liquidity is locked */
  liquidityLocked: boolean;
  /** Whether contract is renounced */
  contractRenounced: boolean;
}

/**
 * Token lifecycle status
 */
export type TokenStatus = 'new' | 'finalStretch' | 'migrated';

/**
 * Price update event from WebSocket
 */
export interface PriceUpdate {
  tokenId: string;
  newPrice: number;
  oldPrice: number;
  timestamp: number;
}

/**
 * Column type for the pulse view
 */
export type ColumnType = 'newPairs' | 'finalStretch' | 'migrated';

/**
 * Filter preset configuration
 */
export interface FilterPreset {
  id: string;
  name: string;
  minMarketCap?: number;
  maxMarketCap?: number;
  minVolume?: number;
  minTxCount?: number;
  minBondingProgress?: number;
  requireVerified?: boolean;
}
