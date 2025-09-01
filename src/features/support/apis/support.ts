import { api } from '@/lib/axios';
import type { SupportHistory } from '@/types/supportHistory';

export type SupportType = 'CHEER' | 'SPONSOR';

export interface SupportPayload {
  letterColor: string;
  message: string;
  supportType: SupportType;
  supportAmount: number | null;
  accountPassword: string | null;
}

export async function createSupport(
  bucketListId: number,
  payload: SupportPayload
) {
  const res = await api.post(`/support/${bucketListId}`, payload);
  return res.data?.data;
}

export async function fetchSupportHistory(bucketListId: number) {
  const res = await api.get(`/support/bucket/${bucketListId}`);
  return res.data?.data as SupportHistory[];
}
