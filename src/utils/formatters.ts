import { type Token, type FilterPreset } from '@/types';

export function formatCurrency(value: number, decimals: boolean = true): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(decimals ? 2 : 0)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(decimals ? 2 : 0)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(decimals ? 2 : 0)}K`;
  return `$${value.toFixed(decimals ? 2 : 0)}`;
}

export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

export function formatSol(value: number): string {
  if (value < 0.0001) return '<0.0001 SOL';
  if (value < 1) return `${value.toFixed(4)} SOL`;
  return `${value.toFixed(2)} SOL`;
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
}

export function truncateAddress(address: string, chars: number = 4): string {
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function generateRandomPriceChange(currentPrice: number): number {
  const changePercent = (Math.random() - 0.5) * 0.1;
  return currentPrice * (1 + changePercent);
}

export function applyFilter(tokens: Token[], preset: FilterPreset): Token[] {
  return tokens.filter(token => {
    if (preset.minMarketCap && token.marketCap < preset.minMarketCap) return false;
    if (preset.maxMarketCap && token.marketCap > preset.maxMarketCap) return false;
    if (preset.minVolume && token.volume24h < preset.minVolume) return false;
    if (preset.minTxCount && token.txCount < preset.minTxCount) return false;
    if (preset.minBondingProgress && token.bondingCurveProgress < preset.minBondingProgress) return false;
    if (preset.requireVerified && !token.safety.isVerified) return false;
    return true;
  });
}

export function sortTokens(
  tokens: Token[],
  field: keyof Token | 'createdAt',
  direction: 'asc' | 'desc'
): Token[] {
  return [...tokens].sort((a, b) => {
    const aValue = a[field as keyof Token];
    const bValue = b[field as keyof Token];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
