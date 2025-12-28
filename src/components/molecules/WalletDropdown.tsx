'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import {
    RiFileCopyLine,
    RiArrowLeftRightLine
} from '@remixicon/react';
import { ChainLogo, OptimizedImage } from '@/components/atoms';

interface WalletDropdownProps {
    children: ReactNode;
}

export function WalletDropdown({ children }: WalletDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>
                {children}
            </div>

            {isOpen && (
                <>
                    <div className="fixed inset-x-0 bottom-0 top-[35px] lg:top-[53px] bg-black/50 backdrop-blur-[2px] z-40 cursor-default" />
                    <div className="absolute top-[calc(100%+8px)] right-0 z-50 w-[220px] p-3 bg-[#18181a]/95 backdrop-blur-sm border border-[#2a2a38] rounded-l shadow-2xl animate-in fade-in zoom-in-95 duration-100">

                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] text-[#94a3b8] font-medium">Total Value</span>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-1 text-[10px] text-[#94a3b8] hover:text-white transition-colors">
                                    <RiFileCopyLine className="w-3 h-3" />
                                    <span>Solana</span>
                                </button>
                                <button className="flex items-center gap-1 text-[10px] text-[#94a3b8] hover:text-white transition-colors">
                                    <RiFileCopyLine className="w-3 h-3" />
                                    <span>Perps</span>
                                </button>
                            </div>
                        </div>


                        <div className="text-[18px] font-bold text-white mb-3">
                            $0
                        </div>


                        <div className="flex items-center justify-between py-2 border-t border-[#2a2a38] border-b mb-4">

                            <div className="flex items-center gap-1">
                                <ChainLogo width={16} height={16} />
                                <span className="text-[14px] font-semibold text-white">0</span>
                            </div>


                            <RiArrowLeftRightLine className="w-4 h-4 text-[#64748b]" />


                            <div className="flex items-center gap-1">
                                <OptimizedImage src="https://axiom.trade/images/usdc-perps.svg" alt="USDC" width={18} height={18} />
                                <span className="text-[14px] font-semibold text-white">0</span>
                            </div>
                        </div>


                        <div className="flex gap-2">
                            <button className="flex-1 bg-[#526fff] hover:bg-[#465ecc] text-black text-[11px] font-bold py-0.5 rounded-full transition-colors">
                                Deposit
                            </button>
                            <button className="flex-1 bg-[#2a2a35] hover:bg-[#32323e] text-white text-[11px] font-bold py-0.5 rounded-full transition-colors">
                                Withdraw
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
