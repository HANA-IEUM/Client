import { api } from '@/lib/axios';
import type {
  BucketCreationAvailability,
  BucketListItem,
} from '@/types/bucket.ts';

interface BucketListResponse {
  data: BucketListItem[];
}

interface AvailabilityResponse {
  data: BucketCreationAvailability;
}

export const fetchBucketLists = async (filter: string) => {
  if (filter === 'in_progress') {
    filter = 'in-progress';
  }
  const { data } = await api.get<BucketListResponse>(
    '/bucket-lists/my/' + filter
  );
  return data.data;
};

export const checkBucketCreationAvailability = async () => {
  const { data } = await api.get<AvailabilityResponse>(
    '/bucket-lists/creation-availability'
  );
  return data.data;
};
