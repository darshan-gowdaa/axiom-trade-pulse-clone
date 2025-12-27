'use client';

import { default as React, memo, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { type Token } from '@/types';
import {
  formatCurrency,
  formatCompactNumber,
  formatTimeAgo,
  generateNameAndSymbol,
  generateCreatorName,
} from '@/utils';
import {
  RiCheckLine,
  RiUserLine,
  RiGlobalLine,
  RiTrophyLine,
  RiGroupLine,
  RiRestaurantLine,
  RiCrosshair2Line,
  RiGhostLine,
  RiSendPlaneLine,
  RiTicketLine,
  RiBarChartLine,
  RiSearchLine,
  RiFlashlightFill,
  RiFileCopyFill,
} from '@remixicon/react';
import { SolanaLogo } from '@/components/atoms/SolanaLogo';

interface TokenCardProps {
  token: Token;
  flashDirection?: 'up' | 'down' | null;
  showDecimals?: boolean;
  onQuickBuy?: (token: Token) => void;
}

const RING_COLORS = ['#11956e', '#b94b5d', '#fbbf24'];

const MetricBlock = ({
  icon,
  text,
  color = '#777a8c',
  textClass = 'text-[#fcfcfc]',
}: {
  icon: React.ReactNode;
  text: string | number;
  color?: string;
  textClass?: string;
}) => (
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
  const [userIconColor] = useState(() =>
    Math.random() > 0.5 ? '#51c4fe' : '#777a8c',
  );

  const [tokenIdentity, setTokenIdentity] = useState({
    name: token.name,
    symbol: token.symbol,
    creator: generateCreatorName(),
  });
  const [txCount, setTxCount] = useState(token.txCount);
  const [marketCap, setMarketCap] = useState(token.marketCap);
  const [volume, setVolume] = useState(token.volume24h);

  const generateTopMetrics = () =>
    [
      { icon: <RiGlobalLine className="w-[12px] h-[12px]" />, count: Math.floor(Math.random() * 90) + 10 },
      { icon: <RiSendPlaneLine className="w-[12px] h-[12px]" />, count: Math.floor(Math.random() * 90) + 10 },
      { icon: <RiTicketLine className="w-[12px] h-[12px]" />, count: Math.floor(Math.random() * 90) + 10 },
      { icon: <RiSearchLine className="w-[12px] h-[12px]" />, count: Math.floor(Math.random() * 90) + 10 },
      { icon: <RiUserLine className="w-[12px] h-[12px]" />, count: Math.floor(Math.random() * 90) + 10 },
      { icon: <RiBarChartLine className="w-[12px] h-[12px]" />, count: Math.floor(Math.random() * 90) + 10 },
      {
        icon: <RiTrophyLine className="w-[12px] h-[12px]" />,
        count: `${Math.floor(Math.random() * 20)}/${Math.floor(Math.random() * 90) + 20}`,
      },
    ]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

  const generateBottomMetrics = () =>
    [
      { icon: <RiGroupLine className="w-[10px] h-[10px]" />, suffix: '%', val: Math.floor(Math.random() * 90) + 10 },
      { icon: <RiRestaurantLine className="w-[10px] h-[10px]" />, suffix: '', val: '', isTime: true },
      { icon: <RiCrosshair2Line className="w-[10px] h-[10px]" />, suffix: '%', val: Math.floor(Math.random() * 90) + 10 },
      { icon: <RiGhostLine className="w-[10px] h-[10px]" />, suffix: '%', val: Math.floor(Math.random() * 90) + 10 },
    ].map((m) => ({
      ...m,
      color: Math.random() > 0.5 ? '#11956e' : '#b94b5d',
    }));

  const [topMetrics, setTopMetrics] = useState<MetricData[]>(generateTopMetrics);
  const [bottomMetrics, setBottomMetrics] = useState<MetricData[]>(generateBottomMetrics);
  const [barWidths, setBarWidths] = useState(() => {
    const green = Math.floor(Math.random() * 80) + 10;
    return { green, red: 100 - green };
  });
  const [timeState, setTimeState] = useState<{ val: number; unit: 's' | 'm' | 'h' | 'd' }>({ val: 5, unit: 's' });

  const ringColor = RING_COLORS[token.id.charCodeAt(0) % RING_COLORS.length];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    const nameInterval = setInterval(() => {
      const { name, symbol } = generateNameAndSymbol();
      setTokenIdentity({ name, symbol, creator: generateCreatorName() });
    }, 7000);

    const txInterval = setInterval(() => {
      setTxCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 1000);

    const mcInterval = setInterval(() => {
      setMarketCap((prev) => Math.max(0, prev + prev * (Math.random() * 0.1 - 0.04)));
    }, 3000);

    const volInterval = setInterval(() => {
      setVolume((prev) => Math.max(0, prev + prev * (Math.random() * 0.1 - 0.04)));
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

      setTimeState((prev) => {
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

      const green = Math.floor(Math.random() * 80) + 10;
      setBarWidths({ green, red: 100 - green });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const mcColor = useMemo(() => (marketCap > 1000000 ? '#11956e' : '#52c5ff'), [marketCap]);
  const redBarPct = 100 - barWidths.green;

  return (
    <div className="relative flex items-center px-2 lg:px-3 py-2 border-b border-[#1a1b23] cursor-pointer bg-transparent gap-2 min-h-[64px]">
      {/* Avatar */}
      <div className="shrink-0 w-[55px] relative">
        <div className="relative w-[55px] h-[55px]">
          <div
            className="absolute inset-[-2px] rounded-[3px]"
            style={{ border: `1.5px solid ${ringColor}`, boxShadow: `0 0 4px ${ringColor}40` }}
          />
          <div className="absolute inset-0 rounded-[2px] overflow-hidden flex items-center justify-center">
            {!imgError ? (
              <>
                <Image
                  src={`https://api.dicebear.com/7.x/identicon/svg?seed=${tokenIdentity.symbol}`}
                  alt=""
                  fill
                  className="object-cover"
                  onError={() => setImgError(true)}
                  unoptimized
                />
                <Image
                  src={token.imageUrl}
                  alt={tokenIdentity.name}
                  fill
                  className={`object-cover transition-opacity duration-500 ease-in-out ${imgLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  onLoad={() => setImgLoaded(true)}
                  unoptimized
                />
              </>
            ) : (
              <span className="text-[14px] font-bold" style={{ color: ringColor }}>
                {tokenIdentity.symbol.charAt(0)}
              </span>
            )}
          </div>
          <div
            className="absolute bottom-[-4px] right-[-4px] w-4 h-4 bg-black rounded-full flex items-center justify-center z-10"
            style={{ border: `1.5px solid ${ringColor}` }}
          />
        </div>
        <div className="mt-1.5 text-[8px] text-[#555] text-center font-bold">{tokenIdentity.creator}</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1 justify-center">
        {/* Row 1: LEFT (name + metrics under) / RIGHT (MC, V) */}
        <div className="flex items-start justify-between gap-2">
          {/* LEFT: Name + symbol + copy + metrics UNDER name */}
          <div className="flex flex-col min-w-0 pr-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-semibold text-[12px] text-[#fcfcfc] truncate">
                {tokenIdentity.name}
              </span>
              <span className="text-[10px] text-[#777a8c] shrink-0 font-semibold">
                {tokenIdentity.symbol}
              </span>
              <button
                onClick={handleCopy}
                className="bg-none border-none cursor-pointer p-0 flex ml-[2px] shrink-0"
              >
                {copied ? (
                  <RiCheckLine className="w-[12px] h-[12px] text-[#777a8c]" />
                ) : (
                  <RiFileCopyFill className="w-[12px] h-[12px] text-[#777a8c]" />
                )}
              </button>
            </div>

            {/* Metrics directly under name (LEFT side) */}
            <div className="flex items-center gap-1 text-[11px] text-[#777a8c] mt-[1px] overflow-hidden">
              <span className="text-[#09926A] shrink-0">
                {formatTimeAgo(token.createdAt)}
              </span>
              <RiUserLine
                className="w-[11px] h-[11px] shrink-0"
                style={{ color: userIconColor }}
              />
              <div className="flex items-center gap-1 overflow-hidden">
                {topMetrics.map((m, i) => (
                  <MetricBlock
                    key={i}
                    icon={m.icon}
                    text={m.count ?? 0}
                    textClass="text-[#fcfcfc]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: MC / V  */}
          <div className="flex flex-col items-end gap-[1px] shrink-0">
            <div className="flex items-center gap-[3px]">
              <span className="text-[9px] text-[#777a8c]">MC</span>
              <span className="text-[12px] font-semibold" style={{ color: mcColor }}>
                {formatCurrency(marketCap, showDecimals)}
              </span>
            </div>
            <div className="flex items-center gap-[3px] -mt-1">
              <span className="text-[9px] text-[#777a8c] -mb-1">V</span>
              <span className="text-[12px] font-semibold text-[#fcfcfc]">
                {formatCurrency(volume, showDecimals)}
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: F/TX + bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1" />
          <div className="flex items-center gap-1 text-[9px] shrink-0 -mt-1">
            <span className="text-white flex items-center gap-[2px]">
              F <SolanaLogo width={9} height={9} /> 0.00₂5
            </span>
            <span className="text-[#777a8c]">TX</span>
            <span className="text-[#fcfcfc] font-semibold">
              {formatCompactNumber(txCount)}
            </span>
            <div className="flex w-5 h-[2px] rounded-[1px] overflow-hidden">
              <div className="bg-[#11956e]" style={{ width: `${barWidths.green}%` }} />
              <div className="bg-[#b94b5d]" style={{ width: `${redBarPct}%` }} />
            </div>
          </div>
        </div>

        {/* Row 3: Bottom Metrics + Button */}
        <div className="flex items-center justify-between gap-2 -mt-1">
          <div className="flex items-center gap-1 flex-nowrap overflow-hidden min-w-0">
            {bottomMetrics.map((m, i) => (
              <div
                key={i}
                className={`flex items-center gap-1 px-1.5 py-0.5 font-semibold rounded-[99px] border border-[#17181f] text-[10px] whitespace-nowrap shrink-0 ${i === bottomMetrics.length - 1 ? 'bg-transparent' : ''
                  }`}
              >
                <span style={{ color: m.color }} className="flex">
                  {m.icon}
                </span>
                <span style={{ color: m.color }} className="font-medium">
                  {m.val}
                  {m.suffix}
                  {m.isTime && (
                    <span className="ml-[3px]">
                      {timeState.val}
                      {timeState.unit}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickBuy?.(token);
            }}
            className="px-1 py-[1px] rounded-xl text-[10px] font-semibold bg-[#526fff] text-black border-none cursor-pointer whitespace-nowrap flex items-center gap-[2px] min-w-[54px] justify-center shrink-0"
          >
            <RiFlashlightFill className="w-3 h-3 text-black" />
            <span className="text-black">0 SOL</span>
          </button>


        </div>
      </div>
    </div>
  );
}

export const TokenCard = memo(TokenCardComponent);
