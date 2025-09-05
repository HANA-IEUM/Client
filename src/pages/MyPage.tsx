import type { InputRef } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import rightIcon from '@/assets/common/chevron-right.png';
import couponIcon from '@/assets/common/coupon.png';
import HanaIcon from '@/assets/common/HanaIcon.tsx';
import Button from '@/components/button/Button.tsx';
import BottomSheet from '@/components/common/BottomSheet.tsx';
import Input from '@/components/input/Input.tsx';
import { useLogout } from '@/features/auth/hooks/useLogout.ts';
import { useMonthlyLivingCost } from '@/hooks/useMonthlyLivingCost.ts';
import { useAuth } from '@/hooks/useToken.ts';
import { useUpdateMonthlyLivingCost } from '@/hooks/useUpdateMonthlyLivingCost.ts';
import { showError, showSuccess } from '@/lib/toast';
import { formatPhoneNumber } from '@/utils/phoneNumberFormat.ts';

const MyPage = () => {
  const inputRef = useRef<InputRef>(null);
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [newLivingCost, setNewLivingCost] = useState('');
  const logoutMutation = useLogout();
  const { data: livingCost } = useMonthlyLivingCost();
  const navigate = useNavigate();
  const updateCostMutation = useUpdateMonthlyLivingCost(
    () => {
      setVisible(false);
      showSuccess('수정을 완료했어요.');
    },
    () => {
      showError('수정에 실패했어요. 다시 시도해 주세요.');
    }
  );

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  const handleOpenBottomSheet = () => {
    setNewLivingCost(livingCost ? livingCost.toLocaleString() : '');
    setVisible(true);
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setNewLivingCost('');
      return;
    }
    const formatted = Number(rawValue).toLocaleString();
    setNewLivingCost(formatted);
  };

  const handleCostUpdate = () => {
    const costAsNumber = Number(newLivingCost.replace(/,/g, ''));
    updateCostMutation.mutate({ monthlyLivingCost: costAsNumber });
  };
  const handleLogout = () => logoutMutation.mutate();
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="h-full w-full pt-12">
        <div className="px-6">
          <h1 className="font-hana-bold text-text-primary !mb-8 text-4xl">
            마이페이지
          </h1>
        </div>

        <div className="mb-14 flex w-full flex-col gap-8 px-6">
          <div className="bg-btn-default-bg mb-8 rounded-2xl px-4 py-8 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="bg-theme-secondary flex h-14 w-14 items-center justify-center rounded-full">
                <HanaIcon />
              </div>
              <div className="flex-1">
                <h2 className="font-hana-bold text-text-primary !mb-0 text-2xl">
                  {user?.name || '고객'}님
                </h2>
                <p className="font-hana-regular text-text-secondary !mb-0 text-base">
                  {formatPhoneNumber(user?.phoneNumber) || '010-1234-1234'}
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <h1 className="font-hana-bold text-text-primary !mb-8 text-2xl">
              쿠폰함
            </h1>
            <div
              className="bg-accent-secondary !mb-[5px] cursor-pointer rounded-2xl p-3 shadow-sm"
              onClick={() => navigate('/coupon')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="ml-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <img src={couponIcon} alt="쿠폰 아이콘" />
                  </div>
                  <div>
                    <h4 className="font-hana-regular text-text-secondary !mb-0 text-lg">
                      제휴사 쿠폰
                    </h4>
                    <p className="font-hana-bold text-text-secondary !mb-0 text-xl">
                      쿠폰함 가기
                    </p>
                  </div>
                </div>
                <div>
                  <img src={rightIcon} alt=">" />
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <h1 className="font-hana-bold text-text-primary !mb-8 text-2xl">
              내 정보 수정
            </h1>
            <div
              className="bg-line-light flex cursor-pointer justify-between rounded-2xl p-4"
              onClick={handleOpenBottomSheet}
            >
              <p className="font-hana-regular text-text-primary !mb-0 text-2xl">
                월 생활비
              </p>
              <div>
                <img src={rightIcon} alt=">" />
              </div>
            </div>
          </div>

          <div className="">
            <h1 className="font-hana-bold text-text-primary !mb-8 text-2xl">
              계정 관리
            </h1>
            <div
              className="bg-line-light flex cursor-pointer justify-between rounded-2xl p-4"
              onClick={handleLogout}
            >
              <p className="font-hana-regular text-text-primary !mb-0 text-2xl">
                로그아웃
              </p>
              <div>
                <img src={rightIcon} alt=">" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomSheet
        isOpen={visible}
        onClose={() => setVisible(false)}
        maxHeight="90vh"
      >
        <div className="min-h-[475px]">
          <div className="mb-4 flex h-full flex-col items-center">
            <p className="font-hana-regular !mb-0 w-full text-left text-3xl">
              수정할 <span className="font-hana-bold"> 월 생활비</span>를
              <br />
              입력해 주세요
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              intent="green"
              value={newLivingCost}
              onChange={handleCostChange}
            />
            <span className="font-hana-regular text-3xl">원</span>
          </div>
        </div>
        <div className="flex w-full gap-2">
          <Button
            label="뒤 로"
            size="lg"
            intent="gray"
            font="regular"
            onClick={() => setVisible(false)}
            className="w-1/4"
          />
          <Button
            label="수정하기"
            size="lg"
            intent="green"
            font="regular"
            onClick={handleCostUpdate}
            className="w-3/4"
            loading={updateCostMutation.isPending}
          />
        </div>
      </BottomSheet>
    </div>
  );
};

export default MyPage;
