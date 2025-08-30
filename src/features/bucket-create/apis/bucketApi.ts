import { api } from '@/lib/axios';
import type { CreateBucketPayload } from '@/features/bucket-create/types/bucket.ts';

export const createBucket = async (payload: CreateBucketPayload) => {
  const { data } = await api.post('/bucket-lists', payload);
  return data;
};
