import React, { useEffect, useRef } from 'react';
import type { InputRef } from 'antd';
import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';
import nameIcon from '@/assets/common/user/name.png';

export type NameInputProps = {
  name: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
};

export const NameInput = ({ name, onNameChange, onNext }: NameInputProps) => {
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="w-16 h-16 bg-theme-secondary rounded-full flex items-center justify-center mx-auto">
          <img src={nameIcon} alt="message" className="w-10 h-10" />
        </div>
        <p className="text-3xl font-hana-regular text-left">
          <span className="font-hana-bold">성함</span>을 입력해 주세요
        </p>
        <Input
          ref={inputRef}
          intent="green"
          placeholder="홍길동"
          value={name}
          onChange={onNameChange}
        />
      </div>
      <Button
        label="다 음"
        size="full-lg"
        intent="green"
        font="regular"
        onClick={onNext}
        disabled={!name}
      />
    </div>
  );
};
