export type BucketCategoryType =
  | 'TRIP'
  | 'HOBBY'
  | 'HEALTH'
  | 'FAMILY_SUPPORT'
  | '';

export interface CreateBucketPayload {
  type: BucketCategoryType;
  title: string;
  targetAmount: number;
  targetMonths: string | null;
  publicFlag: boolean;
  togetherFlag: boolean | null;
  selectedMemberIds: number[];
  createMoneyBox: boolean;
  moneyBoxName: string;
  enableAutoTransfer: boolean;
  monthlyAmount: number;
  transferDay: string;
}
