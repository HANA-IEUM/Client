import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CreateBucketPayload } from '@/features/bucket-create/types/bucket.ts';
import { bucketListQK } from '@/features/home/hooks/useBucketLists.ts';
import { walletQK } from '@/features/wallet/hooks/useMainAccount';

import { createBucket } from '../apis/bucketApi';

export const useCreateBucket = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBucketPayload) => createBucket(payload),
    onSuccess: () => {
      // 버킷리스트 목록 무효화
      queryClient.invalidateQueries({ queryKey: bucketListQK.lists() });

      // 머니박스 목록 무효화 (새 박스 생성 반영)
      queryClient.invalidateQueries({ queryKey: walletQK.moneyBoxes });

      // 주계좌 정보 무효화 (잔액 변경 반영)
      queryClient.invalidateQueries({ queryKey: walletQK.mainAccount });

      onSuccess?.();
    },
    onError,
  });
};
