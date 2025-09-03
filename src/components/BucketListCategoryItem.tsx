import clsx from 'clsx';

import type { BucketListCategoryItemProps } from '@/types/common';

const BG_MAP = {
  pink: 'bg-[var(--color-icon-pink)]',
  blue: 'bg-[var(--color-icon-blue)]',
  yellow: 'bg-[var(--color-icon-yellow)]',
  green: 'bg-[var(--color-icon-green)]',
} as const;

const BucketListCategoryItem = ({
  text,
  color,
  className,
  onClick,
}: BucketListCategoryItemProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'flex h-40 w-40 cursor-pointer items-center justify-center rounded-2xl select-none',
        BG_MAP[color],
        className
      )}
    >
      <span className="font-hana-bold text-primary text-4xl">{text}</span>
    </div>
  );
};

export default BucketListCategoryItem;
