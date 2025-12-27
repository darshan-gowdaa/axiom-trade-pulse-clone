'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TokenAvatarCardProps {
    symbol: string;
    name: string;
    imageUrl: string;
    creator: string;
    ringColor: string;
}

export function TokenAvatarCard({
    symbol,
    name,
    imageUrl,
    creator,
    ringColor,
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
                <div className="absolute inset-0 rounded-[2px] overflow-hidden flex items-center justify-center">
                    {!imgError ? (
                        <>
                            <Image
                                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${symbol}`}
                                alt=""
                                fill
                                className="object-cover"
                                onError={() => setImgError(true)}
                                unoptimized
                            />
                            <Image
                                src={imageUrl}
                                alt={name}
                                fill
                                className={`object-cover transition-opacity duration-500 ease-in-out ${imgLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                onLoad={() => setImgLoaded(true)}
                                unoptimized
                            />
                        </>
                    ) : (
                        <span className="text-[14px] font-bold" style={{ color: ringColor }}>
                            {symbol.charAt(0)}
                        </span>
                    )}
                </div>
                <div
                    className="absolute bottom-[-4px] right-[-4px] w-4 h-4 bg-black rounded-full flex items-center justify-center z-10"
                    style={{ border: `1.5px solid ${ringColor}` }}
                />
            </div>
            <div className="mt-1.5 text-[8px] text-[#555] text-center font-bold">{creator}</div>
        </div>
    );
}
