'use client';

export function PulseToolbarSkeleton() {
    return (
        <div className="bg-[#06070b] border-b border-[#1a1b23] animate-pulse">
            {/* Desktop */}
            <div className="hidden lg:block">
                <div className="flex items-center gap-2.5 px-4 lg:px-9 py-1 border-b border-[#1a1b23]">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-3 h-3 bg-[#1a1b23] rounded" />
                    ))}
                </div>

                <div className="flex items-center justify-between px-4 lg:px-7 py-2 gap-4 mt-2">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-5 bg-[#1a1b23] rounded" />
                        <div className="w-20 h-6 bg-[#1a1b23] rounded-full" />
                    </div>

                    <div className="flex items-center gap-2.5">
                        <div className="w-4 h-4 bg-[#1a1b23] rounded" />
                        <div className="w-20 h-6 bg-[#1a1b23] rounded-full" />
                        <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-6 h-6 bg-[#1a1b23] rounded" />
                            ))}
                        </div>
                        <div className="w-28 h-7 bg-[#1a1b23] rounded-full" />
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="flex flex-col lg:hidden w-full">
                <div className="flex items-center justify-between px-2 py-1 gap-2">
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
