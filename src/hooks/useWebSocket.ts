'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from './useRedux';
import { updateTokenPrice, clearPriceFlash, addToken } from '@/store/tokenSlice';
import { type Token, type TokenStatus } from '@/types';
import type { MobulaInitMessage, MobulaNewTokenMessage, MobulaSubscribePayload } from '@/types/mobula.types';
import { transformMobulaToken, transformMobulaTokens } from '@/utils/mobulaTransformer';
import {
  MOBULA_WS_URL,
  MOBULA_API_KEY,
  CHAIN_ID_MAP,
  POOL_TYPES_MAP,
  MOBULA_VIEW_TO_STATUS,
  WS_RECONNECT_DELAY,
  WS_PING_INTERVAL,
  WS_MAX_RECONNECT_ATTEMPTS,
} from '@/utils/constants';
import type { Chain } from '@/types';

interface WebSocketState {
  isConnected: boolean;
  error: string | null;
  reconnectAttempts: number;
}

/**
 * Defers a callback outside the current React render cycle.
 * This prevents flushSync errors when dispatching to Redux or updating
 * React Query cache from WebSocket message handlers.
 */
function defer(fn: () => void) {
  setTimeout(fn, 0);
}

/**
 * Real-time WebSocket hook connected to Mobula Pulse Stream v2.
 * Handles connection, authentication, message processing,
 * ping/pong keepalive, and auto-reconnect.
 */
export function useMobulaWebSocket(chain: Chain): WebSocketState {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const [state, setState] = useState<WebSocketState>({
    isConnected: false,
    error: null,
    reconnectAttempts: 0,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chainRef = useRef(chain);
  const mountedRef = useRef(true);

  // Keep chain ref in sync
  useEffect(() => {
    chainRef.current = chain;
  }, [chain]);

  /**
   * Build the subscription message for the Mobula API.
   */
  const buildSubscription = useCallback((): MobulaSubscribePayload => {
    const currentChain = chainRef.current;
    return {
      type: 'pulse-v2',
      authorization: MOBULA_API_KEY,
      payload: {
        model: 'default',
        assetMode: true,
        chainId: CHAIN_ID_MAP[currentChain] || CHAIN_ID_MAP.sol,
        poolTypes: POOL_TYPES_MAP[currentChain] || POOL_TYPES_MAP.sol,
        compressed: false,
      },
    };
  }, []);

  /**
   * Handle the "init" message — populates all 3 columns with initial data.
   * Deferred to avoid triggering React state updates during an active render.
   */
  const handleInit = useCallback(
    (msg: MobulaInitMessage) => {
      defer(() => {
        const payload = msg.payload;
        for (const [viewName, viewData] of Object.entries(payload)) {
          const status = MOBULA_VIEW_TO_STATUS[viewName] as TokenStatus | undefined;
          if (!status || !viewData?.data) continue;
          const tokens = transformMobulaTokens(viewData.data, viewName);
          // Deduplicate by token ID (address) — API may send duplicates
          const uniqueTokens = Array.from(
            new Map(tokens.map((t) => [t.id, t])).values()
          );
          queryClient.setQueryData<Token[]>(['tokens', status], uniqueTokens);
        }
        console.log('[Mobula] Initial data loaded successfully');
      });
    },
    [queryClient]
  );

  /**
   * Handle "new-token" message — adds a single new token to a view.
   * Deferred to avoid triggering React state updates during an active render.
   */
  const handleNewToken = useCallback(
    (msg: MobulaNewTokenMessage) => {
      defer(() => {
        const { viewName, token: tokenData } = msg.payload;
        const status = MOBULA_VIEW_TO_STATUS[viewName] as TokenStatus | undefined;
        if (!status || !tokenData) return;

        const newToken = transformMobulaToken(tokenData, viewName);

        // Update cache first
        queryClient.setQueryData<Token[]>(['tokens', status], (old) => {
          if (!old) return [newToken];
          const exists = old.some((t) => t.id === newToken.id);
          if (exists) return old;
          return [newToken, ...old];
        });

        // Dispatch to Redux separately — never inside setQueryData updater
        dispatch(addToken({ status, token: newToken }));
      });
    },
    [queryClient, dispatch]
  );

  /**
   * Handle "update" messages — batch updates of existing tokens in their views.
   * (Kept for backward compatibility, though the API primarily sends "update-token".)
   */
  const handleUpdate = useCallback(
    (payload: Record<string, { data: Array<Record<string, unknown>> }>) => {
      defer(() => {
        for (const [viewName, viewData] of Object.entries(payload)) {
          const status = MOBULA_VIEW_TO_STATUS[viewName] as TokenStatus | undefined;
          if (!status || !viewData?.data) continue;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const updatedTokens = transformMobulaTokens(viewData.data as any, viewName);

          queryClient.setQueryData<Token[]>(['tokens', status], (old) => {
            if (!old) return updatedTokens;

            const updatedMap = new Map(updatedTokens.map((t) => [t.id, t]));
            const existingIds = new Set(old.map((t) => t.id));
            let hasChanges = false;

            const merged = old.map((existing) => {
              const updated = updatedMap.get(existing.id);
              if (updated) {
                updatedMap.delete(existing.id);
                hasChanges = true;
                return updated;
              }
              return existing;
            });

            const newEntries = Array.from(updatedMap.values()).filter(
              (t) => !existingIds.has(t.id)
            );
            if (newEntries.length > 0) hasChanges = true;

            return hasChanges ? [...newEntries, ...merged] : old;
          });
        }
      });
    },
    [queryClient]
  );

  /**
   * Handle "update-token" messages — real-time per-token updates.
   * Same payload format as "new-token": { viewName, token }.
   * This is the primary update mechanism (~5 messages/sec).
   */
  const handleUpdateToken = useCallback(
    (msg: MobulaNewTokenMessage) => {
      defer(() => {
        const { viewName, token: tokenData } = msg.payload;
        const status = MOBULA_VIEW_TO_STATUS[viewName] as TokenStatus | undefined;
        if (!status || !tokenData) return;

        const updatedToken = transformMobulaToken(tokenData, viewName);

        // Collect price change info before updating cache
        let priceChange: { oldPrice: number; newPrice: number } | null = null;

        queryClient.setQueryData<Token[]>(['tokens', status], (old) => {
          if (!old) return [updatedToken];

          let found = false;
          const updated = old.map((existing) => {
            if (existing.id === updatedToken.id) {
              found = true;
              // Track price change for flash animation
              if (existing.priceInSol !== updatedToken.priceInSol) {
                priceChange = {
                  oldPrice: existing.priceInSol,
                  newPrice: updatedToken.priceInSol,
                };
              }
              return updatedToken;
            }
            return existing;
          });

          // If not found in current view, add it (token may have moved views)
          if (!found) return [updatedToken, ...old];
          return updated;
        });

        // Dispatch price flash to Redux AFTER setQueryData
        const pChange = priceChange as { oldPrice: number; newPrice: number } | null;
        if (pChange) {
          dispatch(
            updateTokenPrice({
              tokenId: updatedToken.id,
              status,
              newPrice: pChange.newPrice,
              oldPrice: pChange.oldPrice,
            })
          );
          setTimeout(() => {
            dispatch(clearPriceFlash(updatedToken.id));
          }, 300);
        }
      });
    },
    [queryClient, dispatch]
  );

  /**
   * Handle "remove-token" messages — remove a token from a view.
   */
  const handleRemoveToken = useCallback(
    (msg: { payload: { viewName: string; token: { token: { address: string } } } }) => {
      defer(() => {
        const { viewName, token: tokenData } = msg.payload;
        const status = MOBULA_VIEW_TO_STATUS[viewName] as TokenStatus | undefined;
        if (!status) return;

        const address = tokenData?.token?.address;
        if (!address) return;

        queryClient.setQueryData<Token[]>(['tokens', status], (old) => {
          if (!old) return [];
          return old.filter((t) => t.id !== address);
        });
      });
    },
    [queryClient]
  );

  /**
   * Process incoming WebSocket messages.
   */
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);

        // Ignore pong messages
        if (data.event === 'pong') return;

        switch (data.type) {
          case 'init':
            handleInit(data as MobulaInitMessage);
            break;

          case 'new-token':
            handleNewToken(data as MobulaNewTokenMessage);
            break;

          case 'update-token':
            handleUpdateToken(data as MobulaNewTokenMessage);
            break;

          case 'update':
            handleUpdate(data.payload);
            break;

          case 'remove-token':
            handleRemoveToken(data);
            break;

          default:
            break;
        }
      } catch (err) {
        console.error('[Mobula] Failed to parse message:', err);
      }
    },
    [handleInit, handleNewToken, handleUpdateToken, handleUpdate, handleRemoveToken]
  );

  /**
   * Start/restart ping interval.
   */
  const startPing = useCallback((ws: WebSocket) => {
    if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
    pingIntervalRef.current = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ event: 'ping' }));
      }
    }, WS_PING_INTERVAL);
  }, []);

  /**
   * Clean up connection and timers.
   */
  const cleanup = useCallback(() => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.onopen = null;
      wsRef.current.onmessage = null;
      wsRef.current.onerror = null;
      wsRef.current.onclose = null;
      if (
        wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING
      ) {
        wsRef.current.close();
      }
      wsRef.current = null;
    }
  }, []);

  /**
   * Connect to the Mobula WebSocket.
   */
  const connect = useCallback(() => {
    if (!mountedRef.current) return;

    cleanup();

    if (!MOBULA_API_KEY) {
      setState((prev) => ({
        ...prev,
        error: 'Mobula API key is missing. Check your .env.local file.',
        isConnected: false,
      }));
      console.error('[Mobula] API key is missing. Add NEXT_PUBLIC_MOBULA_API_KEY to .env.local');
      return;
    }

    try {
      const ws = new WebSocket(MOBULA_WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!mountedRef.current) return;

        // Send subscription
        const subscription = buildSubscription();
        ws.send(JSON.stringify(subscription));

        // Start keepalive ping
        startPing(ws);

        setState({
          isConnected: true,
          error: null,
          reconnectAttempts: 0,
        });

        console.log('[Mobula] WebSocket connected. Receiving live token data.');
      };

      ws.onmessage = handleMessage;

      ws.onerror = (err) => {
        // Log only — onclose fires right after and handles reconnect logic
        console.error('[Mobula] WebSocket error:', err);
      };

      ws.onclose = (event) => {
        if (!mountedRef.current) return;

        console.log(`[Mobula] WebSocket closed (code: ${event.code})`);

        setState((prev) => {
          const nextAttempts = prev.reconnectAttempts + 1;
          const shouldReconnect = nextAttempts <= WS_MAX_RECONNECT_ATTEMPTS;

          if (shouldReconnect) {
            const delay = WS_RECONNECT_DELAY * Math.min(nextAttempts, 5);
            console.log(`[Mobula] Reconnecting in ${delay}ms (attempt ${nextAttempts})`);
            reconnectTimeoutRef.current = setTimeout(connect, delay);
          }

          return {
            isConnected: false,
            // Only show an error banner to the user after 3+ failed consecutive
            // reconnects — brief reconnects are normal and expected
            error: !shouldReconnect
              ? 'Connection lost. Unable to reach Mobula. Please refresh the page.'
              : nextAttempts > 3
                ? `Reconnecting to data stream... (attempt ${nextAttempts})`
                : null,
            reconnectAttempts: nextAttempts,
          };
        });
      };
    } catch (err) {
      console.error('[Mobula] Failed to create WebSocket connection:', err);
      if (mountedRef.current) {
        setState((prev) => ({
          ...prev,
          error: 'Failed to connect to Mobula. Please check your network connection.',
          isConnected: false,
        }));
      }
    }
  }, [cleanup, buildSubscription, startPing, handleMessage]);

  // Main effect: connect on mount or when chain changes
  useEffect(() => {
    mountedRef.current = true;

    // Clear existing data when chain switches
    queryClient.setQueryData<Token[]>(['tokens', 'new'], []);
    queryClient.setQueryData<Token[]>(['tokens', 'finalStretch'], []);
    queryClient.setQueryData<Token[]>(['tokens', 'migrated'], []);

    connect();

    return () => {
      mountedRef.current = false;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  return state;
}
