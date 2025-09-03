import type { BucketCategoryType } from '@/features/bucket-create/types/bucket.ts';

export interface Participant {
  memberId: number;
  memberName: string;
  joinedAt: string;
  isActive: boolean;
}

export interface MoneyBoxInfo {
  accountId: number;
  boxName: string;
  accountNumber: string;
  balance: number;
  hasMoneyBox: boolean;
}

export interface BucketListItem {
  id: number;
  memberId: number;
  type: BucketCategoryType;
  title: string;
  targetAmount: number;
  targetDate: string;
  publicFlag: boolean;
  togetherFlag: boolean;
  status: 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  participants: Participant[];
  moneyBoxInfo: MoneyBoxInfo;
}

export interface BucketCreationAvailability {
  canCreate: boolean;
  currentMoneyBoxContext: number;
}
