'use client';

import { 
  RiExternalLinkLine, 
  RiTelegramLine, 
  RiTwitterXLine 
} from '@remixicon/react';
import { cn } from '@/lib/utils';
import { type TokenSocials } from '@/types';

interface SocialLinksProps {
  socials: TokenSocials;
  className?: string;
}

export function SocialLinks({ socials, className }: SocialLinksProps) {
  const links = [
    { key: 'twitter', url: socials.twitter, icon: RiTwitterXLine, label: 'Twitter/X' },
    { key: 'telegram', url: socials.telegram, icon: RiTelegramLine, label: 'Telegram' },
    { key: 'website', url: socials.website, icon: RiExternalLinkLine, label: 'Website' },
  ].filter(link => link.url);

  if (links.length === 0) return null;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {links.map(({ key, url, icon: Icon, label }) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          aria-label={label}
          onClick={(e) => e.stopPropagation()}
        >
          <Icon className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}
