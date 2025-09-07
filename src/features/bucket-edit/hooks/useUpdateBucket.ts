import { useMutation, useQueryClient } from '@tanstack/react-query';

import { bucketQK } from '@/features/bucket-detail/hooks/useBucketDetail';
import { groupQK } from '@/features/group-join/hooks/useGroupInfo';

import { updateBucket } from '../apis/bucketEdit';
import type { UpdateBucketPayload } from '../apis/bucketEdit';

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
