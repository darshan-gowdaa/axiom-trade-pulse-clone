'use client';

import { useEffect, useLayoutEffect, useRef, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from './useRedux';
import { updateTokenPrice, clearPriceFlash, addToken } from '@/store/tokenSlice';
import { type Token, type TokenStatus } from '@/types';
import type { MobulaInitMessage, MobulaNewTokenMessage, MobulaSubscribePayload, MobulaTokenDataSchema } from '@/types/mobula.types';
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

declare global {
  interface Window {
    mobulaWs?: WebSocket | null;
    mobulaWsQueue?: MessageEvent[];
    mobulaWsHandler?: ((ev: MessageEvent) => void) | null;
    mobulaWsPingInterval?: NodeJS.Timeout | number | null;
  }
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
   * Centralized function to update/move tokens in the query cache.
   * This handles merging partial updates with existing data from ANY list.
   */
  const updateTokensInLists = useCallback(
    (rawUpdates: { data: MobulaTokenDataSchema, viewName: string }[]) => {
      const allStatuses: TokenStatus[] = ['new', 'finalStretch', 'migrated'];

      // 1. First, get a map of ALL existing tokens across ALL lists to find the best source for merging
      const globalExistingMap = new Map<string, Token>();
      allStatuses.forEach(status => {
        const list = queryClient.getQueryData<Token[]>(['tokens', status]) || [];
        list.forEach(t => {
          if (!globalExistingMap.has(t.id)) {
            globalExistingMap.set(t.id, t);
          }
        });
      });

      // 2. Transform the raw updates into full Token objects using the best existing data
      const transformedUpdates = rawUpdates.map(({ data, viewName }) => {
        const address = data.token?.address;
        const existing = address ? globalExistingMap.get(address) : undefined;
        return transformMobulaToken(data, viewName, existing);
      });

      // 3. Update each list
      allStatuses.forEach((status) => {
        queryClient.setQueryData<Token[]>(['tokens', status], (old = []) => {
          const tokenMap = new Map(old.map((t) => [t.id, t]));
          let hasChanged = false;

          transformedUpdates.forEach((token) => {
            const exists = tokenMap.has(token.id);

            if (token.status === status) {
              // Should be in this list
              const existingToken = tokenMap.get(token.id);
              // Only update if it's different or doesn't exist
              if (!existingToken || JSON.stringify(existingToken) !== JSON.stringify(token)) {
                tokenMap.set(token.id, token);
                hasChanged = true;
              }
            } else if (exists) {
              // Should NOT be in this list - remove if present
              tokenMap.delete(token.id);
              hasChanged = true;
            }
          });

          if (!hasChanged) return old;

          // Rebuild ordered list preserving existing order
          const finalTokens: Token[] = [];
          old.forEach(oldT => {
            if (tokenMap.has(oldT.id)) {
              finalTokens.push(tokenMap.get(oldT.id)!);
              tokenMap.delete(oldT.id);
            }
          });

          // Add remaining NEW tokens (ones that weren't in 'old') to the front
          const newTokensToAdd: Token[] = [];
          transformedUpdates.forEach(newT => {
            if (tokenMap.has(newT.id) && newT.status === status) {
              newTokensToAdd.push(newT);
              tokenMap.delete(newT.id);
            }
          });
          finalTokens.unshift(...newTokensToAdd);

          return finalTokens;
        });
      });

      // 4. Return the updates for other uses (like price flash)
      return transformedUpdates;
    },
    [queryClient]
  );

  /**
   * Handle the "init" message — populates all 3 columns with initial data.
   */
  const handleInit = useCallback(
    (msg: MobulaInitMessage) => {
      const payload = msg.payload;
      for (const [viewName, viewData] of Object.entries(payload)) {
        const status = MOBULA_VIEW_TO_STATUS[viewName] as TokenStatus | undefined;
        if (!status || !viewData?.data) continue;

        const tokens = transformMobulaTokens(viewData.data, viewName);
        // Deduplicate by token ID (address)
        const seen = new Set();
        const uniqueTokens = tokens.filter(t => {
          if (seen.has(t.id)) return false;
          seen.add(t.id);
          return true;
        });

        queryClient.setQueryData<Token[]>(['tokens', status], uniqueTokens);
      }

    },
    [queryClient]
  );

  /**
   * Handle "new-token" message.
   */
  const handleNewToken = useCallback(
    (msg: MobulaNewTokenMessage) => {
      const { viewName, token: tokenData } = msg.payload;
      if (!tokenData) return;

      const [newToken] = updateTokensInLists([{ data: tokenData, viewName }]);
      dispatch(addToken({ status: newToken.status, token: newToken }));
    },
    [dispatch, updateTokensInLists]
  );

  /**
   * Handle "update" messages — batch updates.
   */
  const handleUpdate = useCallback(
    (payload: Record<string, { data: MobulaTokenDataSchema[] }>) => {
      const allRawUpdates: { data: MobulaTokenDataSchema, viewName: string }[] = [];

      for (const [viewName, viewData] of Object.entries(payload)) {
        if (!viewData?.data) continue;
        viewData.data.forEach(d => {
          allRawUpdates.push({ data: d, viewName });
        });
      }

      if (allRawUpdates.length > 0) {
        updateTokensInLists(allRawUpdates);
      }
    },
    [updateTokensInLists]
  );

  /**
   * Handle "update-token" messages — real-time per-token updates.
   */
  const handleUpdateToken = useCallback(
    (msg: MobulaNewTokenMessage) => {
      const { viewName, token: tokenData } = msg.payload;
      if (!tokenData) return;

      // Find current version to check for price change
      const address = tokenData.token?.address;
      const allStatuses: TokenStatus[] = ['new', 'finalStretch', 'migrated'];
      let existing: Token | undefined;

      for (const s of allStatuses) {
        const list = queryClient.getQueryData<Token[]>(['tokens', s]);
        existing = list?.find(t => t.id === address);
        if (existing) break;
      }

      const [updatedToken] = updateTokensInLists([{ data: tokenData, viewName }]);

      // Price flash logic
      if (existing && existing.priceInSol !== updatedToken.priceInSol) {
        dispatch(
          updateTokenPrice({
            tokenId: updatedToken.id,
            status: updatedToken.status,
            newPrice: updatedToken.priceInSol,
            oldPrice: existing.priceInSol,
          })
        );
        setTimeout(() => {
          dispatch(clearPriceFlash(updatedToken.id));
        }, 300);
      }
    },
    [queryClient, dispatch, updateTokensInLists]
  );

  /**
   * Handle "remove-token" messages.
   */
  const handleRemoveToken = useCallback(
    (msg: { payload: { viewName: string; token: { token: { address: string } } } }) => {
      const { viewName, token: tokenData } = msg.payload;
      const status = MOBULA_VIEW_TO_STATUS[viewName] as TokenStatus | undefined;
      if (!status) return;

      const address = tokenData?.token?.address;
      if (!address) return;

      queryClient.setQueryData<Token[]>(['tokens', status], (old) => {
        if (!old) return [];
        return old.filter((t) => t.id !== address);
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
      } catch {
        // ignore parse errors silently
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

      if (typeof window !== 'undefined') {
        window.mobulaWsHandler = null;
        if (window.mobulaWs === wsRef.current) {
          window.mobulaWs = null;
        }
        if (window.mobulaWsPingInterval) {
            clearInterval(window.mobulaWsPingInterval as NodeJS.Timeout);
            window.mobulaWsPingInterval = null;
        }
      }

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

      return;
    }

    try {
      let ws: WebSocket;
      const isPreInitialized = typeof window !== 'undefined' && window.mobulaWs && window.mobulaWs.readyState !== WebSocket.CLOSED;

      if (isPreInitialized && window.mobulaWs) {

        ws = window.mobulaWs;
        wsRef.current = ws;

        // If it was already open, we're already connected
        if (ws.readyState === WebSocket.OPEN) {
          setState({
            isConnected: true,
            error: null,
            reconnectAttempts: 0,
          });

          // Resend subscription to assure correct chain parameters just in case
          const subscription = buildSubscription();
          ws.send(JSON.stringify(subscription));

          startPing(ws);
        }
      } else {
        ws = new WebSocket(MOBULA_WS_URL);
        wsRef.current = ws;
      }

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


      };

      ws.onmessage = handleMessage;
      
      if (typeof window !== 'undefined') {
        window.mobulaWsHandler = handleMessage;
        
        // Process queued messages
        if (window.mobulaWsQueue && window.mobulaWsQueue.length > 0) {

          window.mobulaWsQueue.forEach(msg => handleMessage(msg));
          window.mobulaWsQueue = [];
        }
      }

      ws.onerror = () => {
        // Log only — onclose fires right after and handles reconnect logic
      };

      ws.onclose = () => {
        if (!mountedRef.current) return;



        setState((prev) => {
          const nextAttempts = prev.reconnectAttempts + 1;
          const shouldReconnect = nextAttempts <= WS_MAX_RECONNECT_ATTEMPTS;

          if (shouldReconnect) {
            const delay = WS_RECONNECT_DELAY * Math.min(nextAttempts, 5);

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
    } catch {
      // silent fallback handled in state
      if (mountedRef.current) {
        setState((prev) => ({
          ...prev,
          error: 'Failed to connect to Mobula. Please check your network connection.',
          isConnected: false,
        }));
      }
    }
  }, [cleanup, buildSubscription, startPing, handleMessage]);

  // Use useLayoutEffect to start WebSocket connection BEFORE browser paint
  // This fires synchronously after DOM mutations, saving ~16-32ms vs useEffect
  // which defers until after paint
  useLayoutEffect(() => {
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
