'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TokenAvatarCardProps {
    symbol: string;
    name: string;
    imageUrl: string;
    creator: string;
    ringColor: string;
    priority?: boolean;
}

export function TokenAvatarCard({
    symbol,
    name,
    imageUrl,
    creator,
    ringColor,
    priority = false,
}: TokenAvatarCardProps) {
    const [imgError, setImgError] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <div className="shrink-0 w-[55px] relative">
            <div className="relative w-[55px] h-[55px]">
                <div
                    className="absolute inset-[-2px] rounded-[3px]"
                    style={{ border: `1.5px solid ${ringColor}`, boxShadow: `0 0 4px ${ringColor}40` }}
                />
                <div className="absolute inset-[1px] rounded-[2px] overflow-hidden flex items-center justify-center bg-[#1a1b23]">
                    {!imgError ? (
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className={`object-cover transition-opacity duration-300 ease-in-out z-10 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImgLoaded(true)}
                            onError={() => setImgError(true)}
                            sizes="55px"
                            unoptimized={true}
                            loading={priority ? "eager" : "lazy"}
                            priority={priority}
                        />
                    ) : (
                        <span className="text-[14px] font-bold" style={{ color: ringColor }}>
                            {symbol.charAt(0)}
                        </span>
                    )}
                </div>
                {/* Pump.fun Medicine Logo Badge */}
                <div
                    className="absolute bottom-[-2px] right-[-4px] min-w-[20px] h-[14px] px-1 bg-black rounded-full flex items-center justify-center z-20 overflow-hidden"
                    style={{ border: `1.5px solid ${ringColor}` }}
                >
                    <Image
                        src="/icons/pump-small.svg"
                        alt="Pump"
                        width={14}
                        height={8}
                        className="object-contain"
                        unoptimized={true}
                        priority={priority}
                        loading={priority ? "eager" : "lazy"}
                    />
                </div>
            </div>
            <div className="mt-1.5 text-[8px] text-[#555] text-center font-bold px-0.5 truncate">{creator}</div>
        </div>
    );
}
