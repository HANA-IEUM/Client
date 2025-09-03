import { useQuery } from '@tanstack/react-query';

import type { Coupon } from '../apis/coupon';
import { fetchCoupons } from '../apis/coupon';

export function useCoupons() {
  return useQuery<Coupon[], Error>({
    queryKey: ['coupons'],
    queryFn: fetchCoupons,
  });
}
