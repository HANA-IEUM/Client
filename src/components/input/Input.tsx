import {
  Input as AntInput,
  type InputProps as AntInputProps,
  type InputRef,
} from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/lib/cn';

const inputVariants = cva('transition-all duration-200 !text-2xl', {
  variants: {
    intent: {
      green:
        '!border-line focus:!border-theme-primary focus:!ring-0 focus:!shadow-[0_0_0_2px_rgba(0,132,133,0.2)]',
      red: '!border-line focus:!border-[#e90061] focus:!ring-0 focus:!shadow-[0_0_0_2px_rgba(233,0,97,0.2)]',
    },
    font: {
      regular: '!font-hana-regular',
      bold: '!font-hana-bold',
    },
  },
  defaultVariants: {
    intent: 'green',
    font: 'regular',
  },
});

type InputVariants = VariantProps<typeof inputVariants>;

interface CustomInputProps
  extends Omit<AntInputProps, 'variant'>,
    InputVariants {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<InputRef, CustomInputProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      intent = 'green',
      font = 'regular',
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <AntInput
          ref={ref}
          className={cn(
            inputVariants({ intent, font }),
            'h-12 rounded-md !border-2',
            'text-text-primary',
            'placeholder:text-text-placeholder',
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
            error &&
              '!border-red-500 focus:!border-red-500 focus:!shadow-[0_0_0_2px_rgba(239,68,68,0.2)] focus:!ring-0',
            className
          )}
          size="large"
          disabled={disabled}
          status={error ? 'error' : undefined}
          {...props}
        />

        {(error || helperText) && (
          <div className="mt-2">
            {error && (
              <p className="!font-hana-regular !text-base text-red-600">
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="!font-hana-regular text-text-secondary !text-base">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
