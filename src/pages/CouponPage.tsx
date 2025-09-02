import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header';
import Coupon from '@/features/coupon/components/Coupon';
import { useCoupons } from '@/features/coupon/hooks/useCoupons';

const CouponPage = () => {
  const navigate = useNavigate();
  const { data: coupons } = useCoupons();

  return (
    <div className="px-6">
      <Header onClick={() => navigate(-1)} />
      <div className="mt-7">
        <p className="font-hana-bold text-3xl">쿠폰함</p>
      </div>

      <div className="flex flex-col gap-5">
        {coupons?.map((coupon) => (
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
    </div>
  );
};

export default CouponPage;
