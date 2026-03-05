'use client';

import React, { memo, useState, useMemo } from 'react';
import { type Token } from '@/types';
import { formatCurrency, formatCompactNumber, formatTimeAgo } from '@/utils';
import { getRingColor, getMarketCapColor, generateUserIconColor } from '@/utils/tokenCardHelpers';
import { useTokenCardState, useAppSelector } from '@/hooks';
import {
  RiCheckLine, RiUserLine, RiFlashlightFill, RiFileCopyFill,
  RiSpyFill, RiCrosshair2Fill, RiUserStarFill, RiWaterFlashFill,
  RiShieldCheckFill,
} from '@remixicon/react';
import { ChainText } from '@/components/atoms';
import { Tooltip } from '@/components/atoms/Tooltip';
import { TokenAvatarCard } from '@/components/molecules';

interface TokenCardProps {
  token: Token;
  showDecimals?: boolean;
  onQuickBuy?: (token: Token) => void;
}

function holderPct(count: number | undefined, total: number | undefined): number {
  if (!count || !total || total === 0) return 0;
  return Math.min(Math.round((count / total) * 100), 100);
}

function TokenCardComponent({
  token,
  showDecimals = true,
  onQuickBuy,
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
  const hoverClass = "hover:bg-[#252630]";

  // ── Tooltip: real bonding data ──
  let tooltipContent: React.ReactNode;
  if (token.status === 'migrated') {
    tooltipContent = (
      <span className="text-[#fbbf24]">        Bonded ✓ {bondingProgress > 0 ? `(${bondingProgress.toFixed(2)}%)` : ''}
      </span>
    );
  } else {
    const bondColor =
      bondingProgress <= 30 ? '#16a34a' :
        bondingProgress <= 60 ? '#eab308' :
          bondingProgress <= 80 ? '#f97316' :
            '#ef4444';
    tooltipContent = (
      <span style={{ color: bondColor }}>
        Bonding: {bondingProgress.toFixed(2)}%
      </span>
    );
  }

  // Prefer real logo URL from the API
  const displayImageUrl = token.logoUrl || token.imageUrl;

  // ── Holder % breakdown (relative to total holdersCount) ──
  const totalHolders = token.holdersCount || 0;
  const smartPct = holderPct(token.smartTradersCount, totalHolders);
  const snipersPct = holderPct(token.snipersCount, totalHolders);
  const insidersPct = holderPct(token.insidersCount, totalHolders);
  const freshPct = holderPct(token.freshTradersCount, totalHolders);
  // "Regular" holders = everyone else
  const regularPct = totalHolders > 0 ? Math.max(0, 100 - smartPct - snipersPct - insidersPct - freshPct) : 0;

  // Net price change — use 1h or 24h
  const netChange = token.priceChange1h ?? token.priceChange24h ?? 0;
  const netColor = netChange >= 0 ? '#16a34a' : '#ef4444';
  const netSign = netChange >= 0 ? '+' : '';

  const cardContent = (
    <div className={`relative w-full flex items-center pl-2 lg:pl-3 pr-1 py-2 border-b border-[#1a1b23] cursor-pointer bg-transparent gap-2 min-h-[64px] transition-colors duration-200 mr-2 ${hoverClass}`}>
      <TokenAvatarCard
        symbol={tokenIdentity.symbol}
        name={tokenIdentity.name}
        imageUrl={displayImageUrl}
        creator={tokenIdentity.creator}
        ringColor={ringColor}
        exchangeLogo={token.exchangeLogo}
        exchangeName={token.exchangeName}
      />

      <div className="flex-1 min-w-0 flex flex-col gap-1 justify-center">
        {/* Row 1: Name · Symbol · Copy | MC · Vol */}
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

            {/* Row 2: Time · Holder Counts */}
            <div className="flex items-center gap-1 text-[9.8px] text-[#777a8c] mt-[1px] overflow-hidden">
              <span className="text-[#16a34a] shrink-0">
                {formatTimeAgo(token.createdAt)}
              </span>
              {typeof token.holdersCount === 'number' && (
                <div className="flex items-center gap-2 overflow-hidden">
                  <Tooltip content="Holders" position="top" containerClassName="shrink-0 flex items-center">
                    <div className="flex items-center gap-[2px]">
                      <RiUserLine className="w-[11px] h-[11px] shrink-0" style={{ color: userIconColor }} />
                      <span className="text-[#fcfcfc]">{formatCompactNumber(token.holdersCount)}</span>
                    </div>
                  </Tooltip>
                  {typeof token.smartTradersCount === 'number' && token.smartTradersCount > 0 && (
                    <Tooltip content="Smart Traders" position="top" containerClassName="shrink-0 flex items-center">
                      <div className="flex items-center gap-[2px]">
                        <RiUserStarFill className="w-[11px] h-[11px] shrink-0 text-[#fbbf24]" />
                        <span className="text-[#fcfcfc]">{token.smartTradersCount}</span>
                      </div>
                    </Tooltip>
                  )}
                  {typeof token.snipersCount === 'number' && token.snipersCount > 0 && (
                    <Tooltip content="Snipers" position="top" containerClassName="shrink-0 flex items-center">
                      <div className="flex items-center gap-[2px]">
                        <RiCrosshair2Fill className="w-[11px] h-[11px] shrink-0 text-[#ef4444]" />
                        <span className="text-[#fcfcfc]">{token.snipersCount}</span>
                      </div>
                    </Tooltip>
                  )}
                  {typeof token.insidersCount === 'number' && token.insidersCount > 0 && (
                    <Tooltip content="Insiders" position="top" containerClassName="shrink-0 flex items-center">
                      <div className="flex items-center gap-[2px]">
                        <RiSpyFill className="w-[11px] h-[11px] shrink-0 text-[#a855f7]" />
                        <span className="text-[#fcfcfc]">{token.insidersCount}</span>
                      </div>
                    </Tooltip>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* MC · Vol (right side) */}
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

        {/* Row 3: F $liquidity · N ±change% | TX count · Buy/Sell bar */}
        <div className="flex items-center justify-between w-full gap-2 -mt-0.5">
          <div className="flex items-center gap-[6px] text-[9.8px] overflow-hidden min-w-0">
            {typeof token.liquidity === 'number' && (
              <span className="flex items-center gap-[2px] shrink-0">
                <RiWaterFlashFill className="w-3 h-3 text-[#52c5ff]" />
                <span className="text-white font-semibold">${formatCompactNumber(token.liquidity)}</span>
              </span>
            )}
            <span className="shrink-0" style={{ color: netColor }}>
              <span className="text-[#777a8c]">N</span>{' '}
              <span className="font-semibold">{netSign}{Math.min(Math.abs(netChange), 9999).toFixed(2)}%</span>
            </span>
          </div>
          <div className="flex items-center gap-[6px] text-[9px] shrink-0">
            <span className="flex items-center gap-[2px] shrink-0">
              <span className="text-[#777a8c]">TX</span>
              <span className="text-[#fcfcfc] font-semibold">{formatCompactNumber(txCount)}</span>
            </span>
            <div className="flex w-[60px] sm:w-[70px] h-[4px] rounded-[2px] overflow-hidden shrink-0">
              <div className="bg-[#16a34a]" style={{ width: `${barWidths.green}%` }} />
              <div className="bg-[#ef4444]" style={{ width: `${redBarPct}%` }} />
            </div>
          </div>
        </div>

        {/* Row 4 (last): Holder % breakdown · Quick-buy button */}
        <div className="flex items-center justify-between gap-2 -mt-0.7">
          {totalHolders > 0 ? (
            <div className=" flex items-center gap-[7px] flex-nowrap overflow-hidden min-w-0 text-[9px]">
              <Tooltip content="Holders %" position="top" containerClassName="shrink-0 flex items-center">
                <span className="flex items-center gap-[2px] shrink-0">
                  <RiUserLine className="w-[10px] h-[10px] text-[#16a34a]" />
                  <span className="text-[#16a34a] font-semibold">{regularPct}%</span>
                </span>
              </Tooltip>
              <Tooltip content="Smart Traders %" position="top" containerClassName="shrink-0 flex items-center">
                <span className="flex items-center gap-[2px] shrink-0">
                  <RiUserStarFill className="w-[10px] h-[10px] text-[#fbbf24]" />
                  <span className="text-[#fbbf24] font-semibold">{smartPct}%</span>
                </span>
              </Tooltip>
              <Tooltip content="Snipers %" position="top" containerClassName="shrink-0 flex items-center">
                <span className="flex items-center gap-[2px] shrink-0">
                  <RiCrosshair2Fill className="w-[10px] h-[10px] text-[#ef4444]" />
                  <span className="text-[#ef4444] font-semibold">{snipersPct}%</span>
                </span>
              </Tooltip>
              <Tooltip content="Liquidity Locked" position="top" containerClassName="shrink-0 flex items-center">
                <span className="flex items-center gap-[2px] shrink-0">
                  <RiShieldCheckFill className="w-[10px] h-[10px] text-[#52c5ff]" />
                  <span className="text-[#52c5ff] font-semibold">{token.safety?.liquidityLocked ? '✓' : '0%'}</span>
                </span>
              </Tooltip>
              <Tooltip content="Insiders %" position="top" containerClassName="shrink-0 flex items-center">
                <span className="flex items-center gap-[2px] shrink-0">
                  <RiSpyFill className="w-[10px] h-[10px] text-[#a855f7]" />
                  <span className="text-[#a855f7] font-semibold">{insidersPct}%</span>
                </span>
              </Tooltip>
            </div>
          ) : (
            <div className="flex-1" />
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickBuy?.(token);
            }}
            className="px-1 py-[1px] rounded-xl text-[10px] font-semibold bg-[#526fff] text-black border-none cursor-pointer whitespace-nowrap flex items-center gap-[2px] min-w-[54px] justify-center shrink-0"
          >
            <RiFlashlightFill className="w-3 h-3 text-black" />
            <span className="text-black">0.1 <ChainText /></span>
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
