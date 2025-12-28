'use client';

import { useEffect, useRef, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from './useRedux';
import {
  updateTokenPrice,
  clearPriceFlash,
  addToken,
} from '@/store/tokenSlice';
import { generateRandomPriceChange, WS_UPDATE_INTERVAL, generateNewToken } from '@/utils';
import { type Token, type TokenStatus } from '@/types';

/**
 * Hook to simulate WebSocket price updates
 */
export function useWebSocketSimulation() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => ({
    newPairs: state.tokens.newPairs,
    finalStretch: state.tokens.finalStretch,
    migrated: state.tokens.migrated,
  }), shallowEqual);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const simulatePriceUpdate = useCallback(() => {

    const allTokenArrays: { tokens: Token[]; status: TokenStatus }[] = [
      { tokens: tokens.newPairs, status: 'new' },
      { tokens: tokens.finalStretch, status: 'finalStretch' },
      { tokens: tokens.migrated, status: 'migrated' },
    ];


    const nonEmptyArrays = allTokenArrays.filter(a => a.tokens.length > 0);
    if (nonEmptyArrays.length === 0) return;

    const randomArray = nonEmptyArrays[Math.floor(Math.random() * nonEmptyArrays.length)];
    const randomToken = randomArray.tokens[Math.floor(Math.random() * randomArray.tokens.length)];

    const newPrice = generateRandomPriceChange(randomToken.priceInSol);

    dispatch(
      updateTokenPrice({
        tokenId: randomToken.id,
        status: randomArray.status,
        newPrice,
        oldPrice: randomToken.priceInSol,
      })
    );

    // Clear flash after animation
    setTimeout(() => {
      dispatch(clearPriceFlash(randomToken.id));
    }, 300);
  }, [dispatch, tokens]);

  const simulateNewToken = useCallback(() => {
    // Occasionally add a new token (10% chance per interval)
    if (Math.random() < 0.1) {
      const newToken = generateNewToken('new');
      dispatch(addToken({ status: 'new', token: newToken }));
    }
  }, [dispatch]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      simulatePriceUpdate();
      simulateNewToken();
    }, WS_UPDATE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [simulatePriceUpdate, simulateNewToken]);

  return null;
}
