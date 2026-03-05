import { useQuery } from '@tanstack/react-query';
import { type Token, type TokenStatus } from '@/types';

/**
 * Hook to access token data from the React Query cache.
 * 
 * Data is populated by the Mobula WebSocket connection (useMobulaWebSocket),
 * which writes directly to these query keys via queryClient.setQueryData().
 * 
 * The queryFn returns an empty array as a fallback — the WebSocket's "init"
 * message is the real source of initial data.
 */
export const useTokens = (status: TokenStatus) => {
  return useQuery({
    queryKey: ['tokens', status],
    queryFn: (): Token[] => [],
    initialData: [] as Token[],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
