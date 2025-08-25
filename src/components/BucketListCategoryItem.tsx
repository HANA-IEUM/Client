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
        'w-40 h-40 rounded-2xl cursor-pointer flex items-center justify-center select-none',
        BG_MAP[color],
        className
      )}
    >
      <span className="font-hana-bold text-4xl text-primary">{text}</span>
    </div>
  );
};

export default BucketListCategoryItem;
