'use client';

import { useRef, useCallback, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useAppSelector } from '@/hooks';
import { type Token, type ActiveTab } from '@/types';
import { TokenCard } from './TokenCard';
import { TokenCardSkeleton } from '@/components/atoms';
import { DEFAULT_PRESETS, VIRTUAL_SCROLL_OVERSCAN } from '@/utils';
import { RiEqualizer3Line, RiFlashlightFill } from '@remixicon/react';
import { ChainLogo } from '@/components/atoms';
import { FilterModal } from '@/components/molecules';
import { setActiveModalTab } from '@/store/filterSlice';
import { useAppDispatch } from '@/hooks';

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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const presets = DEFAULT_PRESETS[columnType] || [];
  const isChainLoading = useAppSelector((state) => state.ui.isChainLoading);

  // Filter tokens based on search and exclude keywords
  const { filters } = useAppSelector((state) => state.filter);

  const tabName = columnType === 'newPairs' ? 'New Pairs' : columnType === 'finalStretch' ? 'Final Stretch' : 'Migrated';
  const config = filters[tabName] || { searchKeywords: '', excludeKeywords: '' };

  const {
    searchKeywords,
    excludeKeywords,
    sortBy,
    sortOrder,
    minMC, maxMC,
    minVol, maxVol,
    minTx, maxTx
  } = config;


  const parseValue = (val: string | number | undefined): number => {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const str = val.toString().toLowerCase()
      .replace(/[$,]/g, '')
      .replace('k', '000')
      .replace('m', '000000');
    return parseFloat(str) || 0;
  };

  const filteredTokens = tokens.filter((token) => {
    // 1. Keyword Search
    if (searchKeywords) {
      const searchTerms = searchKeywords.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
      const name = token.name.toLowerCase();
      const symbol = token.symbol.toLowerCase();
      const matchesSearch = searchTerms.length === 0 || searchTerms.some(term =>
        name.includes(term) || symbol.includes(term)
      );
      if (!matchesSearch) return false;
    }

    // 2. Exclude Keywords
    if (excludeKeywords) {
      const excludeTerms = excludeKeywords.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
      const name = token.name.toLowerCase();
      const symbol = token.symbol.toLowerCase();
      const matchesExclude = excludeTerms.some(term =>
        name.includes(term) || symbol.includes(term)
      );
      if (matchesExclude) return false;
    }

    // 3. Ranges
    if (minMC && parseValue(token.marketCap) < parseValue(minMC)) return false;
    if (maxMC && parseValue(token.marketCap) > parseValue(maxMC)) return false;


    if (minVol && parseValue(token.volume24h) < parseValue(minVol)) return false;
    if (maxVol && parseValue(token.volume24h) > parseValue(maxVol)) return false;

    if (minTx && parseValue(token.txCount) < parseValue(minTx)) return false;
    if (maxTx && parseValue(token.txCount) > parseValue(maxTx)) return false;

    return true;
  }).sort((a, b) => {
    if (!sortBy) return 0;

    let valA = 0;
    let valB = 0;

    switch (sortBy) {
      case 'mC':
        valA = parseValue(a.marketCap);
        valB = parseValue(b.marketCap);
        break;
      case 'volume':
        valA = parseValue(a.volume24h);
        valB = parseValue(b.volume24h);
        break;
      case 'tx':
        valA = parseValue(a.txCount);
        valB = parseValue(b.txCount);
        break;
      case 'liquidity':

        valA = 0;
        valB = 0;
        break;
    }

    return sortOrder === 'asc' ? valA - valB : valB - valA;
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: filteredTokens.length,
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

  const dispatch = useAppDispatch();
  const openFilterModal = () => {
    dispatch(setActiveModalTab(tabName));
    setIsFilterModalOpen(true);
  };

  return (
    <div className={`w-full flex flex-col h-full min-h-0 bg-[#101114] border-r border-[#1d1f26] ${className || ''}`}>
      <div className="hidden lg:flex items-center justify-between px-2 py-1.5 border-b border-[#1d1f26] bg-[#101114] sticky top-0 z-10 mb-0.5">
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

          <button
            onClick={openFilterModal}
            className="relative p-1 bg-none border-none text-white cursor-pointer flex items-center hover:text-[#526fff] transition-colors"
          >
            <RiEqualizer3Line className="w-[12px] h-[12px]" />
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
        ) : filteredTokens.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[#6b6b7a] space-y-2">
            <RiEqualizer3Line className="w-8 h-8 opacity-50" />
            <span className="text-[13px] font-medium">No matching Results</span>
            <button
              onClick={openFilterModal}
              className="text-[#526fff] text-[11px] hover:underline cursor-pointer"
            >
              Adjust Filters
            </button>
          </div>
        ) : (
          <div className="w-full relative" style={{ height: `${virtualizer.getTotalSize()}px` }}>
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const token = filteredTokens[virtualRow.index];
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

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />
    </div>
  );
}
