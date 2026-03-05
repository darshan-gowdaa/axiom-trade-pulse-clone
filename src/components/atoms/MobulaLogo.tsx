import React from 'react';

export function MobulaLogo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/icons/mobula.svg"
            alt="Mobula Logo"
            {...props}
        />
    );
}
