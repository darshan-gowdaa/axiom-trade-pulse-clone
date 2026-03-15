import { useMemo } from 'react';
import { type Token } from '@/types';

// Helper to parse string values like "$1.5M" to numbers for filtering/sorting
export const parseValue = (val: string | number | undefined): number => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const str = val.toString().toLowerCase()
    .replace(/[$,]/g, '')
    .replace('k', '000')
    .replace('m', '000000');
  return parseFloat(str) || 0;
};

interface UseFilteredTokensProps {
  tokens: Token[];
  searchKeywords?: string;
  excludeKeywords?: string;
  sortBy?: string | null;
  sortOrder?: 'asc' | 'desc';
  minMC?: string;
  maxMC?: string;
  minVol?: string;
  maxVol?: string;
  minTx?: string;
  maxTx?: string;
  activePreset?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  presets: any[];
}

export function useFilteredTokens({
  tokens,
  searchKeywords,
  excludeKeywords,
  sortBy,
  sortOrder,
  minMC,
  maxMC,
  minVol,
  maxVol,
  minTx,
  maxTx,
  activePreset,
  presets,
}: UseFilteredTokensProps): Token[] {

  // deduplicate tokens by ID
  const uniqueTokens = useMemo(() => {
    const seen = new Set();
    return tokens.filter((t) => {
      if (seen.has(t.id)) return false;
      seen.add(t.id);
      return true;
    });
  }, [tokens]);

  const filteredTokens = useMemo(() => {
    return uniqueTokens.filter((token) => {
      // exclude dead tokens
      if (token.marketCap < 1 && token.volume24h < 1 && token.txCount < 1) return false;

      // search
      if (searchKeywords) {
        const searchTerms = searchKeywords.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
        const name = token.name.toLowerCase();
        const symbol = token.symbol.toLowerCase();
        const matchesSearch = searchTerms.length === 0 || searchTerms.some(term =>
          name.includes(term) || symbol.includes(term)
        );
        if (!matchesSearch) return false;
      }

      // exclude
      if (excludeKeywords) {
        const excludeTerms = excludeKeywords.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
        const name = token.name.toLowerCase();
        const symbol = token.symbol.toLowerCase();
        const matchesExclude = excludeTerms.some(term =>
          name.includes(term) || symbol.includes(term)
        );
        if (matchesExclude) return false;
      }

      // range filters
      if (minMC && parseValue(token.marketCap) < parseValue(minMC)) return false;
      if (maxMC && parseValue(token.marketCap) > parseValue(maxMC)) return false;

      if (minVol && parseValue(token.volume24h) < parseValue(minVol)) return false;
      if (maxVol && parseValue(token.volume24h) > parseValue(maxVol)) return false;

      if (minTx && parseValue(token.txCount) < parseValue(minTx)) return false;
      if (maxTx && parseValue(token.txCount) > parseValue(maxTx)) return false;

      // presets
      if (activePreset) {
        const preset = presets.find(p => p.id === activePreset);
        if (preset) {
          if (preset.minMarketCap && token.marketCap < preset.minMarketCap) return false;
          if (preset.maxMarketCap && token.marketCap > preset.maxMarketCap) return false;
          if (preset.minBondingProgress && (token.bondingCurveProgress || 0) < preset.minBondingProgress) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (!sortBy) return 0;

      let valA = 0;
      let valB = 0;

      switch (sortBy) {
        case 'mC':
          valA = parseValue(a.marketCap);
          valB = parseValue(b.marketCap);
          break;
        case 'volume':
          valA = parseValue(a.volume24h);
          valB = parseValue(b.volume24h);
          break;
        case 'tx':
          valA = parseValue(a.txCount);
          valB = parseValue(b.txCount);
          break;
        case 'liquidity':
          valA = parseValue(a.liquidity);
          valB = parseValue(b.liquidity);
          break;
        case 'bondingCurveProgress':
          valA = a.bondingCurveProgress || 0;
          valB = b.bondingCurveProgress || 0;
          break;
      }

      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [
    uniqueTokens, searchKeywords, excludeKeywords, minMC, maxMC, minVol, maxVol, minTx, maxTx,
    activePreset, presets, sortBy, sortOrder
  ]);

  return filteredTokens;
}
