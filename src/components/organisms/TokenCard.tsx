'use client';

import React, { memo, useState, useMemo } from 'react';
import { type Token } from '@/types';
import { formatCurrency, formatCompactNumber, formatTimeAgo } from '@/utils';
import { getRingColor, getMarketCapColor, generateUserIconColor } from '@/utils/tokenCardHelpers';
import { useTokenCardState, useAppSelector } from '@/hooks';
import { RiCheckLine, RiUserLine, RiFlashlightFill, RiFileCopyFill, RiSpyFill, RiCrosshair2Fill, RiUserStarFill, RiWaterFlashFill, RiTimerFlashLine } from '@remixicon/react';
import { ChainText } from '@/components/atoms';
import { Tooltip } from '@/components/atoms/Tooltip';
import { TokenAvatarCard, MetricPill } from '@/components/molecules';

interface TokenCardProps {
  token: Token;
  showDecimals?: boolean;
  onQuickBuy?: (token: Token) => void;
  index?: number;
}

function TokenCardComponent({
  token,
  showDecimals = true,
  onQuickBuy,
  index,
}: TokenCardProps) {
  const [copied, setCopied] = useState(false);
  const [userIconColor] = useState(generateUserIconColor);

  // Directly select this token's flash direction to avoid O(N) re-renders
  useAppSelector((state) => state.tokens.priceFlash[token.id]);

  const {
    tokenIdentity,
    txCount,
    marketCap,
    volume,
    barWidths,
    timeState,
  } = useTokenCardState({
    initialName: token.name,
    initialSymbol: token.symbol,
    initialTxCount: token.txCount,
    initialMarketCap: token.marketCap,
    initialVolume: token.volume24h,
    deployer: token.deployer,
    buys1h: token.buys1h,
    sells1h: token.sells1h,
    createdAt: token.createdAt,
  });

  const ringColor = getRingColor(token.id);
  const mcColor = useMemo(() => getMarketCapColor(marketCap), [marketCap]);
  const redBarPct = 100 - barWidths.green;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const bondingProgress = token.bondingCurveProgress || 0;
  // Use a neutral light grey for hover background
  const hoverClass = "hover:bg-[#252630]";

  // Determine tooltip props based on status and bonding
  let tooltipContent: React.ReactNode;

  if (token.status === 'migrated') {
    tooltipContent = <span className="text-[#fafaa5]">Pump VI</span>;
  } else {
    // Bonding color logic: Green if < 50, Red if >= 50
    const isHighBonding = bondingProgress > 49;
    const tooltipTextColor = isHighBonding ? "text-[#ef4444]" : "text-[#16a34a]";
    tooltipContent = <span className={tooltipTextColor}>Bonding: {bondingProgress.toFixed(2)}%</span>;
  }

  // Prefer real logo URL from the API
  const displayImageUrl = token.logoUrl || token.imageUrl;

  // Prioritize images for the first 8 items in the virtual list
  const isPriority = index !== undefined && index < 8;

  const cardContent = (
    <div className={`relative w-full flex items-center pl-2 lg:pl-3 pr-1 py-2 border-b border-[#1a1b23] cursor-pointer bg-transparent gap-2 min-h-[64px] transition-colors duration-200 mr-2 ${hoverClass}`}>
      <TokenAvatarCard
        symbol={tokenIdentity.symbol}
        name={tokenIdentity.name}
        imageUrl={displayImageUrl}
        creator={tokenIdentity.creator}
        ringColor={ringColor}
        priority={isPriority}
      />

      <div className="flex-1 min-w-0 flex flex-col gap-1 justify-center">
        <div className="flex items-start justify-between gap-2">
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

            <div className="flex items-center gap-1 text-[11px] text-[#777a8c] mt-[1px] overflow-hidden">
              <span className="text-[#16a34a] shrink-0">
                {formatTimeAgo(token.createdAt)}
              </span>
              {typeof token.holdersCount === 'number' && (
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="flex items-center gap-[2px]">
                    <RiUserLine className="w-[11px] h-[11px] shrink-0" style={{ color: userIconColor }} />
                    <span className="text-[#fcfcfc]">{formatCompactNumber(token.holdersCount)}</span>
                  </div>

                  {typeof token.smartTradersCount === 'number' && token.smartTradersCount > 0 && (
                    <div className="flex items-center gap-[2px]" title="Smart Traders">
                      <RiUserStarFill className="w-[11px] h-[11px] shrink-0 text-[#fbbf24]" />
                      <span className="text-[#fcfcfc]">{token.smartTradersCount}</span>
                    </div>
                  )}

                  {typeof token.snipersCount === 'number' && token.snipersCount > 0 && (
                    <div className="flex items-center gap-[2px]" title="Snipers">
                      <RiCrosshair2Fill className="w-[11px] h-[11px] shrink-0 text-[#ef4444]" />
                      <span className="text-[#fcfcfc]">{token.snipersCount}</span>
                    </div>
                  )}

                  {typeof token.insidersCount === 'number' && token.insidersCount > 0 && (
                    <div className="flex items-center gap-[2px]" title="Insiders">
                      <RiSpyFill className="w-[11px] h-[11px] shrink-0 text-[#a855f7]" />
                      <span className="text-[#fcfcfc]">{token.insidersCount}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

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

        <div className="flex items-center justify-between gap-2">
          <div className="flex-1" />
          <div className="flex items-center gap-1 text-[9px] shrink-0 -mt-1">
            {typeof token.liquidity === 'number' && (
              <span className="text-[#777a8c] mr-1 flex items-center gap-[2px]" title="Liquidity">
                <RiWaterFlashFill className="w-3 h-3 text-[#52c5ff]" />
                <span className="text-white">${formatCompactNumber(token.liquidity)}</span>
              </span>
            )}
            <span className="text-[#777a8c]">TX</span>
            <span className="text-[#fcfcfc] font-semibold">
              {formatCompactNumber(txCount)}
            </span>
            <div className="flex w-5 h-[2px] rounded-[1px] overflow-hidden">
              <div className="bg-[#16a34a]" style={{ width: `${barWidths.green}%` }} />
              <div className="bg-[#ef4444]" style={{ width: `${redBarPct}%` }} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 -mt-1">
          <div className="flex items-center gap-1 flex-nowrap overflow-hidden min-w-0">
            {typeof token.priceChange1h === 'number' && (
              <MetricPill
                metric={{
                  icon: <span className="font-bold text-[9px]">1H</span>,
                  val: Math.min(Math.abs(token.priceChange1h), 999.99).toFixed(2),
                  suffix: '%',
                  color: token.priceChange1h >= 0 ? '#16a34a' : '#ef4444'
                }}
                timeState={timeState}
              />
            )}
            {typeof token.priceChange5m === 'number' && (
              <MetricPill
                metric={{
                  icon: <span className="font-bold text-[9px]">5M</span>,
                  val: Math.min(Math.abs(token.priceChange5m), 999.99).toFixed(2),
                  suffix: '%',
                  color: token.priceChange5m >= 0 ? '#16a34a' : '#ef4444'
                }}
                timeState={timeState}
              />
            )}
            {typeof token.volume5m === 'number' && token.volume5m > 0 && (
              <MetricPill
                metric={{
                  icon: <RiTimerFlashLine className="w-[10px] h-[10px] text-[#fbbf24]" />,
                  val: `$${formatCompactNumber(token.volume5m)}`,
                  suffix: ' Vol',
                  color: '#fbbf24'
                }}
                timeState={timeState}
              />
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickBuy?.(token);
            }}
            className="px-1 py-[1px] rounded-xl text-[10px] font-semibold bg-[#526fff] text-black border-none cursor-pointer whitespace-nowrap flex items-center gap-[2px] min-w-[54px] justify-center shrink-0"
          >
            <RiFlashlightFill className="w-3 h-3 text-black" />
            <span className="text-black">0 <ChainText /></span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Tooltip
      content={tooltipContent}
      position="top"
      className="z-50"
      containerClassName="relative flex w-full"
    >
      {cardContent}
    </Tooltip>
  );
}

export const TokenCard = memo(TokenCardComponent);
