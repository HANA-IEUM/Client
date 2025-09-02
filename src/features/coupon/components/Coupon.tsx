import { useState } from 'react';

import Button from '@/components/button/Button';
import BottomSheet from '@/components/common/BottomSheet';
import InviteCodeCopyBtn from '@/components/common/InviteCodeCopyBtn';

type CouponProps = {
  id: number | string;
  couponName: string;
  partnerName: string;
  category: string;
  description: string;
  discountRate: number;
  couponCode: string;
  expireDate: string;
};

const Coupon = ({
  id,
  couponName,
  partnerName,
  category,
  description,
  discountRate,
  couponCode,
  expireDate,
}: CouponProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const handleOpenSheet = () => setIsSheetOpen(true);
  const handleCloseSheet = () => setIsSheetOpen(false);

  const categoryBgMap: Record<string, string> = {
    여행: 'bg-icon-pink',
    취미: 'bg-icon-blue',
    건강: 'bg-icon-yellow',
    가족지원: 'bg-icon-green',
  };

  return (
    <div className="bg-btn-default-bg flex w-full flex-col rounded-lg px-3 pt-2 pb-4">
      <div className="mt-1 flex justify-between">
        <span className="font-hana-bold text-2xl">{discountRate}%</span>
        <div
          className={`${categoryBgMap[category] ?? 'bg-gray-300'} flex w-[71px] items-center justify-center px-3 py-1`}
        >
          <span className="font-hana-bold">{category}</span>
        </div>
      </div>

      <div className="bg-line mt-2 h-[1px] w-full" />

      <div className="my-4 flex flex-col gap-1">
        <span className="font-hana-bold text-lg">
          [ {partnerName} ] {couponName}
        </span>
        <span className="font-hana-regular">{description}</span>
        <span className="font-hana-bold">{expireDate} 까지</span>
      </div>

      <Button intent="mint" label="사용하기" onClick={handleOpenSheet} />

      <BottomSheet isOpen={isSheetOpen} onClose={handleCloseSheet}>
        <div className="mt-12 flex flex-col gap-4">
          <p className="font-hana-regular text-text-primary text-3xl">
            <span className="font-hana-bold">쿠폰번호</span>를 복사해
            <br />
            제휴사에서 사용해 보세요
          </p>

          <div className="bg-btn-default-bg mt-24 mb-36 flex flex-col items-center justify-center gap-2 rounded-md px-20 py-6">
            <span className="font-hana-bold text-text-secondary text-3xl">
              {couponCode}
            </span>
            <InviteCodeCopyBtn isCoupon={true} text={couponCode} />
          </div>

          <Button
            intent="green"
            label={partnerName}
            onClick={handleCloseSheet}
          />
        </div>
      </BottomSheet>
    </div>
  );
};

export default Coupon;
