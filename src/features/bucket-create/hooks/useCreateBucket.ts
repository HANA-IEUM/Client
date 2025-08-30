import { useMutation } from '@tanstack/react-query';
import { createBucket } from '../apis/bucketApi';
import type { CreateBucketPayload } from '@/features/bucket-create/types/bucket.ts';

export const useCreateBucket = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: (payload: CreateBucketPayload) => createBucket(payload),
    onSuccess,
    onError,
  });
};
