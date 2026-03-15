'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, Suspense } from 'react';
import { useAppDispatch, useAppSelector, useIsMobile, useMobulaWebSocket, usePrefetch, useTokens } from '@/hooks';
import { setActiveTab, setActivePreset, setIsMobile } from '@/store/uiSlice';
import { type Token, type ActiveTab } from '@/types';
import { PulseToolbarSkeleton } from '@/components/skeletons';
import { TokenColumn } from '@/components/organisms/TokenColumn';

// dedup tokens by ID
function dedup(tokens: Token[]): Token[] {
    const seen = new Set();
    return tokens.filter((t) => {
        if (seen.has(t.id)) return false;
        seen.add(t.id);
        return true;
    });
}

const PulseToolbar = dynamic(
    () => import('@/components/organisms/PulseToolbar').then(mod => ({ default: mod.PulseToolbar })),
    { loading: () => <PulseToolbarSkeleton />, ssr: false }
);

const BottomStatusBar = dynamic(
    () => import('@/components/organisms/BottomStatusBar').then(mod => ({ default: mod.BottomStatusBar })),
    { ssr: false }
);

// TokenColumn imported directly (not dynamically) — it's critical path content
// that must render ASAP to show data the instant WebSocket delivers it.

const MobileNavBar = dynamic(
    () => import('@/components/organisms/MobileNavBar').then(mod => ({ default: mod.MobileNavBar })),
    { ssr: false }
);

const componentImports = [
    () => import('@/components/organisms/PulseToolbar'),
    () => import('@/components/organisms/BottomStatusBar'),
    () => import('@/components/organisms/TokenColumn'),
    () => import('@/components/organisms/MobileNavBar'),
];

export function PulseContent() {
    const dispatch = useAppDispatch();
    const isMobile = useIsMobile();
    usePrefetch(componentImports);

    const { activeTab, displaySettings, activePresets, activeChain } = useAppSelector(
        (state) => state.ui
    );

    // connect websocket
    const wsState = useMobulaWebSocket(activeChain);

    const { data: rawNewPairs = [], isLoading: isNewPairsLoading } = useTokens('new');
    const { data: rawFinalStretch = [], isLoading: isFinalStretchLoading } = useTokens('finalStretch');
    const { data: rawMigrated = [], isLoading: isMigratedLoading } = useTokens('migrated');

    // dedup tokens
    const newPairs = useMemo(() => dedup(rawNewPairs), [rawNewPairs]);
    const finalStretch = useMemo(() => dedup(rawFinalStretch), [rawFinalStretch]);
    const migrated = useMemo(() => dedup(rawMigrated), [rawMigrated]);

    // check loading state
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleQuickBuy = (_token: Token) => {

    };

    const columnProps = {
        isLoading,
        showDecimals: displaySettings.showDecimals,
        onQuickBuy: handleQuickBuy,
    };

    const mobileClassName = 'w-full max-w-4xl border-l border-b border-[#1a1a1f] mx-auto';

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-[#06070b]">
            <Suspense fallback={<PulseToolbarSkeleton />}>
                <PulseToolbar activeTab={activeTab} onTabChange={handleTabChange} />
            </Suspense>

            {wsState.error && (
                <div className="px-4 py-1.5 bg-[#1a1a2e] text-[#fbbf24] text-xs text-center">
                    Warning: {wsState.error}
                </div>
            )}

            <div className={`flex-1 flex overflow-hidden min-h-0 px-2 lg:px-5 gap-1 ${isMobile ? 'pb-[50px] justify-center' : ''}`}>
                {isMobile ? (
                    <>
                        {activeTab === 'newPairs' && (
                            <TokenColumn
                                title="New Pairs"
                                columnType="newPairs"
                                tokens={newPairs}
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
                            activePreset={activePresets.newPairs}
                            onPresetClick={(id) => handlePresetClick('newPairs', id)}
                            className="flex-1"
                            {...columnProps}
                        />
                        <TokenColumn
                            title="Final Stretch"
                            columnType="finalStretch"
                            tokens={finalStretch}
                            activePreset={activePresets.finalStretch}
                            onPresetClick={(id) => handlePresetClick('finalStretch', id)}
                            className="flex-1"
                            {...columnProps}
                        />
                        <TokenColumn
                            title="Migrated"
                            columnType="migrated"
                            tokens={migrated}
                            activePreset={activePresets.migrated}
                            onPresetClick={(id) => handlePresetClick('migrated', id)}
                            className="flex-1"
                            {...columnProps}
                        />
                    </>
                )}
            </div>

            {!isMobile && <BottomStatusBar loading={isLoading} />}
        </div>
    );
}
