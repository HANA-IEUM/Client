import type { InputRef } from 'antd';
import React, { useEffect, useRef } from 'react';

import nameIcon from '@/assets/common/user/name.png';
import Button from '@/components/button/Button.tsx';
import Input from '@/components/input/Input.tsx';

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
    <div className="flex h-full flex-col">
      <div className="flex-grow">
        <div className="bg-theme-secondary mx-auto my-15 flex h-24 w-24 items-center justify-center rounded-full">
          <img src={nameIcon} alt="name" className="h-11 w-11" />
        </div>
        <p className="font-hana-regular !mb-9.5 text-left text-3xl">
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
        size="full"
        intent="green"
        onClick={onNext}
        disabled={!name}
      />
    </div>
  );
};
