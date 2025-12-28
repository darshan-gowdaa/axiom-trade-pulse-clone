'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import {
    RiUserLine,
    RiSettings3Line,
    RiTranslate2,
    RiRocketLine,
    RiLogoutBoxLine
} from '@remixicon/react';

interface AccountSettingsDropdownProps {
    children: ReactNode;
}

export function AccountSettingsDropdown({ children }: AccountSettingsDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const menuItems = [
        { icon: RiUserLine, label: 'Account and Security' },
        { icon: RiSettings3Line, label: 'Settings' },
        { icon: RiTranslate2, label: 'Auto Translate' },
        { icon: RiRocketLine, label: 'Feature Updates' },
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>
                {children}
            </div>

            {isOpen && (
                <div className="absolute top-[calc(100%+8px)] right-0 z-50 w-[180px] py-2 bg-[#18181a] border border-[#2a2a38] rounded-md shadow-2xl animate-in fade-in zoom-in-95 duration-100 pt-0.5">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 hover:bg-[#1a1b23] transition-colors group"
                        >
                            <item.icon className="w-4 h-4 text-gray-400" />
                            <span className="text-[12px] font-semibold text-[#fcfcfc]">
                                {item.label}
                            </span>
                        </button>
                    ))}

                    <button
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 hover:bg-[#1a1b23] transition-colors group mt-0.5"
                    >
                        <RiLogoutBoxLine className="w-4 h-4 text-[#f43f5e]" />
                        <span className="text-[12px] font-semibold text-[#f43f5e]">
                            Log Out
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}
