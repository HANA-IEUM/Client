import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { InputRef } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { fetchGroupInfo } from '@/features/group-join/apis/groupApi';
import { fetchMainAccount } from '@/features/link-account/apis/accountApi';
import { accountQK } from '@/features/link-account/hooks/useMainAccount';
import { groupQK } from '@/features/group-join/hooks/useGroupInfo';
import Header from '@/components/Header';
import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';
import BoxInput, {
  type BoxInputHandle,
} from '@/components/common/BoxInput.tsx';
import Stepper from '@/components/common/Stepper.tsx';
import phoneIcon from '@/assets/common/user/phone.png';
import passwordIcon from '@/assets/common/user/password.png';
import { useLogin } from '@/features/auth/hooks/useLogin.ts';
import { showError } from '@/lib/toast';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

type LoginStep1Props = {
  phoneNumber: string;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
};
const LoginStep1 = ({
  phoneNumber,
  onPhoneNumberChange,
  onNext,
}: LoginStep1Props) => {
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="w-16 h-16 bg-accent-secondary rounded-full flex items-center justify-center mx-auto">
          <img src={phoneIcon} alt="phone" className="w-10 h-10" />
        </div>
        <p className="text-3xl font-hana-regular pt-4 text-left">
          <span className="font-hana-bold">전화번호</span>를 입력해주세요
        </p>
        <Input
          ref={inputRef}
          intent="red"
          placeholder="01012345678"
          value={phoneNumber}
          onChange={onPhoneNumberChange}
        />
      </div>
      <Button
        label="다 음"
        size="full-lg"
        intent="red"
        font="regular"
        onClick={onNext}
        disabled={phoneNumber.length < 10}
      />
    </div>
  );
};

type LoginStep2Props = {
  password: string;
  onPasswordChange: (pin: string) => void;
  onLogin: () => void;
};
const LoginStep2 = ({
  password,
  onPasswordChange,
  onLogin,
}: LoginStep2Props) => {
  const boxInputRef = useRef<BoxInputHandle>(null);

  useEffect(() => {
    boxInputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="w-16 h-16 bg-accent-secondary rounded-full flex items-center justify-center mx-auto">
          <img src={passwordIcon} alt="password" className="w-10 h-10" />
        </div>
        <p className="text-3xl font-hana-regular pt-4 text-left">
          <span className="font-hana-bold">비밀번호</span>를 입력해주세요
        </p>
        <BoxInput
          ref={boxInputRef}
          length={6}
          onChange={onPasswordChange}
          value={password}
          isPassword
          focusColorClass="focus:border-accent-primary"
        />
      </div>
      <Button
        label="로그인"
        size="full-lg"
        intent="red"
        font="regular"
        onClick={onLogin}
        disabled={password.length !== 6}
      />
    </div>
  );
};

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const goNext = () => {
    if (step >= 2) return;
    setDirection(1);
    setStep(2);
  };

  const goBack = () => {
    if (step === 1) {
      navigate(-1); // 이전 페이지로 이동
    } else {
      setDirection(-1);
      setStep(1);
    }
  };

  const loginMutation = useLogin();
  const qc = useQueryClient();

  const handleLogin = async () => {
    try {
      const res = await loginMutation.mutateAsync({ phoneNumber, password });
      const { hideGroupPrompt, mainAccountLinked } = res.data;

      if (!hideGroupPrompt) {
        navigate('/group', { replace: true });
        return;
      }

      if (!mainAccountLinked) {
        navigate('/account', { replace: true });
        return;
      }

      navigate('/home', { replace: true });

      if (hideGroupPrompt) {
        qc.prefetchQuery({ queryKey: groupQK.info, queryFn: fetchGroupInfo });
      }
      if (mainAccountLinked) {
        qc.prefetchQuery({
          queryKey: accountQK.main,
          queryFn: fetchMainAccount,
        });
      }
    } catch {
      showError('아이디 또는 비밀번호를 확인해주세요');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <LoginStep1
            phoneNumber={phoneNumber}
            onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
            onNext={goNext}
          />
        );
      case 2:
        return (
          <LoginStep2
            password={password}
            onPasswordChange={setPassword}
            onLogin={handleLogin}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-6 flex flex-col h-full">
      <Header onClick={goBack} />
      <div className="pt-5">
        <Stepper totalSteps={2} currentStep={step} color="bg-accent-primary" />
      </div>
      <div className="flex-grow my-10 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
            className="absolute w-full h-full"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
