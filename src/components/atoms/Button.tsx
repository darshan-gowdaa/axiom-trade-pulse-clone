'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--primary-blue)] text-white hover:bg-[var(--primary-blue-hover)]',
        secondary:
          'bg-[var(--background-card)] text-[var(--text-primary)] hover:bg-[var(--background-hover)] border border-[var(--border-default)]',
        ghost:
          'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-hover)]',
        success:
          'bg-[var(--primary-green)] text-white hover:opacity-90',
        danger:
          'bg-[var(--primary-red)] text-white hover:opacity-90',
      },
      size: {
        sm: 'h-6 px-2 text-xs rounded-full',
        md: 'h-8 px-3 text-sm rounded-full',
        lg: 'h-10 px-4 text-base rounded-full',
        icon: 'h-8 w-8 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="px-4 mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
