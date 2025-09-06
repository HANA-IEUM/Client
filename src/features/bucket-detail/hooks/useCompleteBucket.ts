import { useMutation, useQueryClient } from '@tanstack/react-query';

import { bucketListQK } from '@/features/home/hooks/useBucketLists';
import { walletQK } from '@/features/wallet/hooks/useMainAccount';
import { showError } from '@/lib/toast';

import { bucketQK } from './useBucketDetail';
import { completeBucket } from '../apis/bucketDetail';

export function useCompleteBucket(bucketListId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => completeBucket(bucketListId),
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
    onError: () => {
      showError('버킷리스트 완료 처리 중 오류가 발생했어요.');
    },
  });
}
