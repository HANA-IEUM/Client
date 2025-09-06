import { useMutation, useQueryClient } from '@tanstack/react-query';

import { bucketQK } from '@/features/bucket-detail/hooks/useBucketDetail';
import { bucketListQK } from '@/features/home/hooks/useBucketLists';
import { walletQK } from '@/features/wallet/hooks/useMainAccount';

import { deleteBucket } from '../apis/bucketDetail';

export function useDeleteBucket(bucketListId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => deleteBucket(bucketListId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: bucketQK.detail(bucketListId) });
      qc.invalidateQueries({ queryKey: bucketListQK.lists() });
      qc.invalidateQueries({
        queryKey: ['wallet', 'accountTransactions'],
        exact: false,
      });
      qc.invalidateQueries({ queryKey: walletQK.moneyBoxes });
      qc.invalidateQueries({ queryKey: walletQK.mainAccount });
    },
  });
}
