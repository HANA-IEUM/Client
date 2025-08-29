import { useEffect, useRef, useState } from 'react';
import BoxInput, {
  type BoxInputHandle,
} from '@/components/common/BoxInput.tsx';
import Button from '@/components/button/Button.tsx';
import passwordIcon from '@/assets/common/user/password.png';

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
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="w-16 h-16 bg-theme-secondary rounded-full flex items-center justify-center mx-auto">
          <img src={passwordIcon} alt="message" className="w-10 h-10" />
        </div>
        <p className="text-3xl font-hana-regular text-left">
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
          <div className="mt-4">
            <p className="text-3xl font-hana-regular text-left">
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
        size="full-lg"
        intent="green"
        font="regular"
        onClick={onNext}
        disabled={pw.length !== 6 || pw !== checkPw}
      />
    </div>
  );
};
