'use client';

export function HeaderSkeleton() {
    return (
        <header className="h-[35px] lg:h-[53px] bg-[#0c0c10] border-b border-[#1a1b23] select-none animate-pulse">
            {/* Desktop */}
            <div className="hidden lg:flex items-center justify-between px-[24px] h-full">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-8 bg-[#1a1b23] rounded-full" />
                        <div className="w-20 h-5 bg-[#1a1b23] rounded" />
                    </div>
                    <div className="flex items-center gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-12 h-3 bg-[#1a1b23] rounded" />
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex justify-center max-w-[200px] mx-5">
                    <div className="w-full h-7 bg-[#1a1b23] rounded-full" />
                </div>

                <div className="flex items-center gap-2.5">
                    <div className="w-20 h-7 bg-[#1a1b23] rounded-full" />
                    <div className="w-16 h-7 bg-[#526fff]/20 rounded-full" />
                    <div className="w-8 h-8 bg-[#1a1b23] rounded-full" />
                    <div className="w-8 h-8 bg-[#1a1b23] rounded-full" />
                    <div className="w-24 h-7 bg-[#1a1b23] rounded-full" />
                    <div className="w-6 h-6 bg-[#1a1b23] rounded-full" />
                    <div className="w-8 h-8 bg-[#1a1b23] rounded-full" />
                </div>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center justify-between px-2 h-full">
                <div className="w-5 h-5 bg-[#1a1b23] rounded-full" />
                <div className="flex items-center gap-1.5">
                    <div className="w-24 h-6 bg-[#1a1b23] rounded-full" />
                    <div className="w-16 h-6 bg-[#1a1b23] rounded-full" />
                    <div className="w-7 h-7 bg-[#1a1b23] rounded-full" />
                    <div className="w-7 h-7 bg-[#1a1b23] rounded-full" />
                    <div className="w-7 h-7 bg-[#1a1b23] rounded-full" />
                </div>
            </div>
        </header>
    );
}
