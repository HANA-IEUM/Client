import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBucket } from '../apis/bucketEdit';
import type { UpdateBucketPayload } from '../apis/bucketEdit';
import { groupQK } from '@/features/group-join/hooks/useGroupInfo';
import { bucketQK } from '@/features/bucket-detail/hooks/useBucketDetail';

export function useUpdateBucket(bucketListId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateBucketPayload) =>
      updateBucket(bucketListId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: bucketQK.detail(bucketListId) });
      qc.invalidateQueries({ queryKey: groupQK.info });
    },
  });
}
