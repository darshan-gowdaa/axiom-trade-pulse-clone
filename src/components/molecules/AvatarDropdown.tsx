'use client';

import { useState, useRef, useCallback } from 'react';
import { RiGroup3Line, RiUserLine } from '@remixicon/react';

interface AvatarDropdownProps {
    children: React.ReactNode;
}

interface MenuItemProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onClick?: () => void;
}

function MenuItem({ icon, title, subtitle, onClick }: MenuItemProps) {
    return (
        <button
            onClick={onClick}
            className="group flex items-start gap-2 w-full px-1.5 py-1.5 bg-transparent border-none cursor-pointer hover:bg-[#1e2736] transition-colors rounded text-left"
        >
            <div className="text-[#a1a1aa] mt-0.5">{icon}</div>
            <div className="flex flex-col">
                <span className="text-[#fcfcfc] text-[12px] font-medium">{title}</span>
                <span className="text-[#6b6b7a] group-hover:text-[#a1a1aa] text-[10px] transition-colors">{subtitle}</span>
            </div>
        </button>
    );
}

export function AvatarDropdown({ children }: AvatarDropdownProps) {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showDropdown = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsVisible(true), 100);
    }, []);

    const hideDropdown = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsVisible(false), 150);
    }, []);

    return (
        <div
            className="relative"
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
        >
            {children}
            <div
                className={`absolute z-[9999] top-full right-0 mt-2 min-w-[135px] p-0.5 bg-[#16161e] border border-[#2a2a38] rounded-md shadow-xl transition-all duration-150 ease-out ${isVisible
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                style={{ transformOrigin: 'top right' }}
            >
                <MenuItem
                    icon={<RiGroup3Line className="w-3.5 h-3.5" />}
                    title="Lobby"
                    subtitle="Open social lobby"
                />
                <MenuItem
                    icon={<RiUserLine className="w-3.5 h-3.5" />}
                    title="Profile"
                    subtitle="View your profile"
                />
            </div>
        </div>
    );
}

