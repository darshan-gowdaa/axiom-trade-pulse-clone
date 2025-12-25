'use client';

import { useRef, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { type Token, type ActiveTab } from '@/types';
import { TokenCard } from './TokenCard';
import { TokenCardSkeleton } from '@/components/atoms';
import { DEFAULT_PRESETS, VIRTUAL_SCROLL_OVERSCAN } from '@/utils';
import { SlidersHorizontal, Zap } from 'lucide-react';
import { SolanaLogo } from '@/components/atoms/SolanaLogo';

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
    <div
      className={`w-full flex flex-col h-full min-h-0 bg-[#06070b] border-r border-[#1a1a1f] ${className || ''}`}
    >
      <div className="hidden lg:flex items-center justify-between px-3 py-1.5 border-b border-[#1a1a1f] bg-[#0c0c10] sticky top-0 z-10">
        <h2 className="text-[13px] font-semibold text-[#fcfcfc] m-0">{title}</h2>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-[3px] border border-[#2a2a35] rounded-full bg-transparent">
            <div className="flex items-center gap-[3px]">
              <Zap className="w-3 h-3 text-[#6b6b7a]" />
              <span className="text-[11px] text-[#6b6b7a]">0</span>
            </div>

            <SolanaLogo width={12} height={10} />

            <div className="w-[1px] h-3 bg-[#2a2a35]" />

            {presets.map((preset, index) => (
              <button
                key={preset.id}
                onClick={() => handlePresetClick(preset.id)}
                className={`p-0 px-[2px] text-[10px] font-medium border-none cursor-pointer bg-transparent ${
                  index === 0 ? 'text-[#526fff]' : 'text-[#6b6b7a]'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          <button className="p-1 bg-none border-none text-[#6b6b7a] cursor-pointer flex items-center">
            <SlidersHorizontal className="w-[14px] h-[14px]" />
          </button>
        </div>
      </div>

      <div
        ref={parentRef}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-color-[#2a2a35_transparent]"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#2a2a35 transparent',
        }}
      >
        {isLoading ? (
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
          <div
            className="w-full relative"
            style={{
              height: `${virtualizer.getTotalSize()}px`,
            }}
          >
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
