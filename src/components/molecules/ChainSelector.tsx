'use client';

import { SolanaLogo } from '@/components/atoms/SolanaLogo';
import { Tooltip } from '@/components/atoms';
import { useChain } from '@/hooks';

interface ChainSelectorProps {
    variant?: 'desktop' | 'mobile';
}

export function ChainSelector({ variant = 'desktop' }: ChainSelectorProps) {
    const { activeChain, changeChain } = useChain();

    if (variant === 'mobile') {
        return (
            <div className="relative flex items-center gap-0.5 shrink-0">
                <Tooltip content="Solana" position="right">
                    <button
                        onClick={() => changeChain('sol')}
                        className={`relative w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer ${activeChain === 'sol'
                            ? 'bg-[#16161e] border-[#2a2a38]'
                            : 'bg-transparent border-transparent'
                            }`}
                    >
                        <div className={`transition-opacity duration-300 ${activeChain === 'sol' ? 'opacity-100' : 'opacity-50'}`}>
                            <SolanaLogo width={15} height={15} />
                        </div>
                    </button>
                </Tooltip>
                <Tooltip content="BNB" position="right">
                    <button
                        onClick={() => changeChain('bnb')}
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${activeChain === 'bnb'
                            ? 'bg-[#16161e] border border-[#2a2a38]'
                            : 'bg-transparent border-transparent'
                            }`}
                    >
                        <img
                            src="https://axiom.trade/images/bnb-fill.svg"
                            alt="BNB"
                            className={`w-3.5 h-3.5 transition-opacity duration-300 ${activeChain === 'bnb' ? 'opacity-100' : 'opacity-50'
                                }`}
                        />
                    </button>
                </Tooltip>
            </div>
        );
    }

    // Desktop variant
    return (
        <div className="flex items-center gap-1 p-1">
            <Tooltip content="Solana">
                <button
                    onClick={() => changeChain('sol')}
                    className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${activeChain === 'sol'
                        ? 'bg-[#16181f]'
                        : 'bg-transparent hover:bg-[#27272a]'
                        }`}
                >
                    <div className={`transition-opacity duration-300 ${activeChain === 'sol' ? 'opacity-100' : 'opacity-50'}`}>
                        <SolanaLogo width={16} height={16} />
                    </div>
                </button>
            </Tooltip>
            <Tooltip content="BNB">
                <button
                    onClick={() => changeChain('bnb')}
                    className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${activeChain === 'bnb'
                        ? 'bg-[#16181f]'
                        : 'bg-transparent hover:bg-[#27272a]'
                        }`}
                >
                    <img
                        src="https://axiom.trade/images/bnb-fill.svg"
                        alt="BNB"
                        className={`w-3.5 h-3.5 transition-opacity duration-300 ${activeChain === 'bnb' ? 'opacity-100' : 'opacity-50'
                            }`}
                    />
                </button>
            </Tooltip>
        </div>
    );
}

