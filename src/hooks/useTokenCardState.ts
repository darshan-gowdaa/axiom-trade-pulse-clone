'use client';

import { useMemo } from 'react';
import {
  type TimeState,
  type BarWidths,
} from '@/utils/tokenCardHelpers';

interface TokenIdentity {
  name: string;
  symbol: string;
  creator: string;
}

interface UseTokenCardStateProps {
  initialName: string;
  initialSymbol: string;
  initialTxCount: number;
  initialMarketCap: number;
  initialVolume: number;
  deployer?: string;
  buys1h?: number;
  sells1h?: number;
  createdAt?: number;
}

interface TokenCardState {
  tokenIdentity: TokenIdentity;
  txCount: number;
  marketCap: number;
  volume: number;
  barWidths: BarWidths;
  timeState: TimeState;
}

/**
 * Formats a deployer address as "XXXX...XXXX" for display.
 */
function formatDeployer(deployer?: string): string {
  if (deployer && deployer.length > 8) {
    return `${deployer.slice(0, 4)}...${deployer.slice(-4)}`;
  }
  if (deployer) return deployer;

  // Fallback: deterministic creator name based on a simple hash of input to avoid hydration mismatch
  return 'Anon...User';
}

/**
 * Computes how long ago a token was created & returns a TimeState.
 */
function computeTimeState(createdAt?: number, now: number = Date.now()): TimeState {
  if (!createdAt) return { val: 0, unit: 's' };

  const diffMs = Math.max(0, now - createdAt);
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return { val: diffSec, unit: 's' };
  if (diffSec < 3600) return { val: Math.floor(diffSec / 60), unit: 'm' };
  if (diffSec < 86400) return { val: Math.floor(diffSec / 3600), unit: 'h' };
  return { val: Math.floor(diffSec / 86400), unit: 'd' };
}

/**
 * Hook providing token card display state.
 * Now driven by real API data — no more simulation intervals.
 * Values are derived directly from props which are updated by WebSocket.
 */
export function useTokenCardState({
  initialName,
  initialSymbol,
  initialTxCount,
  initialMarketCap,
  initialVolume,
  deployer,
  buys1h,
  sells1h,
  createdAt,
}: UseTokenCardStateProps): TokenCardState {
  // Identity is stable — no more cycling names
  const tokenIdentity = useMemo<TokenIdentity>(() => ({
    name: initialName,
    symbol: initialSymbol,
    creator: formatDeployer(deployer),
  }), [initialName, initialSymbol, deployer]);

  // Use real values directly
  const txCount = initialTxCount;
  const marketCap = initialMarketCap;
  const volume = initialVolume;

  // Bar widths — use real buys/sells ratio if available
  const barWidths = useMemo<BarWidths>(() => {
    if (buys1h !== undefined && sells1h !== undefined) {
      const total = buys1h + sells1h;
      if (total > 0) {
        const green = Math.round((buys1h / total) * 100);
        return { green, red: 100 - green };
      }
    }
    return { green: 50, red: 50 };
  }, [buys1h, sells1h]);

  // Time state — derived from real createdAt
  // Note: For absolute hydration stability, we use Date.now() but the caller
  // should ensure this hook is only consumed or the value is used after mounting.
  const timeState = useMemo<TimeState>(() => computeTimeState(createdAt), [createdAt]);

  return {
    tokenIdentity,
    txCount,
    marketCap,
    volume,
    barWidths,
    timeState,
  };
}
