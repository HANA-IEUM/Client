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
