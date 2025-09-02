import { useMutation, useQueryClient } from '@tanstack/react-query';

import { bucketQK } from '@/features/bucket-detail/hooks/useBucketDetail';

import { deleteBucket } from '../apis/bucketDetail';

export function useDeleteBucket(bucketListId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => deleteBucket(bucketListId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: bucketQK.detail(bucketListId) });
      qc.invalidateQueries({ queryKey: ['bucket', 'list'] });
    },
  });
}
