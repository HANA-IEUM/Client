import type { BucketCategoryType } from '@/features/bucket-create/types/bucket.ts';
import type { GroupMember } from '@/types/group.ts';

export type WhoAndWhatProps = {
  title: string;
  setTitle: (str: string) => void;
  withFamily: boolean | null;
  setWithFamily: (bool: boolean) => void;
  visible: boolean;
  setVisible: (bool: boolean) => void;
  hasGroup: boolean;
  onNext: () => void;
};
export type SelectGroupMemberProps = {
  selectedNames: number[];
  setSelectedNames: (prev: (prev: number[]) => number[]) => void;
  groupMemberInfo: GroupMember[];
  onNext: () => void;
};
export type GoalAmountProps = {
  bucket: string;
  amount: string;
  setAmount: (str: string) => void;
  onNext: () => void;
};
export type GoalPeriodProps = {
  period: number | null;
  setPeriod: (num: number) => void;
  handleAmount: () => void;
  onNext: () => void;
};
export type SelectCategoryProps = {
  setCategory: (str: BucketCategoryType) => void;
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
