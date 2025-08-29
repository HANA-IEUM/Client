export type WhoAndWhatProps = {
  title: string;
  setTitle: (str: string) => void;
  withFamily: boolean | null;
  setWithFamily: (bool: boolean) => void;
  visible: boolean;
  setVisible: (bool: boolean) => void;
  onNext: () => void;
};
export type SelectGroupMemberProps = {
  selectedNames: string[];
  setSelectedNames: (prev: (prev: string[]) => string[]) => void;
  onNext: () => void;
};
export type GoalAmountPeriodProps = {
  amount: string;
  setAmount: (str: string) => void;
  period: number | null;
  setPeriod: (num: number) => void;
  handleAmount: () => void;
  onNext: () => void;
};
export type SelectCategoryProps = {
  setCategory: (str: string) => void;
  onNext: () => void;
};
export type CreateBoxProps = {
  title: string;
  targetAmount: string;
  period: number | null;
  livingCost: number;
  onNext: () => void;
};
export type BoxInfoProps = {
  boxName: string;
  setBoxName: (str: string) => void;
  automaticTransfer: boolean;
  setAutomaticTransfer: (bool: boolean) => void;
  monthlyAmount: number;
  setMonthlyAmount: (num: number) => void;
  transferDay: string;
  setTransferDay: (str: string) => void;
  onNext: () => void;
};
export type ConfirmBucketProps = {
  title: string;
  onSubmit: () => void;
};
