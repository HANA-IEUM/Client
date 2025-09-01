import { api } from '@/lib/axios';

export type UpdateBucketPayload = {
  title: string;
  publicFlag: boolean;
  shareFlag: boolean;
  selectedMemberIds: number[];
};

export async function updateBucket(
  bucketListId: number,
  payload: UpdateBucketPayload
) {
  const res = await api.patch(`/bucket-lists/${bucketListId}`, payload);
  return res.data;
}
