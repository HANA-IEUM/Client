import { useEffect, useRef, useState } from 'react';

import passwordIcon from '@/assets/common/user/password.png';
import Button from '@/components/button/Button.tsx';
import BoxInput, {
  type BoxInputHandle,
} from '@/components/common/BoxInput.tsx';

export type PasswordInputProps = {
  pw: string;
  onPwChange: (pin: string) => void;
  onNext: () => void;
};
export const PasswordInput = ({
  pw,
  onPwChange,
  onNext,
}: PasswordInputProps) => {
  const [checkPw, setCheckPw] = useState('');
  const boxInputRef = useRef<BoxInputHandle>(null);
  const checkBoxInputRef = useRef<BoxInputHandle>(null);

  useEffect(() => {
    boxInputRef.current?.focus();
  }, []);
  useEffect(() => {
    if (pw.length === 6) {
      checkBoxInputRef.current?.focus();
    }
  }, [pw]);
  const handleChange = (pin: string) => {
    onPwChange(pin);
  };
  return (
    <div className="flex h-full flex-col">
      <div className="flex-grow">
        <div className="bg-theme-secondary mx-auto my-15 flex h-24 w-24 items-center justify-center rounded-full">
          <img src={passwordIcon} alt="password" className="h-11 w-11" />
        </div>
        <p className="font-hana-regular !mb-9.5 text-left text-3xl">
          <span className="font-hana-bold">비밀번호</span>를 설정해주세요
        </p>
        <BoxInput
          ref={boxInputRef}
          length={6}
          onChange={handleChange}
          value={pw}
          isPassword
        />
        {pw.length === 6 ? (
          <div className="mt-8">
            <p className="font-hana-regular text-left text-3xl">
              <span className="font-hana-bold">다시 한 번</span> 확인해 주세요
            </p>
            <BoxInput
              ref={checkBoxInputRef}
              length={6}
              onChange={(value: string) => setCheckPw(value)}
              isPassword
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <Button
        label="확 인"
        size="full"
        intent="green"
        onClick={onNext}
        disabled={pw.length !== 6 || pw !== checkPw}
      />
    </div>
  );
};
