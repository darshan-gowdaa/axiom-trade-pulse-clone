'use client';

import { useEffect, useState } from 'react';
import {
    RiEyeLine,
    RiGiftLine,
    RiMoneyDollarCircleLine,
    RiStarLine,
    RiGlobalLine,
    RiShieldUserLine,
    RiNotification3Line,
    RiTranslate2,
    RiRocketLine,
    RiWalletLine,
    RiBankCardLine,
    RiLogoutBoxRLine
} from '@remixicon/react';
import { ChainLogo } from '@/components/atoms';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) setShouldRender(true);
    }, [isOpen]);

    const handleAnimationEnd = () => {
        if (!isOpen) setShouldRender(false);
    };

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] lg:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >

            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />


            <div
                className={`absolute right-0 top-0 bottom-0 w-[280px] bg-[#101114] shadow-2xl transition-transform duration-300 ease-in-out md:w-[320px] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onTransitionEnd={handleAnimationEnd}
            >

                <div className="p-3">
                    <div className="relative overflow-hidden rounded-lg border border-[#2a2a38] p-3">

                        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-yellow-600 to-red-600 opacity-80" />

                        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/45"></div>


                        <div className="relative z-10 flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <div className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0">
                                    <span className="text-white font-bold text-[12px]">US</span>
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#14f195] border-2 border-[#101114] rounded-full" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-white font-bold text-[13px] truncate">User</div>
                                    <div className="flex items-center gap-1.5 text-[#d4d4d8] text-[10px] pt-0.5">
                                        <span className="truncate">0 wallets</span>
                                        <span className="w-0.5 h-0.5 rounded-full bg-[#d4d4d8] flex-shrink-0" />
                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            <ChainLogo width={11} height={11} />
                                            <span>0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-black/40 rounded-full border border-white/10 flex-shrink-0 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#14f195]" />
                                <span className="text-[9px] font-medium text-white">0</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-4">

                    <div className="space-y-1.5">
                        <div className="text-[#64748b] text-[9px] font-semibold uppercase tracking-wider mb-1.5">Navigation</div>
                        <MenuItem icon={RiEyeLine} label="Vision" />
                        <MenuItem icon={RiGiftLine} label="Rewards" />
                        <MenuItem icon={RiMoneyDollarCircleLine} label="Yield" />
                        <MenuItem icon={RiStarLine} label="Watchlist" />
                    </div>


                    <div className="space-y-1.5">
                        <div className="text-[#64748b] text-[9px] font-semibold uppercase tracking-wider mb-1.5">Settings</div>
                        <MenuItem icon={RiGlobalLine} label="Regions" />
                        <MenuItem icon={RiShieldUserLine} label="Account and Security" />
                        <MenuItem icon={RiNotification3Line} label="Notifications" />
                        <MenuItem icon={RiTranslate2} label="Auto Translate" />
                        <MenuItem icon={RiRocketLine} label="Feature Updates" />
                    </div>


                    <div className="space-y-1.5">
                        <div className="text-[#64748b] text-[9px] font-semibold uppercase tracking-wider mb-1.5">Account</div>
                        <MenuItem icon={RiWalletLine} label="Deposit" />
                        <MenuItem icon={RiBankCardLine} label="Withdraw" />
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-transparent border border-[#2a2a38] rounded-lg hover:bg-[#1a1b23] transition-colors group">
                            <RiLogoutBoxRLine className="w-4.5 h-4.5 text-[#f43f5e]" />
                            <span className="text-[12px] font-semibold text-[#f43f5e]">Log Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MenuItem({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <div className="w-full flex items-center gap-2 px-2 py-2.5 bg-transparent border border-[#2a2a38] rounded-lg cursor-not-allowed group text-left">
            <Icon className="w-4.5 h-4.5 text-white flex-shrink-0" />
            <span className="text-[12px] font-semibold text-white flex-1 min-w-0 truncate">{label}</span>
        </div>
    );
}
