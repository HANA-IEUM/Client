import { api } from '@/lib/axios';

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
