import type { InputRef } from 'antd';
import React, { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

import phoneIcon from '@/assets/common/user/phone.png';
import Button from '@/components/button/Button.tsx';
import Input from '@/components/input/Input.tsx';
import { useCheckPhoneNumber } from '@/features/auth/hooks/useCheckPhoneNumber.ts';
import { useVerification } from '@/features/auth/hooks/useVerification.ts';

export type PhoneInputProps = {
  phoneNumber: string;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
};

export const PhoneInput = ({
  phoneNumber,
  onPhoneNumberChange,
  onNext,
}: PhoneInputProps) => {
  const inputRef = useRef<InputRef>(null);

  const checkPhoneNumberMutation = useCheckPhoneNumber(
    (data) => {
      if (data.data.available) {
        goNextStep();
      } else {
        toast.error('이미 가입된 전화번호예요');
      }
    },
    () => {}
  );
  const verificationMutation = useVerification(
    () => {},
    () => {}
  );

  const buttonClick = () => {
    checkPhoneNumberMutation.mutate({
      phoneNumber: phoneNumber,
    });
  };

  const goNextStep = () => {
    onNext();
    verificationMutation.mutate({
      to: phoneNumber,
    });
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-grow space-y-6">
        <div className="bg-theme-secondary mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <img src={phoneIcon} alt="phone" className="h-10 w-10" />
        </div>
        <p className="font-hana-regular pt-4 text-left text-3xl">
          <span className="font-hana-bold">전화번호</span>를 입력해주세요
        </p>
        <Input
          ref={inputRef}
          intent="green"
          placeholder="01012345678"
          helperText="하이픈(-) 없이 숫자만 입력"
          value={phoneNumber}
          onChange={onPhoneNumberChange}
        />
      </div>
      <Button
        label="확 인"
        size="full-lg"
        intent="green"
        font="regular"
        onClick={buttonClick}
        disabled={phoneNumber.length < 10} // 전화번호가 입력되어야 활성화
      />
    </div>
  );
};
