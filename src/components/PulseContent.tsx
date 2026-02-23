'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector, useIsMobile, useMobulaWebSocket, useTokens } from '@/hooks';
import { setActiveTab, setActivePreset, setIsMobile } from '@/store/uiSlice';
import { TokenColumn, PulseToolbar, BottomStatusBar, MobileNavBar } from '@/components/organisms';
import { type Token, type ActiveTab } from '@/types';

export function PulseContent() {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  const { priceFlash } = useAppSelector(
    (state) => state.tokens
  );
  const { activeTab, displaySettings, activePresets, activeChain } = useAppSelector(
    (state) => state.ui
  );

  // Connect to Mobula WebSocket with the active chain
  const wsState = useMobulaWebSocket(activeChain);

  const { data: newPairs = [], isLoading: isNewPairsLoading } = useTokens('new');
  const { data: finalStretch = [], isLoading: isFinalStretchLoading } = useTokens('finalStretch');
  const { data: migrated = [], isLoading: isMigratedLoading } = useTokens('migrated');

  // Show loading if no data yet (WebSocket hasn't sent init)
  const isLoading = (isNewPairsLoading || isFinalStretchLoading || isMigratedLoading)
    || (newPairs.length === 0 && finalStretch.length === 0 && migrated.length === 0 && !wsState.error);

  useEffect(() => {
    dispatch(setIsMobile(isMobile));
  }, [dispatch, isMobile]);

  const handleTabChange = (tab: ActiveTab) => {
    dispatch(setActiveTab(tab));
  };

  const handlePresetClick = (columnType: ActiveTab, presetId: string) => {
    const currentPreset = activePresets[columnType];
    dispatch(
      setActivePreset({
        tab: columnType,
        presetId: currentPreset === presetId ? null : presetId,
      })
    );
  };

  const handleQuickBuy = (token: Token) => {
    console.log('Quick buy:', token.symbol);
  };

  const columnProps = {
    isLoading,
    showDecimals: displaySettings.showDecimals,
    onQuickBuy: handleQuickBuy,
  };

  const mobileClassName = 'w-full max-w-4xl border-l border-b border-[#1a1a1f] mx-auto';

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#06070b]">
      {/* Pulse Toolbar */}
      <PulseToolbar activeTab={activeTab} onTabChange={handleTabChange} />

      {wsState.error && (
        <div className="px-4 py-1.5 bg-[#1a1a2e] text-[#fbbf24] text-xs text-center">
          Warning: {wsState.error}
        </div>
      )}

      {/* Token Columns - Only this section scrolls */}
      <div className={`flex-1 flex overflow-hidden min-h-0 px-2 lg:px-7 gap-1 ${isMobile ? 'pb-[50px] justify-center' : ''}`}>
        {isMobile ? (
          <>
            {activeTab === 'newPairs' && (
              <TokenColumn
                title="New Pairs"
                columnType="newPairs"
                tokens={newPairs}
                priceFlash={priceFlash}
                activePreset={activePresets.newPairs}
                onPresetClick={(id) => handlePresetClick('newPairs', id)}
                className={mobileClassName}
                {...columnProps}
              />
            )}
            {activeTab === 'finalStretch' && (
              <TokenColumn
                title="Final Stretch"
                columnType="finalStretch"
                tokens={finalStretch}
                priceFlash={priceFlash}
                activePreset={activePresets.finalStretch}
                onPresetClick={(id) => handlePresetClick('finalStretch', id)}
                className={mobileClassName}
                {...columnProps}
              />
            )}
            {activeTab === 'migrated' && (
              <TokenColumn
                title="Migrated"
                columnType="migrated"
                tokens={migrated}
                priceFlash={priceFlash}
                activePreset={activePresets.migrated}
                onPresetClick={(id) => handlePresetClick('migrated', id)}
                className={mobileClassName}
                {...columnProps}
              />
            )}
            <MobileNavBar />
          </>
        ) : (
          <>
            <TokenColumn
              title="New Pairs"
              columnType="newPairs"
              tokens={newPairs}
              priceFlash={priceFlash}
              activePreset={activePresets.newPairs}
              onPresetClick={(id) => handlePresetClick('newPairs', id)}
              className="flex-1"
              {...columnProps}
            />
            <TokenColumn
              title="Final Stretch"
              columnType="finalStretch"
              tokens={finalStretch}
              priceFlash={priceFlash}
              activePreset={activePresets.finalStretch}
              onPresetClick={(id) => handlePresetClick('finalStretch', id)}
              className="flex-1"
              {...columnProps}
            />
            <TokenColumn
              title="Migrated"
              columnType="migrated"
              tokens={migrated}
              priceFlash={priceFlash}
              activePreset={activePresets.migrated}
              onPresetClick={(id) => handlePresetClick('migrated', id)}
              className="flex-1"
              {...columnProps}
            />
          </>
        )}
      </div>

      {/* Bottom Status Bar - Sticky at bottom - Hide on Mobile */}
      {!isMobile && <BottomStatusBar loading={isLoading} />}
    </div>
  );
}
