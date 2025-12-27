'use client';

import React from 'react';
import { NotificationDot } from './NotificationDot';

interface NavButtonProps {
    icon: React.ReactNode;
    label?: string;
    className?: string;
    withDot?: boolean;
}

export const NavButton = ({
    icon,
    label,
    className = '',
    withDot = false,
}: NavButtonProps) => {
    const content = (
        <button
            className={`flex items-center gap-[3px] bg-none border-none text-[#6b6b7a] cursor-pointer text-[10px] ${className}`}
        >
            {icon}
            {label && <span className="text-[#fcfcfcfc]">{label}</span>}
        </button>
    );

    return withDot ? <NotificationDot>{content}</NotificationDot> : content;
};
