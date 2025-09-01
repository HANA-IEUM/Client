import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBucket } from '../apis/bucketApi';
import type { CreateBucketPayload } from '@/features/bucket-create/types/bucket.ts';
import { bucketListQK } from '@/features/home/hooks/useBucketLists.ts';

export const useCreateBucket = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBucketPayload) => createBucket(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bucketListQK.lists() });
      onSuccess?.();
    },
    onError,
  });
};
