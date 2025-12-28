'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from './useRedux';
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
  const queryClient = useQueryClient();
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const simulatePriceUpdate = useCallback(() => {
    // Get current data from cache
    const newPairs = queryClient.getQueryData<Token[]>(['tokens', 'new']) || [];
    const finalStretch = queryClient.getQueryData<Token[]>(['tokens', 'finalStretch']) || [];
    const migrated = queryClient.getQueryData<Token[]>(['tokens', 'migrated']) || [];

    const allTokenArrays: { tokens: Token[]; status: TokenStatus }[] = [
      { tokens: newPairs, status: 'new' },
      { tokens: finalStretch, status: 'finalStretch' },
      { tokens: migrated, status: 'migrated' },
    ];

    const nonEmptyArrays = allTokenArrays.filter(a => a.tokens.length > 0);
    if (nonEmptyArrays.length === 0) return;

    const randomArray = nonEmptyArrays[Math.floor(Math.random() * nonEmptyArrays.length)];
    const randomToken = randomArray.tokens[Math.floor(Math.random() * randomArray.tokens.length)];

    const newPrice = generateRandomPriceChange(randomToken.priceInSol);

    // Update Cache
    queryClient.setQueryData<Token[]>(['tokens', randomArray.status], (oldTokens) => {
      if (!oldTokens) return [];
      return oldTokens.map(t => {
        if (t.id === randomToken.id) {
          const change = ((newPrice - randomToken.priceInSol) / randomToken.priceInSol) * 100;
          return {
            ...t,
            priceInSol: newPrice,
            priceChange24h: change,
            marketCap: t.marketCap * (1 + change / 100),
          };
        }
        return t;
      });
    });

    // Update Flash in Redux (UI state)
    const flashDirection = newPrice > randomToken.priceInSol ? 'up' : 'down';
    
    // We need to export a simpler action for just setting flash or keep updateTokenPrice but only for flash?
    // Let's us updateTokenPrice but acknowledge it only affects flash now in the reducer, or creates a new action.
    // Ideally we match the existing reducer signature or change it.
    // For now, let's keep dispatching updateTokenPrice but we will modify the reducer to ONLY update flash.
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
  }, [dispatch, queryClient]);

  const simulateNewToken = useCallback(() => {
    // Occasionally add a new token (10% chance per interval)
    if (Math.random() < 0.1) {
      const newToken = generateNewToken('new');
      
      // Update Cache
      queryClient.setQueryData<Token[]>(['tokens', 'new'], (oldTokens) => {
        return [newToken, ...(oldTokens || [])];
      });
      
      // Dispatch to Redux if needed (currently addToken did both)
      // We will remove the list logic from reducers so this dispatch might become unnecessary 
      // UNLESS addToken does something else? It updated lastUpdated.
      dispatch(addToken({ status: 'new', token: newToken }));
    }
  }, [dispatch, queryClient]);

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
