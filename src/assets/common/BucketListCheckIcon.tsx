import type { BucketListCheckIconProps } from '@/types/common';

export default function BucketListCheckIcon({
  completed = false,
}: BucketListCheckIconProps) {
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="0.5"
        width="30"
        height="30"
        rx="4"
        fill={completed ? 'var(--color-accent-primary)' : '#EBEBEB'}
      />
      <path
        d="M5 16.2639L11.1539 22.375L25 8.625"
        stroke={completed ? '#FFFFFF' : '#CFCFCF'}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
