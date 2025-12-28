'use client';

import { useRef, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useAppSelector } from '@/hooks';
import { type Token, type ActiveTab } from '@/types';
import { TokenCard } from './TokenCard';
import { TokenCardSkeleton } from '@/components/atoms';
import { DEFAULT_PRESETS, VIRTUAL_SCROLL_OVERSCAN } from '@/utils';
import { RiEqualizer3Fill, RiFlashlightFill } from '@remixicon/react';
import { ChainLogo } from '@/components/atoms';

interface TokenColumnProps {
  title: string;
  columnType: ActiveTab;
  tokens: Token[];
  priceFlash: Record<string, 'up' | 'down' | null>;
  isLoading?: boolean;
  activePreset?: string | null;
  showDecimals?: boolean;
  onPresetClick?: (presetId: string) => void;
  onQuickBuy?: (token: Token) => void;
  className?: string;
}

export function TokenColumn({
  title,
  columnType,
  tokens,
  priceFlash,
  isLoading = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  activePreset,
  showDecimals = true,
  onPresetClick,
  onQuickBuy,
  className,
}: TokenColumnProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const presets = DEFAULT_PRESETS[columnType] || [];
  const isChainLoading = useAppSelector((state) => state.ui.isChainLoading);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: tokens.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 85,
    overscan: VIRTUAL_SCROLL_OVERSCAN,
  });

  const handlePresetClick = useCallback(
    (presetId: string) => {
      onPresetClick?.(presetId);
    },
    [onPresetClick]
  );

  return (
    <div className={`w-full flex flex-col h-full min-h-0 bg-[#101114] border-r border-[#1a1b2f] ${className || ''}`}>
      <div className="hidden lg:flex items-center justify-between px-3 py-1.5 border-b border-[#1a1a1f] bg-[#0c0c10] sticky top-0 z-10 mb-0.5">
        <h2 className="text-[12.5px] font-semibold text-white m-0">{title}</h2>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-[3px] border border-[#2a2a35] rounded-full bg-transparent">
            <div className="flex items-center gap-[3px]">
              <RiFlashlightFill className="w-3 h-3 text-[#6b6b7a]" />
              <span className="text-[10px] text-white mr-4">0</span>
            </div>

            <ChainLogo width={10} height={10} />
            <div className="w-[1px] h-3 bg-[#2a2a35]" />

            {presets.map((preset, index) => (
              <button
                key={preset.id}
                onClick={() => handlePresetClick(preset.id)}
                className={`p-0 px-[1px] text-[10px] font-medium border-none cursor-pointer bg-transparent ${index === 0 ? 'text-[#526fff]' : 'text-white'
                  }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          <button className="relative p-1 bg-none border-none text-white cursor-pointer flex items-center">
            <RiEqualizer3Fill className="w-[12px] h-[12px]" />
            <span className="absolute -top-0 -right-0.5 h-1 w-1 rounded-full bg-[#526fff]"></span>
          </button>
        </div>
      </div>

      <div
        ref={parentRef}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-color-[#2a2a35_transparent]"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#2a2a35 transparent' }}
      >
        {isLoading || isChainLoading ? (
          <div>
            {Array.from({ length: 10 }).map((_, i) => (
              <TokenCardSkeleton key={i} />
            ))}
          </div>
        ) : tokens.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-[#6b6b7a] text-[14px]">
            No tokens found
          </div>
        ) : (
          <div className="w-full relative" style={{ height: `${virtualizer.getTotalSize()}px` }}>
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const token = tokens[virtualRow.index];
              return (
                <div
                  key={token.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <TokenCard
                    token={token}
                    flashDirection={priceFlash[token.id]}
                    showDecimals={showDecimals}
                    onQuickBuy={onQuickBuy}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
