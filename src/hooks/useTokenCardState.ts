'use client';

import { useState, useEffect } from 'react';
import {
  generateTopMetrics,
  generateBottomMetrics,
  generateBarWidths,
  generateInitialTimeState,
  updateTimeState,
  generateFeeValue,
  type MetricData,
  type TimeState,
  type BarWidths,
} from '@/utils/tokenCardHelpers';
import { generateNameAndSymbol, generateCreatorName } from '@/utils/mockData';

interface TokenIdentity {
  name: string;
  symbol: string;
  creator: string;
}

interface UseTokenSimulationProps {
  initialName: string;
  initialSymbol: string;
  initialTxCount: number;
  initialMarketCap: number;
  initialVolume: number;
}

interface TokenSimulationState {
  tokenIdentity: TokenIdentity;
  txCount: number;
  marketCap: number;
  volume: number;
  topMetrics: MetricData[];
  bottomMetrics: MetricData[];
  barWidths: BarWidths;
  timeState: TimeState;
  feeValue: string;
}

export function useTokenCardState({
  initialName,
  initialSymbol,
  initialTxCount,
  initialMarketCap,
  initialVolume,
}: UseTokenSimulationProps): TokenSimulationState {
  const [tokenIdentity, setTokenIdentity] = useState<TokenIdentity>({
    name: initialName,
    symbol: initialSymbol,
    creator: generateCreatorName(),
  });
  const [txCount, setTxCount] = useState(initialTxCount);
  const [marketCap, setMarketCap] = useState(initialMarketCap);
  const [volume, setVolume] = useState(initialVolume);
  const [topMetrics, setTopMetrics] = useState<MetricData[]>(generateTopMetrics);
  const [bottomMetrics, setBottomMetrics] = useState<MetricData[]>(generateBottomMetrics);
  const [barWidths, setBarWidths] = useState<BarWidths>(generateBarWidths);
  const [timeState, setTimeState] = useState<TimeState>(generateInitialTimeState);
  const [feeValue, setFeeValue] = useState<string>(generateFeeValue);


  useEffect(() => {
    const nameInterval = setInterval(() => {
      const { name, symbol } = generateNameAndSymbol();
      setTokenIdentity({ name, symbol, creator: generateCreatorName() });
    }, 7000);

    return () => clearInterval(nameInterval);
  }, []);


  useEffect(() => {
    const txInterval = setInterval(() => {
      setTxCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 1000);

    return () => clearInterval(txInterval);
  }, []);


  useEffect(() => {
    const mcInterval = setInterval(() => {
      setMarketCap((prev) => Math.max(0, prev + prev * (Math.random() * 0.1 - 0.04)));
    }, 3000);

    return () => clearInterval(mcInterval);
  }, []);


  useEffect(() => {
    const volInterval = setInterval(() => {
      setVolume((prev) => Math.max(0, prev + prev * (Math.random() * 0.1 - 0.04)));
    }, 3500);

    return () => clearInterval(volInterval);
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setTopMetrics(generateTopMetrics());
      setBottomMetrics(generateBottomMetrics());
      setTimeState(updateTimeState);
      setBarWidths(generateBarWidths());
      setFeeValue(generateFeeValue());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    tokenIdentity,
    txCount,
    marketCap,
    volume,
    topMetrics,
    bottomMetrics,
    barWidths,
    timeState,
    feeValue,
  };
}
