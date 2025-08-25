export type IconProps = {
  active?: boolean;
};

export type AccountItemProps = {
  accountName?: string;
  accountNum?: string;
  selected?: boolean;
  onClick: () => void;
};
