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

export type BucketCategory = 'trip' | 'hobby' | 'familySupport' | 'health';

export type BucketListItemProps = {
  text?: string;
  date?: string;
  category: BucketCategory;
  completed: boolean;
};

export type BucketListCheckIconProps = {
  completed: boolean;
};

export type HeaderProps = {
  onClick: () => void;
};

export type HanaIconProps = React.SVGProps<SVGAElement> & {
  size?: number | string;
};
