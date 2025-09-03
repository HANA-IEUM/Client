import { api } from '@/lib/axios';

export type MoneyBoxInfo = {
  accountId: number;
  boxName: string;
  accountNumber: string;
  balance: number;
};

type Participant = {
  memberId: number;
  memberName: string;
  joinedAt: string;
  isActive: boolean;
};

export type BucketDetail = {
  title: string;
  togetherFlag: boolean;
  publicFlag: boolean;
  targetAmount: number;
  targetDate: string;
  bucketListStatus: 'IN_PROGRESS' | 'COMPLETED';
  canComplete: boolean;
  moneyBoxInfo: MoneyBoxInfo;
  participants: Participant[];
};

export async function fetchBucketDetail(
  bucketListId: number
): Promise<BucketDetail> {
  const res = await api.get(`/bucket-lists/my/${bucketListId}`);
  return res.data.data as BucketDetail;
}

export async function deleteBucket(bucketListId: number): Promise<void> {
  await api.delete(`/bucket-lists/my/${bucketListId}`);
}

export async function completeBucket(bucketListId: number) {
  const res = await api.patch(`/bucket-lists/${bucketListId}/complete`);
  return res.data.data;
}
