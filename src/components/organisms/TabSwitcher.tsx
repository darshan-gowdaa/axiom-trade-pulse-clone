'use client';

import { cn } from '@/lib/utils';
import { type ActiveTab } from '@/types';
import { Button } from '@/components/atoms';

interface TabSwitcherProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  counts?: {
    newPairs: number;
    finalStretch: number;
    migrated: number;
  };
  className?: string;
}

const tabs: { id: ActiveTab; label: string }[] = [
  { id: 'newPairs', label: 'New Pairs' },
  { id: 'finalStretch', label: 'Final Stretch' },
  { id: 'migrated', label: 'Migrated' },
];

export function TabSwitcher({
  activeTab,
  onTabChange,
  counts,
  className,
}: TabSwitcherProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-1 p-1 bg-[var(--background-card)] rounded-full',
        className
      )}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex-1 gap-1.5',
            activeTab !== tab.id && 'hover:bg-[var(--background-hover)]'
          )}
        >
          <span>{tab.label}</span>
          {counts && (
            <span className="text-[10px] opacity-70">
              ({counts[tab.id]})
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}
