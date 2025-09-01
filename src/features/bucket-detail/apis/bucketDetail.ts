import { api } from '@/lib/axios';

export type MoneyBoxInfo = {
  accountId: number;
  boxName: string;
  accountNumber: string;
  balance: number;
  hasMoneyBox: boolean;
};

export type BucketDetail = {
  title: string;
  targetAmount: number;
  targetDate: string;
  moneyBoxInfo: MoneyBoxInfo;
};

export async function fetchBucketDetail(
  bucketListId: number
): Promise<BucketDetail> {
  const res = await api.get(`/bucket-lists/${bucketListId}`);
  return res.data.data as BucketDetail;
}
