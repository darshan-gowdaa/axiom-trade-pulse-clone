'use client';

import { OptimizedImage } from '@/components/atoms';

export function MultiChainBadge() {
    return (
        <div
            className="relative flex items-center justify-center rounded-full p-[1px]"
            style={{
                background: 'linear-gradient(to right, rgb(83, 211, 142) 0%, rgb(231, 140, 25) 50%, rgb(255, 70, 98) 100%)',
                width: 'fit-content'
            }}
        >
            <div className="flex items-center gap-[0px] px-[0.5px] py-[0.5px] bg-[#06070b] rounded-full">
                <OptimizedImage
                    alt="Bonk"
                    width={9}
                    height={9}
                    src="/icons/bonk.svg"
                    className=""
                />
                <OptimizedImage
                    alt="Pump"
                    width={9}
                    height={9}
                    src="/icons/pump.svg"
                    className=""
                />
                <OptimizedImage
                    alt="Bags"
                    width={9}
                    height={9}
                    src="/icons/bags.svg"
                    className=""
                />
            </div>
        </div>
    );
}
