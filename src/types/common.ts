import type { BucketCategoryType } from '@/features/bucket-create/types/bucket.ts';

export type IconProps = {
  active?: boolean;
};

export type AccountItemProps = {
  accountName?: string;
  accountNum?: string;
  selected?: boolean;
  onClick?: () => void;
};

export type BucketStateItemProps = {
  text: string;
  selected: boolean;
  onClick: () => void;
};

export type SelectItemProps = {
  text: string;
  selected: boolean;
  onClick: () => void;
};

export type IconColor = 'pink' | 'blue' | 'yellow' | 'green';

export type BucketListCategoryItemProps = {
  text: string;
  color: IconColor;
  className?: string;
  onClick?: () => void;
};

export type BucketListItemProps = {
  text?: string;
  date?: string;
  category: BucketCategoryType;
  completed: boolean;
  onClick?: () => void;
};

export type BucketListCheckIconProps = {
  completed: boolean;
};

export type HeaderProps = {
  onClick: () => void;
  isVisible?: boolean;
};

export type BucketDetailHeaderProps = {
  onClick?: () => void;
  title: string;
};

export type HanaIconProps = React.SVGProps<SVGAElement> & {
  size?: number | string;
};

export type MemberItemProps = {
  name?: string;
  avatar?: string;
  onSupportClick?: () => void;
};
