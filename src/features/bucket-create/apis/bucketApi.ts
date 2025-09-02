import type { CreateBucketPayload } from '@/features/bucket-create/types/bucket.ts';
import { api } from '@/lib/axios';

export const createBucket = async (payload: CreateBucketPayload) => {
  const { data } = await api.post('/bucket-lists', payload);
  return data;
};
