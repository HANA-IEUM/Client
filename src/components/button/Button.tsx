import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center transition-opacity duration-200 active:opacity-80 !font-bold',
  {
    variants: {
      intent: {
        disable: '!bg-btn-default-bg !text-text-placeholder cursor-not-allowed',
        gray: '!bg-line-light !text-text-secondary',
        green: '!bg-theme-primary !text-white',
        red: '!bg-accent-primary !text-white',
        mint: '!bg-theme-secondary !text-text-secondary',
        yellow: '!bg-btn-accent-bg !text-text-primary',
        pink: '!bg-accent-secondary !text-text-secondary',
        silver: '!bg-btn-default-bg !text-text-secondary',
      },
      size: {
        sm: 'px-3 py-1.5 !text-sm h-8',
        md: 'px-4 py-2 !text-base h-10',
        lg: 'px-6 py-3 !text-lg h-12',
        xl: 'px-8 py-4 !text-xl h-14',
        full: 'w-full !px-3.5 !py-1 !text-2xl !h-12',
        'full-lg': 'w-full px-6 py-3 !text-lg h-12',
      },
      font: {
        regular: '!font-hana-regular',
        bold: '!font-hana-bold',
        medium: '!font-hana-medium',
      },
      radius: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      intent: 'gray',
      size: 'md',
      font: 'bold',
      radius: 'lg',
    },
  }
);

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    VariantProps<typeof buttonVariants> {
  label?: string;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  label,
  className,
  intent = 'gray',
  size = 'md',
  font = 'bold',
  radius = 'lg',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading || intent === 'disable';

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={!loading && !isDisabled ? onClick : undefined}
      className={cn(
        buttonVariants({ intent, size, font, radius }),
        isDisabled && intent !== 'disable' && 'cursor-not-allowed opacity-50',
        className
      )}
      {...props}
    >
      {loading ? '처리중...' : label || children}
    </button>
  );
}
