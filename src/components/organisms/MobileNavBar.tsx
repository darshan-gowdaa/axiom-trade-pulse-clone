'use client';

import { 
  RiPulseLine, 
  RiFireLine, 
  RiRadarLine, 
  RiArrowLeftRightLine, 
  RiAccountBoxLine, 
  RiExchangeLine,
  RiFolderUserLine
} from '@remixicon/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Trending', icon: RiFireLine, href: '/discover' },
  { label: 'Track', icon: RiRadarLine, href: '/trackers' },
  { label: 'Pulse', icon: RiPulseLine, href: '/pulse' },
  { label: 'Perpetuals', icon: RiExchangeLine, href: '/perpetuals' },
  { label: 'Account', icon: RiFolderUserLine, href: '/portfolio' },
];

export function MobileNavBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[48px] bg-[#0c0c10] border-t border-[#1a1b23] flex items-center w-full z-50 lg:hidden safe-area-bottom p-2">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.label === 'Pulse'
            ? pathname === '/' || pathname.startsWith('/pulse')
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 no-underline bg-transparent"
          >
            <item.icon
              className={`w-4 h-4 ${
                isActive ? 'text-white' : 'text-[#6b6b7a]'
              }`}
            />
            <span
              className={`text-[10px] font-medium ${
                isActive ? 'text-white' : 'text-[#6b6b7a]'
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
