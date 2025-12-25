'use client';

import { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import { type Token } from '@/types';
import { formatCurrency, formatCompactNumber, formatTimeAgo, truncateAddress } from '@/utils';
import { Check, Copy, User, Link, Crown, Globe, Trophy, Users, ChefHat, Target, Sparkles, Ghost, Box, Zap, AlignJustify, Send, Ticket, BarChart2, Search } from 'lucide-react';

interface TokenCardProps {
  token: Token;
  flashDirection?: 'up' | 'down' | null;
  showDecimals?: boolean;
  onQuickBuy?: (token: Token) => void;
}

const RING_COLORS = ['#14f195', '#f87171', '#fbbf24'];

function TokenCardComponent({
  token,
  flashDirection,
  showDecimals = true,
  onQuickBuy,
}: TokenCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  // generate ring color from token id
  const ringColor = RING_COLORS[token.id.charCodeAt(0) % RING_COLORS.length];
  const isPositive = token.priceChange24h >= 0;
  const isFinalStretch = token.bondingCurveProgress !== undefined && token.bondingCurveProgress > 0;

  const handleCopy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [token.address]);

  // demo metrics
  const metrics = [
    { icon: <Globe style={{ width: '9px', height: '9px' }} />, count: Math.floor(Math.random() * 90) + 10 },
    { icon: <Send style={{ width: '9px', height: '9px' }} />, count: Math.floor(Math.random() * 90) + 10 },
    { icon: <Ticket style={{ width: '9px', height: '9px' }} />, count: Math.floor(Math.random() * 90) + 10 },
    { icon: <Search style={{ width: '9px', height: '9px' }} />, count: Math.floor(Math.random() * 90) + 10 },
    { icon: <User style={{ width: '9px', height: '9px' }} />, count: Math.floor(Math.random() * 90) + 10 },
    { icon: <BarChart2 style={{ width: '9px', height: '9px' }} />, count: Math.floor(Math.random() * 90) + 10 },
    { icon: <Trophy style={{ width: '9px', height: '9px' }} />, count: `${Math.floor(Math.random() * 20)}/${Math.floor(Math.random() * 90) + 20}` },
  ].sort(() => Math.random() - 0.5).slice(0, 4);

  const bottomMetrics = [
    { icon: <Users style={{ width: '10px', height: '10px' }} />, suffix: '%' },
    { icon: <ChefHat style={{ width: '10px', height: '10px' }} />, suffix: '%', time: '8d' },
    { icon: <Target style={{ width: '10px', height: '10px' }} />, suffix: '%' },
    { icon: <Ghost style={{ width: '10px', height: '10px' }} />, suffix: '%' },
    { icon: <Box style={{ width: '10px', height: '10px' }} />, suffix: '%' },
  ].map(m => ({
    ...m,
    val: Math.floor(Math.random() * 10),
    color: Math.random() > 0.5 ? '#14f195' : '#f87171'
  }));


  const greenBarPct = Math.floor(Math.random() * 80) + 10;
  const redBarPct = 100 - greenBarPct;

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
              borderRadius: '6px', 
              border: `1.5px solid ${ringColor}`,
              boxShadow: `0 0 4px ${ringColor}40`
            }} 
          />
          

          <div
            style={{
              position: 'absolute',
              inset: '0',
              borderRadius: '4px',
              overflow: 'hidden',
              backgroundColor: imgError ? '#1a1b23' : '#1a1b23',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!imgError ? (
              <>
                 {/* Fallback "Minecraft" Image (DiceBear) - Visible while loading */}
                 <Image 
                   src={`https://api.dicebear.com/7.x/identicon/svg?seed=${token.symbol}`} 
                   alt=""
                   fill
                   style={{ objectFit: 'cover' }}
                   onError={() => setImgError(true)}
                   unoptimized
                 />
                 
                 {/* Main AI Image - Fades in when loaded */}
                 <Image 
                   src={token.imageUrl} 
                   alt={token.name} 
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
              <span style={{ color: ringColor, fontSize: '14px', fontWeight: 'bold' }}>{token.symbol.charAt(0)}</span>
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
        <div style={{ marginTop: '6px', fontSize: '8px', color: '#555', textAlign: 'center' }}>{truncateAddress(token.address, 3)}</div>
      </div>

      {/* info */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontWeight: 600, fontSize: '12px', color: '#fcfcfc', whiteSpace: 'nowrap' }}>{token.name}</span>
          <span style={{ fontSize: '10px', color: '#777a8c' }}>{token.symbol}</span>
          <button onClick={handleCopy} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', marginLeft: '2px' }}>
            {copied ? <Check style={{ width: '10px', height: '10px', color: '#14f195' }} /> : <Copy style={{ width: '10px', height: '10px', color: '#555' }} />}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '9px', color: '#777a8c' }}>
          <span style={{ color: '#14f195' }}>{formatTimeAgo(token.createdAt)}</span>
          

          <User style={{ width: '9px', height: '9px', color: Math.random() > 0.5 ? '#51c4fe' : '#777a8c' }} />
          

          {metrics.map((m, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span style={{ color: '#777a8c' }}>{m.icon}</span>
              <span style={{ color: '#fcfcfc' }}>{m.count}</span>
            </span>
          ))}
        </div>


        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginTop: '10px', flexWrap: 'nowrap', overflow: 'hidden' }}>
          {bottomMetrics.map((m, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '2px', 
                padding: '1px 4px',
                borderRadius: '99px',
                backgroundColor: '#1a1b23',
                border: '1px solid #2a2a35',
                fontSize: '9px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <span style={{ color: m.color, display: 'flex' }}>{m.icon}</span>
              <span style={{ color: m.color, fontWeight: 500 }}>
                {m.val}{m.suffix}
                {(m as any).time && <span style={{ color: '#fcfcfc', marginLeft: '3px' }}>{(m as any).time}</span>}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* metrics + buy */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', minWidth: '70px', height: '100%', minHeight: '52px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1px' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span style={{ fontSize: '9px', color: '#555' }}>MC</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#52c5ff' }}>{formatCurrency(token.marketCap, showDecimals)}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span style={{ fontSize: '9px', color: '#555' }}>V</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#fcfcfc' }}>{formatCurrency(token.volume24h, showDecimals)}</span>
          </div>
        </div>


        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px' }}>
          <span style={{ color: '#555', display: 'flex', alignItems: 'center', gap: '2px' }}>
            F <AlignJustify style={{ width: '8px', height: '8px', color: '#a78bfa' }} /> 0.0{Math.floor(Math.random() * 9)}5
          </span>
          <span style={{ color: '#555' }}>TX</span>
          <span style={{ color: '#fcfcfc', fontWeight: 600 }}>{formatCompactNumber(token.txCount)}</span>
          <div style={{ display: 'flex', width: '20px', height: '3px', borderRadius: '1px', overflow: 'hidden' }}>
            <div style={{ width: `${greenBarPct}%`, height: '100%', backgroundColor: '#14f195' }} />
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
