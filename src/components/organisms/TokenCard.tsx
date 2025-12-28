'use client';

import React, { memo, useState, useMemo } from 'react';
import { type Token } from '@/types';
import { formatCurrency, formatCompactNumber, formatTimeAgo } from '@/utils';
import { getRingColor, getMarketCapColor, generateUserIconColor } from '@/utils/tokenCardHelpers';
import { useTokenCardState, useChain } from '@/hooks';
import { RiCheckLine, RiUserLine, RiFlashlightFill, RiFileCopyFill } from '@remixicon/react';
import { ChainLogo, ChainText } from '@/components/atoms';
import { MetricBlock } from '@/components/atoms/MetricBlock';
import { Tooltip } from '@/components/atoms/Tooltip';
import { TokenAvatarCard, MetricPill } from '@/components/molecules';

interface TokenCardProps {
  token: Token;
  flashDirection?: 'up' | 'down' | null;
  showDecimals?: boolean;
  onQuickBuy?: (token: Token) => void;
}

function TokenCardComponent({
  token,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  flashDirection,
  showDecimals = true,
  onQuickBuy,
}: TokenCardProps) {
  const [copied, setCopied] = useState(false);
  const [userIconColor] = useState(generateUserIconColor);
  const { activeChain } = useChain();

  const {
    tokenIdentity,
    txCount,
    marketCap,
    volume,
    topMetrics,
    bottomMetrics,
    barWidths,
    timeState,
    feeValue,
  } = useTokenCardState({
    initialName: token.name,
    initialSymbol: token.symbol,
    initialTxCount: token.txCount,
    initialMarketCap: token.marketCap,
    initialVolume: token.volume24h,
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

  const cardContent = (
    <div className={`relative w-full flex items-center pl-2 lg:pl-3 pr-1 py-2 border-b border-[#1a1b23] cursor-pointer bg-transparent gap-2 min-h-[64px] transition-colors duration-200 mr-2 ${hoverClass}`}>
      <TokenAvatarCard
        symbol={tokenIdentity.symbol}
        name={tokenIdentity.name}
        imageUrl={token.imageUrl}
        creator={tokenIdentity.creator}
        ringColor={ringColor}
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
              <RiUserLine
                className="w-[11px] h-[11px] shrink-0"
                style={{ color: userIconColor }}
              />
              <div className="flex items-center gap-1 overflow-hidden">
                {topMetrics.map((m, i) => (
                  <MetricBlock key={i} icon={m.icon} text={m.count ?? 0} textClass="text-[#fcfcfc]" />
                ))}
              </div>
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
            {activeChain === 'sol' && (
              <span className="text-white flex items-center gap-[2px]">
                F <ChainLogo width={9} height={9} /> {feeValue}
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
            {bottomMetrics.map((m, i) => (
              <MetricPill
                key={i}
                metric={m}
                timeState={timeState}
                isLast={i === bottomMetrics.length - 1}
              />
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
