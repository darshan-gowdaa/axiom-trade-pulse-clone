'use client';

import { ExternalLink, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type TokenSocials } from '@/types';

interface SocialLinksProps {
  socials: TokenSocials;
  className?: string;
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <MessageCircle className={className} />
  );
}

export function SocialLinks({ socials, className }: SocialLinksProps) {
  const links = [
    { key: 'twitter', url: socials.twitter, icon: XIcon, label: 'Twitter/X' },
    { key: 'telegram', url: socials.telegram, icon: TelegramIcon, label: 'Telegram' },
    { key: 'website', url: socials.website, icon: ExternalLink, label: 'Website' },
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
