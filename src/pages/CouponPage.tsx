import { useNavigate } from 'react-router-dom';

import EmptyStateMessage from '@/components/common/EmptyStateMessage.tsx';
import Header from '@/components/Header';
import Coupon from '@/features/coupon/components/Coupon';
import { useCoupons } from '@/features/coupon/hooks/useCoupons';

const CouponPage = () => {
  const navigate = useNavigate();
  const { data: coupons, isLoading } = useCoupons();

  return (
    <div className="px-6">
      <Header onClick={() => navigate(-1)} />
      <div className="mt-7">
        <p className="font-hana-bold text-3xl">쿠폰함</p>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center"></div>
      ) : coupons && coupons.length > 0 ? (
        <div className="mt-6 flex flex-col gap-4">
          {coupons.map((coupon) => (
            <Coupon
              key={coupon.couponId}
              id={coupon.couponId}
              couponName={coupon.couponName}
              category={coupon.category}
              partnerName={coupon.partnerName}
              description={coupon.description}
              discountRate={coupon.discountRate}
              couponCode={coupon.couponCode}
              expireDate={coupon.expireDate}
            />
          ))}
        </div>
      ) : (
        <EmptyStateMessage title="보유한 쿠폰이 없어요" />
      )}
    </div>
  );
};

export default CouponPage;
