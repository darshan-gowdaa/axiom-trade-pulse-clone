'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TokenAvatarCardProps {
    symbol: string;
    name: string;
    imageUrl: string;
    creator: string;
    ringColor: string;
    exchangeLogo?: string;
    exchangeName?: string;
}

export function TokenAvatarCard({
    symbol,
    name,
    imageUrl,
    creator,
    ringColor,
    exchangeLogo,
    exchangeName,
}: TokenAvatarCardProps) {
    const [imgError, setImgError] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [badgeError, setBadgeError] = useState(false);

    // fallback to local pump icon if no exchange logo
    const badgeSrc = (!badgeError && exchangeLogo) || '/icons/pump-small.svg';
    const badgeAlt = exchangeName || 'Exchange';

    return (
        <div className="shrink-0 w-[55px] relative">
            <div className="relative w-[55px] h-[55px]">

                <div
                    className="absolute inset-[-2px] rounded-lg"
                    style={{ border: `1.5px solid ${ringColor}`, boxShadow: `0 0 4px ${ringColor}40` }}
                />

                <div className="absolute inset-[1px] rounded-[6px] overflow-hidden flex items-center justify-center bg-[#1a1b23]">
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
                            loading="lazy"
                        />
                    ) : (
                        <span className="text-[14px] font-bold" style={{ color: ringColor }}>
                            {symbol.charAt(0)}
                        </span>
                    )}
                </div>

                <div
                    className="absolute bottom-[-3px] right-[-3px] w-[18px] h-[18px] bg-black rounded-full flex items-center justify-center z-20 overflow-hidden"
                    style={{ border: `1.5px solid ${ringColor}` }}
                >
                    <Image
                        src={badgeSrc}
                        alt={badgeAlt}
                        width={12}
                        height={12}
                        className="object-contain"
                        unoptimized={true}
                        loading="lazy"
                        onError={() => setBadgeError(true)}
                    />
                </div>
            </div>
            <div className="mt-1.5 text-[8px] text-[#555] text-center font-bold px-0.5 truncate">{creator}</div>
        </div>
    );
}
