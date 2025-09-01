import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBucket } from '../apis/bucketEdit';
import type { UpdateBucketPayload } from '../apis/bucketEdit';
import { groupQK } from '@/features/group-join/hooks/useGroupInfo';

export function useUpdateBucket(bucketListId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateBucketPayload) =>
      updateBucket(bucketListId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['bucket', bucketListId] });
      qc.invalidateQueries({ queryKey: groupQK.info });
    },
  });
}
