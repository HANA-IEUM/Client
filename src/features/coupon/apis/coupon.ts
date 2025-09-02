import { api } from '@/lib/axios';

export interface Coupon {
  couponId: number;
  category: string;
  partnerName: string;
  couponName: string;
  description: string;
  discountRate: number;
  couponCode: string;
  expireDate: string;
}

export interface CouponResponse {
  code: number;
  status: string;
  message: string;
  data: Coupon[];
}

export async function fetchCoupons(): Promise<Coupon[]> {
  const res = await api.get<CouponResponse>('/api/coupons');
  return res.data.data;
}

export type CreateCouponResponse = {
  code: number;
  status: string;
  message: string;
  data: string;
};

export async function createCoupon(bucketId: number): Promise<string> {
  const res = await api.post<CreateCouponResponse>(`/api/coupons/${bucketId}`);
  return res.data.data;
}
