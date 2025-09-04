import { useMutation, useQueryClient } from '@tanstack/react-query';

import { bucketQK } from '@/features/bucket-detail/hooks/useBucketDetail';
import { walletQK } from '@/features/wallet/hooks/useMainAccount';

import { createSupport, type SupportPayload } from '../apis/support';

export function useSupport(bucketListId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: SupportPayload) =>
      createSupport(bucketListId, payload),
    onSuccess: () => {
      // 버킷 상세 정보 무효화
      qc.invalidateQueries({ queryKey: bucketQK.detail(bucketListId) });

      // 후원 시 거래내역도 무효화 (주계좌 거래내역)
      qc.invalidateQueries({
        queryKey: ['wallet', 'accountTransactions'],
        exact: false,
      });

      // 머니박스 목록도 무효화 (잔액 변경 반영)
      qc.invalidateQueries({ queryKey: walletQK.moneyBoxes });

      // 주계좌 정보도 무효화 (잔액 변경 반영)
      qc.invalidateQueries({ queryKey: walletQK.mainAccount });
    },
  });
}
