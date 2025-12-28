'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { useChain } from '@/hooks';
import { SolanaLogo } from '@/components/atoms/SolanaLogo';

interface ChainDropdownProps {
    children: ReactNode;
}

export function ChainDropdown({ children }: ChainDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { activeChain, changeChain } = useChain();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (chain: 'sol' | 'bnb') => {
        changeChain(chain);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>
                {children}
            </div>

            {isOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 z-50 w-[132px] p-1.5 bg-[#18181a] backdrop-blur-md border border-[#2a2a38] rounded-md shadow-xl animate-in fade-in zoom-in-95 duration-100">
                    <button
                        onClick={() => handleSelect('sol')}
                        className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md transition-all duration-200 group ${activeChain === 'sol'
                            ? 'bg-[#222329]'
                            : 'hover:bg-[#1f212c]'
                            }`}
                    >
                        <SolanaLogo width={16} height={16} />
                        <span className={`text-[12px] font-medium transition-colors ${activeChain === 'sol' ? 'text-white' : 'text-[#a1a1aa] group-hover:text-white'}`}>
                            Solana
                        </span>
                    </button>

                    <button
                        onClick={() => handleSelect('bnb')}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md transition-all duration-200 mt-0.5 group ${activeChain === 'bnb'
                            ? 'bg-[#1f212c]'
                            : 'hover:bg-[#1f212c]'
                            }`}
                    >
                        <img
                            src="https://axiom.trade/images/bnb-fill.svg"
                            alt="BNB"
                            className="w-4 h-4"
                        />
                        <span className={`text-[12px] font-medium transition-colors ${activeChain === 'bnb' ? 'text-white' : 'text-[#a1a1aa] group-hover:text-white'}`}>
                            BNB
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}
