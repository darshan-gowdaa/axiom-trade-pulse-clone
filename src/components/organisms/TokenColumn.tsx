'use client';

import { useRef, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { type Token, type ActiveTab } from '@/types';
import { TokenCard } from './TokenCard';
import { TokenCardSkeleton } from '@/components/atoms';
import { DEFAULT_PRESETS, VIRTUAL_SCROLL_OVERSCAN } from '@/utils';
import { Settings2, SlidersHorizontal, Zap, List } from 'lucide-react';
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
  activePreset,
  showDecimals = true,
  onPresetClick,
  onQuickBuy,
  className,
}: TokenColumnProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const presets = DEFAULT_PRESETS[columnType] || [];

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
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        backgroundColor: '#06070b',
        borderRight: '1px solid #1a1a1f',
      }}
      className={className}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 12px',
          borderBottom: '1px solid #1a1a1f',
          backgroundColor: '#0c0c10',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <h2 style={{ fontSize: '13px', fontWeight: 600, color: '#fcfcfc', margin: 0 }}>{title}</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 8px',
              border: '1px solid #2a2a35',
              borderRadius: '999px',
              backgroundColor: 'transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Zap style={{ width: '12px', height: '12px', color: '#6b6b7a' }} />
              <span style={{ fontSize: '11px', color: '#6b6b7a' }}>0</span>
            </div>

            <SolanaLogo width={12} height={10} />

            <div style={{ width: '1px', height: '12px', backgroundColor: '#2a2a35' }} />

            {presets.map((preset, index) => (
              <button
                key={preset.id}
                onClick={() => handlePresetClick(preset.id)}
                style={{
                  padding: '0 2px',
                  fontSize: '10px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  color: index === 0 ? '#526fff' : '#6b6b7a',
                }}
              >
                {preset.name}
              </button>
            ))}
          </div>

          <button
            style={{
              padding: '4px',
              background: 'none',
              border: 'none',
              color: '#6b6b7a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SlidersHorizontal style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </div>

      <div
        ref={parentRef}
        style={{
          flex: 1,
          overflowY: 'auto',
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '96px',
              color: '#6b6b7a',
              fontSize: '14px',
            }}
          >
            No tokens found
          </div>
        ) : (
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
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
