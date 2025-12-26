'use client';

import { cn } from '@/lib/utils';
import { formatTimeAgo, truncateAddress } from '@/utils';
import { Badge } from '@/components/atoms';
import { 
  RiFileCopyLine, 
  RiCheckLine, 
  RiShieldCheckLine, 
  RiAlertLine 
} from '@remixicon/react';
import { useState } from 'react';

interface TokenInfoProps {
  name: string;
  symbol: string;
  address: string;
  createdAt: number;
  isVerified?: boolean;
  liquidityLocked?: boolean;
  className?: string;
}

export function TokenInfo({
  name,
  symbol,
  address,
  createdAt,
  isVerified,
  liquidityLocked,
  className,
}: TokenInfoProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={cn('min-w-0 flex-1', className)}>
      {/* Name and Symbol Row */}
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="font-semibold text-[var(--text-primary)] truncate">
          {name}
        </span>
        <span className="text-xs text-[var(--text-muted)] shrink-0">
          ${symbol}
        </span>
        <span className="text-xs text-[var(--text-muted)] shrink-0">
          • {formatTimeAgo(createdAt)}
        </span>
      </div>

      {/* Address and Badges Row */}
      <div className="flex items-center gap-1.5 mt-0.5">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          <span className="font-mono">{truncateAddress(address)}</span>
          {copied ? (
            <RiCheckLine className="h-3 w-3 text-[var(--primary-green)]" />
          ) : (
            <RiFileCopyLine className="h-3 w-3" />
          )}
        </button>

        {isVerified && (
          <Badge variant="success" size="sm">
            <RiShieldCheckLine className="h-2.5 w-2.5 mr-0.5" />
            Verified
          </Badge>
        )}

        {liquidityLocked && (
          <Badge variant="info" size="sm">
            🔒 Locked
          </Badge>
        )}

        {!isVerified && !liquidityLocked && (
          <Badge variant="warning" size="sm">
            <RiAlertLine className="h-2.5 w-2.5 mr-0.5" />
            Unverified
          </Badge>
        )}
      </div>
    </div>
  );
}
