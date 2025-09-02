import { useMutation } from '@tanstack/react-query';

import { createCoupon } from '@/features/coupon/apis/coupon';

export function useCreateCoupon(bucketId: number) {
  return useMutation({
    mutationFn: () => createCoupon(bucketId),
  });
}
