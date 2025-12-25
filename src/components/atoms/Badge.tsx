'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center font-medium',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--background-card)] text-[var(--text-secondary)]',
        success:
          'bg-[var(--primary-green-bg)] text-[var(--primary-green)]',
        danger:
          'bg-[var(--primary-red-bg)] text-[var(--primary-red)]',
        warning:
          'bg-amber-500/15 text-amber-400',
        info:
          'bg-[var(--primary-blue)]/15 text-[var(--primary-blue)]',
      },
      size: {
        sm: 'h-4 px-1.5 text-[10px] rounded',
        md: 'h-5 px-2 text-xs rounded',
        lg: 'h-6 px-2.5 text-sm rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

export function Badge({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
}
