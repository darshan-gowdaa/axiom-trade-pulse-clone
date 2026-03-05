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
  viewName: string,
  existingToken?: Token
): Token {
  const t = data.token || {};
  const status = VIEW_TO_STATUS[viewName] || 'new';

  return {
    // Core identity
    id: t.address || existingToken?.id || '',
    address: t.address || existingToken?.address || '',
    name: t.name || existingToken?.name || 'Unknown',
    symbol: t.symbol || existingToken?.symbol || '???',
    imageUrl: t.logo || t.originLogoUrl || existingToken?.imageUrl || `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(t.address || 'seed')}`,

    // Market data
    marketCap: data.market_cap || data.latest_market_cap || t.marketCap || existingToken?.marketCap || 0,
    volume24h: data.volume_24h || existingToken?.volume24h || 0,
    txCount: data.trades_1h || existingToken?.txCount || 0,
    priceInSol: data.latest_price || t.price || existingToken?.priceInSol || 0,
    priceChange24h: data.price_change_24h ?? existingToken?.priceChange24h ?? 0,
    bondingCurveProgress: t.bondingPercentage ?? (t.bonded ? 100 : (existingToken?.bondingCurveProgress ?? 0)),

    // Timestamps
    createdAt: data.created_at ? new Date(data.created_at).getTime() : (existingToken?.createdAt || Date.now()),

    // Socials
    socials: {
      twitter: data.socials?.twitter || existingToken?.socials?.twitter,
      telegram: data.socials?.telegram || existingToken?.socials?.telegram,
      website: data.socials?.website || existingToken?.socials?.website,
      discord: (data.socials?.others as Record<string, string>)?.discord || existingToken?.socials?.discord,
    },

    // Safety/Security
    safety: {
      isVerified: data.dexscreenerListed ?? existingToken?.safety?.isVerified ?? false,
      auditScore: data.security ? computeAuditScore(data) : (existingToken?.safety?.auditScore ?? 0),
      liquidityLocked: data.security?.lpLocked ?? existingToken?.safety?.liquidityLocked ?? false,
      contractRenounced: data.security?.mintDisabled ?? existingToken?.safety?.contractRenounced ?? false,
    },

    // Status
    status,

    // Extended real API fields
    chainId: t.chainId || existingToken?.chainId,
    liquidity: t.liquidity || existingToken?.liquidity,
    bonded: t.bonded ?? existingToken?.bonded,
    holdersCount: t.holdersCount ?? existingToken?.holdersCount,
    priceChange1h: data.price_change_1h ?? existingToken?.priceChange1h,
    priceChange5m: data.price_change_5min ?? existingToken?.priceChange5m,
    volume1h: data.volume_1h ?? existingToken?.volume1h,
    buys1h: data.buys_1h ?? existingToken?.buys1h,
    sells1h: data.sells_1h ?? existingToken?.sells1h,
    volume5m: data.volume_5min ?? existingToken?.volume5m,
    trades5m: data.trades_5min ?? existingToken?.trades5m,
    deployer: t.deployer || existingToken?.deployer,
    source: t.source || existingToken?.source,
    description: data.description || existingToken?.description,
    logoUrl: t.logo || t.originLogoUrl || existingToken?.logoUrl,
    exchangeLogo: t.exchange?.logo || existingToken?.exchangeLogo,
    exchangeName: t.exchange?.name || existingToken?.exchangeName,

    // Holder breakdown
    smartTradersCount: t.smartTradersCount ?? existingToken?.smartTradersCount,
    snipersCount: t.snipersCount ?? existingToken?.snipersCount,
    freshTradersCount: t.freshTradersCount ?? existingToken?.freshTradersCount,
    insidersCount: t.insidersCount ?? existingToken?.insidersCount,
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
  viewName: string,
  existingTokens?: Token[]
): Token[] {
  const existingMap = new Map(existingTokens?.map(t => [t.id, t]) || []);
  return dataArray.map((d) => {
    const address = d.token?.address;
    const existing = address ? existingMap.get(address) : undefined;
    return transformMobulaToken(d, viewName, existing);
  });
}
