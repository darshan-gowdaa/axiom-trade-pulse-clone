'use client';

import { default as React, memo, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { type Token } from '@/types';
import { formatCurrency, formatCompactNumber, formatTimeAgo, truncateAddress } from '@/utils';
import { Check, Copy, User, Link, Crown, Globe, Trophy, Users, ChefHat, Target, Sparkles, Ghost, Box, Zap, AlignJustify, Send, Ticket, BarChart2, Search } from 'lucide-react';
import { SolanaLogo } from '@/components/atoms/SolanaLogo';

interface TokenCardProps {
  token: Token;
  flashDirection?: 'up' | 'down' | null;
  showDecimals?: boolean;
  onQuickBuy?: (token: Token) => void;
}

const RING_COLORS = ['#14f195', '#f87171', '#fbbf24'];

const SIMULATED_NAMES = [
  { name: 'Pepe Coin', symbol: 'PEPE' },
  { name: 'Wif Hat', symbol: 'WIF' },
  { name: 'Bonk Inu', symbol: 'BONK' },
  { name: 'Popcat Sol', symbol: 'POPCAT' },
  { name: 'Trump Maga', symbol: 'TRUMP' },
  { name: 'Mog Coin', symbol: 'MOG' },
  { name: 'Based Brett', symbol: 'BRETT' },
  { name: 'Giga Chad', symbol: 'GIGA' },
  { name: 'Michi Cat', symbol: 'MICHI' },
  { name: 'Apu Apustaja', symbol: 'APU' },
  { name: 'Gooing Up', symbol: 'GOO' },
  { name: 'Circle Jerking', symbol: 'JERK' },
  { name: 'Puh Please', symbol: 'PUH' },
  { name: 'Dih Coin', symbol: 'DIH' },
  { name: 'Skibidi Toilet', symbol: 'TOILET' },
  { name: 'Lvl 10 Gyatt', symbol: 'GYATT' },
  { name: 'W Rizz', symbol: 'RIZZ' },
  { name: 'Ohio Rizz', symbol: 'OHIO' },
  { name: 'Fanum Tax', symbol: 'TAX' },
  { name: 'Sigma Male', symbol: 'SIGMA' },
];

function TokenCardComponent({
  token,
  flashDirection,
  showDecimals = true,
  onQuickBuy,
}: TokenCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Simulation State
  const [tokenIdentity, setTokenIdentity] = useState({ 
    name: token.name, 
    symbol: token.symbol,
    creator: (() => {
      const chars = 'abcdefghijklmnopqrstuvwxyz';
      const len = Math.floor(Math.random() * 4) + 6; // 6-9 chars
      let name = '';
      for(let i=0; i<len; i++) name += chars.charAt(Math.floor(Math.random() * chars.length));
      const suffixes = ['', '99', '69', '41', '67', '77'];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      return name + suffix;
    })()
  });
  const [txCount, setTxCount] = useState(token.txCount);
  const [marketCap, setMarketCap] = useState(token.marketCap);
  const [volume, setVolume] = useState(token.volume24h);
  
  // Metrics State
  const [topMetrics, setTopMetrics] = useState<any[]>([]);
  const [bottomMetrics, setBottomMetrics] = useState<any[]>([]);
  
  // Time simulation
  const [timeState, setTimeState] = useState<{ val: number, unit: 's' | 'm' | 'h' | 'd' }>({ val: 5, unit: 's' });
  const [barWidths, setBarWidths] = useState({ green: 50, red: 50 });

  // generate ring color from token id
  const ringColor = RING_COLORS[token.id.charCodeAt(0) % RING_COLORS.length];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // --- 1. Name & Creator Rotation (7s) ---
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * SIMULATED_NAMES.length);
      
      // Generate new creator name
      const chars = 'abcdefghijklmnopqrstuvwxyz';
      const len = Math.floor(Math.random() * 4) + 6;
      let name = '';
      for(let i=0; i<len; i++) name += chars.charAt(Math.floor(Math.random() * chars.length));
      const suffixes = ['', '99', '69', '41', '67', '77'];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      
      setTokenIdentity({
        ...SIMULATED_NAMES[randomIdx],
        creator: name + suffix
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // --- 2. TX Update (1s, increase only) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setTxCount(prev => prev + Math.floor(Math.random() * 5) + 1); // Increase by 1-5
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- 3. MC Update (3s) ---
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate MC by +/- 5%
      setMarketCap(prev => {
        const change = prev * (Math.random() * 0.1 - 0.04);
        return Math.max(0, prev + change);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- 4. Volume Update (3.5s) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setVolume(prev => {
        const change = prev * (Math.random() * 0.1 - 0.04);
        return Math.max(0, prev + change);
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // --- 5. Line Items & Time (5s) ---
  useEffect(() => {
    // Initial Population
    const generateTopMetrics = () => [
      { icon: <Globe style={{ width: '9px', height: '9px' }} />, count: Math.floor(Math.random() * 90) + 10 },
      { icon: <Send style={{ width: '9px', height: '9px' }} />, count: Math.floor(Math.random() * 90) + 10 },
      { icon: <Ticket style={{ width: '9px', height: '9px' }} />, count: Math.floor(Math.random() * 90) + 10 },
      { icon: <Search style={{ width: '9px', height: '9px' }} />, count: Math.floor(Math.random() * 90) + 10 },
      { icon: <User style={{ width: '9px', height: '9px' }} />, count: Math.floor(Math.random() * 90) + 10 },
      { icon: <BarChart2 style={{ width: '9px', height: '9px' }} />, count: Math.floor(Math.random() * 90) + 10 },
      { icon: <Trophy style={{ width: '9px', height: '9px' }} />, count: `${Math.floor(Math.random() * 20)}/${Math.floor(Math.random() * 90) + 20}` },
    ].sort(() => Math.random() - 0.5).slice(0, 4);

    const generateBottomMetrics = () => [
      { icon: <Users style={{ width: '10px', height: '10px' }} />, suffix: '%', val: Math.floor(Math.random() * 90) + 10 },
      // The "time" item
      { icon: <ChefHat style={{ width: '10px', height: '10px' }} />, suffix: '', val: '', isTime: true }, 
      { icon: <Target style={{ width: '10px', height: '10px' }} />, suffix: '%', val: Math.floor(Math.random() * 90) + 10 },
      { icon: <Ghost style={{ width: '10px', height: '10px' }} />, suffix: '%', val: Math.floor(Math.random() * 90) + 10 },
    ].map(m => ({
      ...m,
      color: Math.random() > 0.5 ? '#14f195' : '#f87171'
    }));

    setTopMetrics(generateTopMetrics());
    setBottomMetrics(generateBottomMetrics());
    setBarWidths({ green: Math.floor(Math.random() * 80) + 10, red: 0 }); // Red calc on render

    const interval = setInterval(() => {
      setTopMetrics(generateTopMetrics());
      setBottomMetrics(generateBottomMetrics());
      
      // Update Time (simulate increasing seconds/minutes)
      setTimeState(prev => {
        let newVal = prev.val + Math.floor(Math.random() * 5) + 1;
        let newUnit = prev.unit;
        
        if (newUnit === 's' && newVal > 59) {
           newVal = 1;
           newUnit = 'm';
        } else if (newUnit === 'm' && newVal > 59) {
           newVal = 1;
           newUnit = 'h';
        }
        
        return { val: newVal, unit: newUnit };
      });
      
       setBarWidths(prev => {
          const green = Math.floor(Math.random() * 80) + 10;
          return { green, red: 100 - green };
       });

    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Helper for MC Color
  const mcColor = useMemo(() => {
     if (marketCap > 1000000) return '#14f195'; // > 1M Green
     return '#52c5ff'; // <= 1M Blue
  }, [marketCap]);

  // Derived Values
  const redBarPct = 100 - barWidths.green;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        borderBottom: '1px solid #1a1b23',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        gap: '8px',
        minHeight: '64px',
      }}
    >
      {/* left: avatar */}
      <div style={{ flexShrink: 0, width: '45px', position: 'relative' }}>
        <div style={{ position: 'relative', width: '45px', height: '45px' }}>
          <div 
            style={{ 
              position: 'absolute', 
              inset: '-2px', 
              borderRadius: '3px', 
              border: `1.5px solid ${ringColor}`,
              boxShadow: `0 0 4px ${ringColor}40`
            }} 
          />
          <div
            style={{
              position: 'absolute',
              inset: '0',
              borderRadius: '2px',
              overflow: 'hidden',
              backgroundColor: imgError ? '#1a1b23' : '#1a1b23',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!imgError ? (
              <>
                 <Image 
                   src={`https://api.dicebear.com/7.x/identicon/svg?seed=${tokenIdentity.symbol}`} 
                   alt=""
                   fill
                   style={{ objectFit: 'cover' }}
                   onError={() => setImgError(true)}
                   unoptimized
                 />
                 <Image 
                   src={token.imageUrl} 
                   alt={tokenIdentity.name} 
                   fill
                   style={{ 
                     objectFit: 'cover', 
                     opacity: imgLoaded ? 1 : 0, 
                     transition: 'opacity 0.5s ease-in-out' 
                   }} 
                   onLoad={() => setImgLoaded(true)}
                   unoptimized 
                 />
              </>
            ) : (
              <span style={{ color: ringColor, fontSize: '14px', fontWeight: 'bold' }}>{tokenIdentity.symbol.charAt(0)}</span>
            )}
          </div>
          <div 
            style={{
              position: 'absolute',
              bottom: '-4px',
              right: '-4px',
              width: '16px',
              height: '16px',
              backgroundColor: '#000000',
              border: `1.5px solid ${ringColor}`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
          >
          </div>
        </div>
        <div style={{ marginTop: '6px', fontSize: '8px', color: '#555', textAlign: 'center', fontWeight: 700 }}>{tokenIdentity.creator}</div>
      </div>

      {/* info */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontWeight: 600, fontSize: '12px', color: '#fcfcfc', whiteSpace: 'nowrap' }}>{tokenIdentity.name}</span>
          <span style={{ fontSize: '10px', color: '#777a8c' }}>{tokenIdentity.symbol}</span>
          <button onClick={handleCopy} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', marginLeft: '2px' }}>
            {copied ? <Check style={{ width: '10px', height: '10px', color: '#14f195' }} /> : <Copy style={{ width: '10px', height: '10px', color: '#555' }} />}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '9px', color: '#777a8c' }}>
          <span style={{ color: '#14f195' }}>{formatTimeAgo(token.createdAt)}</span>
          <User style={{ width: '9px', height: '9px', color: Math.random() > 0.5 ? '#51c4fe' : '#777a8c' }} />
          {topMetrics.map((m, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span style={{ color: '#777a8c' }}>{m.icon}</span>
              <span style={{ color: '#fcfcfc' }}>{m.count}</span>
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginTop: '10px', flexWrap: 'nowrap', overflow: 'hidden' }}>
          {bottomMetrics.map((m, i) => {
            const isLast = i === bottomMetrics.length - 1;
            return (
              <div 
                key={i} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '2px', 
                  padding: '1px 3px',
                  borderRadius: '99px',
                  backgroundColor: isLast ? 'transparent' : '#1a1b23',
                  border: '1px solid #2a2a35',
                  fontSize: '9px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                <span style={{ color: m.color, display: 'flex' }}>{m.icon}</span>
                <span style={{ color: m.color, fontWeight: 500 }}>
                  {m.val}{m.suffix}
                  {m.isTime && <span style={{ color: '#fcfcfc', marginLeft: '3px' }}>{timeState.val}{timeState.unit}</span>}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* metrics + buy */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', minWidth: '70px', height: '100%', minHeight: '52px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span style={{ fontSize: '9px', color: '#555' }}>MC</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: mcColor }}>{formatCurrency(marketCap, showDecimals)}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span style={{ fontSize: '9px', color: '#555' }}>V</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#fcfcfc' }}>{formatCurrency(volume, showDecimals)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px' }}>
          <span style={{ color: '#555', display: 'flex', alignItems: 'center', gap: '2px' }}>
            F <SolanaLogo width={9} height={7} /> 0.045
          </span>
          <span style={{ color: '#555' }}>TX</span>
          <span style={{ color: '#fcfcfc', fontWeight: 600 }}>{formatCompactNumber(txCount)}</span>
          <div style={{ display: 'flex', width: '20px', height: '2px', borderRadius: '1px', overflow: 'hidden' }}>
            <div style={{ width: `${barWidths.green}%`, height: '100%', backgroundColor: '#14f195' }} />
            <div style={{ width: `${redBarPct}%`, height: '100%', backgroundColor: '#f87171' }} />
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onQuickBuy?.(token); }}
          style={{
            padding: '3px 8px',
            borderRadius: '12px',
            fontSize: '10px',
            fontWeight: 700,
            backgroundColor: '#526fff',
            border: 'none',
            color: '#000000',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            minWidth: '54px',
            justifyContent: 'center',
          }}
        >
          <Zap style={{ width: '8px', height: '8px', fill: 'black' }} />
          0 SOL
        </button>
      </div>
    </div>
  );
}

export const TokenCard = memo(TokenCardComponent);
