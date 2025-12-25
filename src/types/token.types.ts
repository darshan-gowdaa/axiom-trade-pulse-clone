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
