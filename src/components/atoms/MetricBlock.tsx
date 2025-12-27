'use client';

import React from 'react';

interface MetricBlockProps {
    icon: React.ReactNode;
    text: string | number;
    color?: string;
    textClass?: string;
}

export const MetricBlock = ({
    icon,
    text,
    color = '#777a8c',
    textClass = 'text-[#fcfcfc]',
}: MetricBlockProps) => (
    <span className="flex items-center gap-1">
        <span style={{ color }}>{icon}</span>
        <span className={textClass}>{text}</span>
    </span>
);
