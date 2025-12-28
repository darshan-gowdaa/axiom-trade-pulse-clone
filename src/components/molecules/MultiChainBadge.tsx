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
                    alt="Pump"
                    width={9}
                    height={9}
                    src="https://axiom.trade/images/pump.svg"
                    className=""
                />
                <OptimizedImage
                    alt="Bonk"
                    width={9}
                    height={9}
                    src="https://axiom.trade/images/bonk.svg"
                    className=""
                />
                <OptimizedImage
                    alt="Virtual Curve"
                    width={9}
                    height={9}
                    src="https://axiom.trade/images/virtual-curve.svg"
                    className=""
                />
            </div>
        </div>
    );
}
