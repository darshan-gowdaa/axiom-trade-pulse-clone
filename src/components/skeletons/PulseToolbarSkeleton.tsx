'use client';

export function PulseToolbarSkeleton() {
    return (
        <div className="bg-[#06070b] border-b border-[#1a1b23] animate-pulse">
            {/* Desktop */}
            <div className="hidden lg:block">
                <div className="flex items-center gap-2.5 px-4 lg:px-9 py-1 border-b border-[#1a1b23] overflow-visible -ml-4">
                    {/* Settings */}
                    <div className="w-3 h-3 bg-[#1a1b23] rounded " />
                    {/* Separator */}
                    <div className="w-[1px] h-3 bg-[#27272a]" />
                    {/* Watchlist */}
                    <div className="w-2.5 h-2.5 bg-[#1a1b23] rounded" />
                    {/* Active Positions */}
                    <div className="w-3 h-3 bg-[#1a1b23] rounded ml-1.5" />
                    {/* Separator */}
                    <div className="w-[1px] h-3 bg-[#27272a]" />
                </div>

                <div className="flex items-center justify-between px-4 lg:px-5 py-2 overflow-visible gap-4 mt-2">
                    <div className="flex items-center gap-1 shrink-0">
                        <div className="w-[38px] h-[22px] bg-[#1a1b23] rounded" /> {/* Pulse Text */}
                        <div className="w-24 h-[22px] bg-[#1a1b23] rounded-full" /> {/* Chain Selector */}
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                        <div className="w-6 h-6 bg-[#1a1b23] rounded p-1" /> {/* Help */}

                        <div className="w-20 h-6 bg-[#1a1b23] rounded-full" /> {/* Display */}

                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-6 h-6 bg-[#1a1b23] rounded-full" />
                            ))}
                        </div>

                        <div className="w-[100px] h-[26px] bg-[#1a1b23] rounded-full" /> {/* Wallet Pill */}
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="flex flex-col lg:hidden w-full">
                <div className="flex items-center justify-between px-2 py-1 w-full gap-2">
                    <div className="w-14 h-6 bg-[#1a1b23] rounded-full" />
                    <div className="flex-1 flex items-center gap-0.5">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-6 w-16 bg-[#1a1b23] rounded-full" />
                        ))}
                    </div>
                    <div className="w-10 h-6 bg-[#1a1b23] rounded-full" />
                </div>
            </div>
        </div>
    );
}
