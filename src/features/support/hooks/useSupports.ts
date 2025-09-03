import { useMutation, useQueryClient } from '@tanstack/react-query';

import { bucketQK } from '@/features/bucket-detail/hooks/useBucketDetail';

import { createSupport, type SupportPayload } from '../apis/support';

export function useSupport(bucketListId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: SupportPayload) =>
      createSupport(bucketListId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: bucketQK.detail(bucketListId) });
    },
  });
}
