import { useQuery } from '@tanstack/react-query';

import { fetchBucketDetail } from '../apis/bucketDetail';
import type { BucketDetail } from '../apis/bucketDetail';

export const bucketQK = {
  detail: (bucketListId: number) => ['bucket', 'detail', bucketListId] as const,
};

export function useBucketDetail(bucketListId: number) {
  return useQuery<BucketDetail>({
    queryKey: bucketQK.detail(bucketListId),
    queryFn: () => fetchBucketDetail(bucketListId),
    enabled: !!bucketListId,
    staleTime: 1000 * 60 * 5,
  });
}
