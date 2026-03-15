import { useState, useCallback, useEffect } from 'react';

export function usePrices() {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const fetchPrices = useCallback(async () => {
    try {
      const response = await fetch(`https://api.mobula.io/api/1/market/multi-data?assets=bitcoin,ethereum,solana,binance-coin`);
      const data = await response.json();
      if (data.data) {
        setPrices({
          bitcoin: data.data.bitcoin?.price || 0,
          ethereum: data.data.ethereum?.price || 0,
          solana: data.data.solana?.price || 0,
          'binance-coin': data.data['binance-coin']?.price || 0,
        });
      }
    } catch {
      // Failed to fetch footer prices, fallback handles the UI state silently
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // 30s
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return { prices, loading };
}
