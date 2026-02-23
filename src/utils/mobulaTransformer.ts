import { type MobulaTokenDataSchema } from '@/types/mobula.types';
import { type Token, type TokenStatus } from '@/types/token.types';

/**
 * Maps a Mobula view name to the app's internal TokenStatus.
 */
const VIEW_TO_STATUS: Record<string, TokenStatus> = {
  new: 'new',
  bonding: 'finalStretch',
  bonded: 'migrated',
};

/**
 * Transforms a Mobula API token data schema into the app's Token interface.
 * This is the single source of truth for mapping API data → UI data.
 */
export function transformMobulaToken(
  data: MobulaTokenDataSchema,
  viewName: string
): Token {
  const t = data.token;
  const status = VIEW_TO_STATUS[viewName] || 'new';

  return {
    // Core identity
    id: t.address,
    address: t.address,
    name: t.name || 'Unknown',
    symbol: t.symbol || '???',
    imageUrl: t.logo || t.originLogoUrl || `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(t.address)}`,

    // Market data
    marketCap: data.market_cap || data.latest_market_cap || t.marketCap || 0,
    volume24h: data.volume_24h || 0,
    txCount: data.trades_1h || 0,
    priceInSol: data.latest_price || t.price || 0,
    priceChange24h: data.price_change_24h || 0,
    bondingCurveProgress: t.bondingPercentage ?? (t.bonded ? 100 : 0),

    // Timestamps
    createdAt: data.created_at ? new Date(data.created_at).getTime() : Date.now(),

    // Socials
    socials: {
      twitter: data.socials?.twitter || undefined,
      telegram: data.socials?.telegram || undefined,
      website: data.socials?.website || undefined,
      discord: (data.socials?.others as Record<string, string>)?.discord || undefined,
    },

    // Safety/Security
    safety: {
      isVerified: data.dexscreenerListed === true,
      auditScore: computeAuditScore(data),
      liquidityLocked: data.security?.lpLocked ?? false,
      contractRenounced: data.security?.mintDisabled ?? false,
    },

    // Status
    status,

    // Extended real API fields
    chainId: t.chainId,
    liquidity: t.liquidity,
    bonded: t.bonded,
    holdersCount: t.holdersCount,
    priceChange1h: data.price_change_1h,
    priceChange5m: data.price_change_5min,
    volume1h: data.volume_1h,
    buys1h: data.buys_1h,
    sells1h: data.sells_1h,
    volume5m: data.volume_5min,
    trades5m: data.trades_5min,
    deployer: t.deployer || undefined,
    source: t.source || undefined,
    description: data.description || undefined,
    logoUrl: t.logo || t.originLogoUrl || undefined,

    // Holder breakdown
    smartTradersCount: t.smartTradersCount,
    snipersCount: t.snipersCount,
    freshTradersCount: t.freshTradersCount,
    insidersCount: t.insidersCount,
  };
}

/**
 * Compute a simple audit score (0-100) from available security flags.
 */
function computeAuditScore(data: MobulaTokenDataSchema): number {
  if (!data.security) return 0;

  let score = 0;
  if (data.security.mintDisabled) score += 30;
  if (data.security.freezeDisabled) score += 25;
  if (data.security.lpLocked) score += 30;
  if (!data.security.honeypot) score += 15;

  return score;
}

/**
 * Transforms an array of Mobula tokens for a given view.
 */
export function transformMobulaTokens(
  dataArray: MobulaTokenDataSchema[],
  viewName: string
): Token[] {
  return dataArray.map((d) => transformMobulaToken(d, viewName));
}
