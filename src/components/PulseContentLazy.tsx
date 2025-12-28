'use client';

import dynamic from 'next/dynamic';
import { useEffect, Suspense } from 'react';
import { useAppDispatch, useAppSelector, useIsMobile, useWebSocketSimulation, usePrefetch, useTokens } from '@/hooks';
import { setActiveTab, setActivePreset, setIsMobile } from '@/store/uiSlice';
import { type Token, type ActiveTab } from '@/types';
import { PulseToolbarSkeleton, TokenColumnSkeleton } from '@/components/skeletons';

const PulseToolbar = dynamic(
    () => import('@/components/organisms/PulseToolbar').then(mod => ({ default: mod.PulseToolbar })),
    { loading: () => <PulseToolbarSkeleton />, ssr: false }
);

const BottomStatusBar = dynamic(
    () => import('@/components/organisms/BottomStatusBar').then(mod => ({ default: mod.BottomStatusBar })),
    { ssr: false }
);

const TokenColumn = dynamic(
    () => import('@/components/organisms/TokenColumn').then(mod => ({ default: mod.TokenColumn })),
    { loading: () => <TokenColumnSkeleton className="flex-1" />, ssr: false }
);

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

export function PulseContentLazy() {
    const dispatch = useAppDispatch();
    const isMobile = useIsMobile();
    usePrefetch(componentImports);

    const { priceFlash } = useAppSelector(
        (state) => state.tokens
    );
    const { activeTab, displaySettings, activePresets } = useAppSelector(
        (state) => state.ui
    );

    const { data: newPairs = [], isLoading: isNewPairsLoading } = useTokens('new');
    const { data: finalStretch = [], isLoading: isFinalStretchLoading } = useTokens('finalStretch');
    const { data: migrated = [], isLoading: isMigratedLoading } = useTokens('migrated');

    const isLoading = isNewPairsLoading || isFinalStretchLoading || isMigratedLoading;

    useWebSocketSimulation();

    // Removed useEffect that utilized setTokens and setLoading

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
            <Suspense fallback={<PulseToolbarSkeleton />}>
                <PulseToolbar activeTab={activeTab} onTabChange={handleTabChange} />
            </Suspense>

            <div className={`flex-1 flex overflow-hidden min-h-0 px-2 lg:px-5 gap-1 ${isMobile ? 'pb-[50px] justify-center' : ''}`}>
                {isMobile ? (
                    <>
                        {activeTab === 'newPairs' && (
                            <Suspense fallback={<TokenColumnSkeleton className={mobileClassName} />}>
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
                            </Suspense>
                        )}
                        {activeTab === 'finalStretch' && (
                            <Suspense fallback={<TokenColumnSkeleton className={mobileClassName} />}>
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
                            </Suspense>
                        )}
                        {activeTab === 'migrated' && (
                            <Suspense fallback={<TokenColumnSkeleton className={mobileClassName} />}>
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
                            </Suspense>
                        )}
                        <MobileNavBar />
                    </>
                ) : (
                    <>
                        <Suspense fallback={<TokenColumnSkeleton className="flex-1" />}>
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
                        </Suspense>
                        <Suspense fallback={<TokenColumnSkeleton className="flex-1" />}>
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
                        </Suspense>
                        <Suspense fallback={<TokenColumnSkeleton className="flex-1" />}>
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
                        </Suspense>
                    </>
                )}
            </div>

            {!isMobile && <BottomStatusBar loading={isLoading} />}
        </div>
    );
}
