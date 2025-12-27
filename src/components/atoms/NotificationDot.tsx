'use client';

import React from 'react';

interface NotificationDotProps {
    children: React.ReactNode;
}

export const NotificationDot = ({ children }: NotificationDotProps) => (
    <div className="relative inline-flex">
        {children}
        <span className="absolute -top-0.5 right-0 w-[4px] h-[4px] rounded-full bg-[#ec397a]" />
    </div>
);
