'use client';

import { SolanaLogo } from '@/components/atoms/SolanaLogo';

interface ChainSelectorProps {
    variant?: 'desktop' | 'mobile';
    activeChain?: 'sol' | 'bnb';
    onChainChange?: (chain: 'sol' | 'bnb') => void;
}

export function ChainSelector({
    variant = 'desktop',
    activeChain = 'sol',
    onChainChange,
}: ChainSelectorProps) {
    if (variant === 'mobile') {
        return (
            <div className="flex items-center gap-0.5 shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#16161e] flex items-center justify-center border border-[#2a2a38]">
                    <SolanaLogo width={15} height={15} />
                </div>
                <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center">
                    <img src="https://axiom.trade/images/bnb-fill.svg" alt="BNB" className="w-3.5 h-3.5 opacity-50" />
                </div>
            </div>
        );
    }

    // Desktop variant
    return (
        <div className="flex items-center gap-1 p-1">
            <button
                onClick={() => onChainChange?.('sol')}
                className="w-6 h-6 flex items-center justify-center bg-[#16181f] rounded-full text-[#22d3ee] cursor-pointer"
            >
                <SolanaLogo width={16} height={16} />
            </button>
            <button
                onClick={() => onChainChange?.('bnb')}
                className="w-6 h-6 flex items-center justify-center hover:bg-[#27272a] rounded-full cursor-pointer transition-colors"
            >
                <img
                    src="https://axiom.trade/images/bnb-fill.svg"
                    alt="BNB"
                    className="w-3.5 h-3.5 opacity-50"
                />
            </button>
        </div>
    );
}
