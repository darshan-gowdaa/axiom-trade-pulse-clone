'use client';

import { default as React, memo, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { type Token } from '@/types';
import { formatCurrency, formatCompactNumber, formatTimeAgo, generateNameAndSymbol, generateCreatorName } from '@/utils';
import { Check, Copy, User, Globe, Trophy, Users, ChefHat, Target, Ghost, Zap, Send, Ticket, BarChart2, Search } from 'lucide-react';
import { SolanaLogo } from '@/components/atoms/SolanaLogo';

interface TokenCardProps {
  token: Token;
  flashDirection?: 'up' | 'down' | null;
  showDecimals?: boolean;
  onQuickBuy?: (token: Token) => void;
}

const RING_COLORS = ['#14f195', '#f87171', '#fbbf24'];

const MetricBlock = ({ icon, text, color = '#777a8c', textClass = 'text-[#fcfcfc]' }: { icon: React.ReactNode, text: string | number, color?: string, textClass?: string }) => (
  <span className="flex items-center gap-1">
    <span style={{ color }}>{icon}</span>
    <span className={textClass}>{text}</span>
  </span>
);

interface MetricData {
  icon: React.ReactNode;
  count?: string | number;
  suffix?: string;
  val?: string | number;
  isTime?: boolean;
  color?: string;
}

function TokenCardComponent({
  token,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  flashDirection,
  showDecimals = true,
  onQuickBuy,
}: TokenCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userIconColor] = useState(() => Math.random() > 0.5 ? '#51c4fe' : '#777a8c');

  // Simulation State
  const [tokenIdentity, setTokenIdentity] = useState({ 
    name: token.name, 
    symbol: token.symbol,
    creator: generateCreatorName()
  });
  const [txCount, setTxCount] = useState(token.txCount);
  const [marketCap, setMarketCap] = useState(token.marketCap);
  const [volume, setVolume] = useState(token.volume24h);
  
  // --- Metrics & Time Simulation ---
  
  // Helpers implemented as stable callbacks or outside if possible, but inside is fine if used in state init
  const generateTopMetrics = () => [
    { icon: <Globe className="w-[9px] h-[9px]" />, count: Math.floor(Math.random() * 90) + 10 },
    { icon: <Send className="w-[9px] h-[9px]" />, count: Math.floor(Math.random() * 90) + 10 },
    { icon: <Ticket className="w-[9px] h-[9px]" />, count: Math.floor(Math.random() * 90) + 10 },
    { icon: <Search className="w-[9px] h-[9px]" />, count: Math.floor(Math.random() * 90) + 10 },
    { icon: <User className="w-[9px] h-[9px]" />, count: Math.floor(Math.random() * 90) + 10 },
    { icon: <BarChart2 className="w-[9px] h-[9px]" />, count: Math.floor(Math.random() * 90) + 10 },
    { icon: <Trophy className="w-[9px] h-[9px]" />, count: `${Math.floor(Math.random() * 20)}/${Math.floor(Math.random() * 90) + 20}` },
  ].sort(() => Math.random() - 0.5).slice(0, 4);

  const generateBottomMetrics = () => [
    { icon: <Users className="w-[10px] h-[10px]" />, suffix: '%', val: Math.floor(Math.random() * 90) + 10 },
    { icon: <ChefHat className="w-[10px] h-[10px]" />, suffix: '', val: '', isTime: true }, 
    { icon: <Target className="w-[10px] h-[10px]" />, suffix: '%', val: Math.floor(Math.random() * 90) + 10 },
    { icon: <Ghost className="w-[10px] h-[10px]" />, suffix: '%', val: Math.floor(Math.random() * 90) + 10 },
  ].map(m => ({
    ...m,
    color: Math.random() > 0.5 ? '#14f195' : '#f87171'
  }));

  // Initialize state lazily
  // Initialize state lazily
  const [topMetrics, setTopMetrics] = useState<MetricData[]>(generateTopMetrics);
  const [bottomMetrics, setBottomMetrics] = useState<MetricData[]>(generateBottomMetrics);
  const [barWidths, setBarWidths] = useState(() => {
    const green = Math.floor(Math.random() * 80) + 10;
    return { green, red: 100 - green };
  });
  const [timeState, setTimeState] = useState<{ val: number, unit: 's' | 'm' | 'h' | 'd' }>({ val: 5, unit: 's' });

  // generate ring color from token id
  const ringColor = RING_COLORS[token.id.charCodeAt(0) % RING_COLORS.length];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    // 1. Name Rotation (7s)
    const nameInterval = setInterval(() => {
      const { name, symbol } = generateNameAndSymbol();
      setTokenIdentity({
        name,
        symbol,
        creator: generateCreatorName()
      });
    }, 7000);

    // 2. TX Update (1s)
    const txInterval = setInterval(() => {
      setTxCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 1000);

    // 3. MC Update (3s)
    const mcInterval = setInterval(() => {
      setMarketCap(prev => Math.max(0, prev + prev * (Math.random() * 0.1 - 0.04)));
    }, 3000);

    // 4. Volume Update (3.5s)
    const volInterval = setInterval(() => {
      setVolume(prev => Math.max(0, prev + prev * (Math.random() * 0.1 - 0.04)));
    }, 3500);

    return () => {
      clearInterval(nameInterval);
      clearInterval(txInterval);
      clearInterval(mcInterval);
      clearInterval(volInterval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTopMetrics(generateTopMetrics());
      setBottomMetrics(generateBottomMetrics());
      
      setTimeState(prev => {
        let newVal = prev.val + Math.floor(Math.random() * 5) + 1;
        let newUnit = prev.unit;
        
        if (newUnit === 's' && newVal > 59) { newVal = 1; newUnit = 'm'; } 
        else if (newUnit === 'm' && newVal > 59) { newVal = 1; newUnit = 'h'; }
        
        return { val: newVal, unit: newUnit };
      });
      
      const green = Math.floor(Math.random() * 80) + 10;
      setBarWidths({ green, red: 100 - green });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const mcColor = useMemo(() => marketCap > 1000000 ? '#14f195' : '#52c5ff', [marketCap]);
  const redBarPct = 100 - barWidths.green;

  return (
    <div className="flex items-center px-3 py-2 border-b border-[#1a1b23] cursor-pointer bg-transparent gap-2 min-h-[64px]">
      {/* Avatar */}
      <div className="shrink-0 w-[45px] relative">
        <div className="relative w-[45px] h-[45px]">
          <div className="absolute inset-[-2px] rounded-[3px]" style={{ border: `1.5px solid ${ringColor}`, boxShadow: `0 0 4px ${ringColor}40` }} />
          <div className="absolute inset-0 rounded-[2px] overflow-hidden bg-[#1a1b23] flex items-center justify-center">
            {!imgError ? (
              <>
                <Image src={`https://api.dicebear.com/7.x/identicon/svg?seed=${tokenIdentity.symbol}`} alt="" fill className="object-cover" onError={() => setImgError(true)} unoptimized />
                <Image src={token.imageUrl} alt={tokenIdentity.name} fill className={`object-cover transition-opacity duration-500 ease-in-out ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setImgLoaded(true)} unoptimized />
              </>
            ) : (
              <span className="text-[14px] font-bold" style={{ color: ringColor }}>{tokenIdentity.symbol.charAt(0)}</span>
            )}
          </div>
          <div className="absolute bottom-[-4px] right-[-4px] w-4 h-4 bg-black rounded-full flex items-center justify-center z-10" style={{ border: `1.5px solid ${ringColor}` }}></div>
        </div>
        <div className="mt-1.5 text-[8px] text-[#555] text-center font-bold">{tokenIdentity.creator}</div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-[12px] text-[#fcfcfc] whitespace-nowrap">{tokenIdentity.name}</span>
          <span className="text-[10px] text-[#777a8c]">{tokenIdentity.symbol}</span>
          <button onClick={handleCopy} className="bg-none border-none cursor-pointer p-0 flex ml-[2px]">
            {copied ? <Check className="w-[10px] h-[10px] text-[#14f195]" /> : <Copy className="w-[10px] h-[10px] text-[#555]" />}
          </button>
        </div>

        <div className="flex items-center gap-2 text-[9px] text-[#777a8c]">
          <span className="text-[#14f195]">{formatTimeAgo(token.createdAt)}</span>
          <User className="w-[9px] h-[9px]" style={{ color: userIconColor }} />
          {topMetrics.map((m, i) => (
            <MetricBlock key={i} icon={m.icon} text={m.count ?? 0} />
          ))}
        </div>

        <div className="flex items-center gap-1 mt-2.5 flex-nowrap overflow-hidden">
          {bottomMetrics.map((m, i) => (
            <div key={i} className={`flex items-center gap-1 px-1.5 py-0.5 rounded-[99px] border border-[#2a2a35] text-[9px] whitespace-nowrap shrink-0 ${i === bottomMetrics.length - 1 ? 'bg-transparent' : 'bg-[#1a1b23]'}`}>
              <span style={{ color: m.color }} className="flex">{m.icon}</span>
              <span style={{ color: m.color }} className="font-medium">
                {m.val}{m.suffix}
                {m.isTime && <span className="text-[#fcfcfc] ml-[3px]">{timeState.val}{timeState.unit}</span>}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics + Buy */}
      <div className="shrink-0 flex flex-col items-end justify-between min-w-[70px] h-full min-h-[52px]">
        <div className="flex flex-col items-end gap-[1px]">
          <div className="flex items-center gap-[3px]">
            <span className="text-[9px] text-[#555]">MC</span>
            <span className="text-[11px] font-semibold" style={{ color: mcColor }}>{formatCurrency(marketCap, showDecimals)}</span>
          </div>
          <div className="flex items-center gap-[3px]">
            <span className="text-[9px] text-[#555]">V</span>
            <span className="text-[11px] font-semibold text-[#fcfcfc]">{formatCurrency(volume, showDecimals)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9px]">
          <span className="text-[#555] flex items-center gap-[2px]">F <SolanaLogo width={9} height={7} /> 0.045</span>
          <span className="text-[#555]">TX</span>
          <span className="text-[#fcfcfc] font-semibold">{formatCompactNumber(txCount)}</span>
          <div className="flex w-5 h-[2px] rounded-[1px] overflow-hidden">
            <div className="bg-[#14f195]" style={{ width: `${barWidths.green}%` }} />
            <div className="bg-[#f87171]" style={{ width: `${redBarPct}%` }} />
          </div>
        </div>

        <button onClick={(e) => { e.stopPropagation(); onQuickBuy?.(token); }} className="px-2 py-[3px] rounded-xl text-[10px] font-bold bg-[#526fff] border-none text-black cursor-pointer whitespace-nowrap flex items-center gap-[2px] min-w-[54px] justify-center">
          <Zap className="w-2 h-2 fill-black" /> 0 SOL
        </button>
      </div>
    </div>
  );
}

export const TokenCard = memo(TokenCardComponent);
