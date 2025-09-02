import { api } from '@/lib/axios';
import type { BucketListItem } from '@/types/bucket.ts';

interface BucketListResponse {
  data: BucketListItem[];
}

export const fetchBucketLists = async (filter: string) => {
  const { data } = await api.get<BucketListResponse>(
    '/bucket-lists/category/' + filter
  );
  return data.data;
};
