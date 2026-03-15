import React from 'react';

export function MobulaLogo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src="/icons/mobula.svg"
            alt="Mobula Logo"
            {...props}
        />
    );
}
