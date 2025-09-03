import { useQuery } from '@tanstack/react-query';

import { fetchBucketLists } from '@/features/home/apis/apis.ts';

export const bucketListQK = {
  all: ['bucket-lists'] as const,
  lists: () => [...bucketListQK.all, 'list'] as const,
  list: (filter: string) => [...bucketListQK.lists(), filter] as const,
};

export const useBucketLists = (filter: string) => {
  return useQuery({
    queryKey: bucketListQK.list(filter),
    queryFn: () => fetchBucketLists(filter),
  });
};
