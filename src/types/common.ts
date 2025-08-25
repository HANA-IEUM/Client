export type IconProps = {
  active?: boolean;
};

export type AccountItemProps = {
  accountName?: string;
  accountNum?: string;
  selected?: boolean;
  onClick: () => void;
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
