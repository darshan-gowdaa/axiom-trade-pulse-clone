'use client';

import { RiFlashlightFill } from '@remixicon/react';
import { ChainLogo } from '@/components/atoms';

interface PresetPillProps {
    activePreset?: 'P1' | 'P2' | 'P3';
    quickBuyAmount?: number | string;
    onPresetChange?: (preset: 'P1' | 'P2' | 'P3') => void;
}

const PRESETS = ['P1', 'P2', 'P3'] as const;

export function PresetPill({
    activePreset = 'P1',
    quickBuyAmount = 0,
    onPresetChange,
}: PresetPillProps) {
    return (
        <div className="flex items-center rounded-full border border-[#2a2a38] p-[3px] shrink-0">
            <div className="flex items-center gap-1.5 px-2 border-r border-[#2a2a38]">
                <RiFlashlightFill className="w-3 h-3 text-[#d4d4d8]" />
                <span className="text-white text-[11px] font-medium mr-8">{quickBuyAmount}</span>
                <ChainLogo width={11} height={11} />
            </div>
            <div className="flex items-center gap-2 px-2">
                {PRESETS.map((preset) => (
                    <button
                        key={preset}
                        onClick={() => onPresetChange?.(preset)}
                        className={`text-[11px] font-medium bg-transparent border-none cursor-pointer ${activePreset === preset ? 'text-[#526fff] font-bold' : 'text-[#6b6b7a]'
                            }`}
                    >
                        {preset}
                    </button>
                ))}
            </div>
        </div>
    );
}
