import { useQueryClient } from '@tanstack/react-query';
import type { InputRef } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import passwordIcon from '@/assets/common/user/password.png';
import phoneIcon from '@/assets/common/user/phone.png';
import Button from '@/components/button/Button.tsx';
import BoxInput, {
  type BoxInputHandle,
} from '@/components/common/BoxInput.tsx';
import Stepper from '@/components/common/Stepper.tsx';
import Header from '@/components/Header';
import Input from '@/components/input/Input.tsx';
import { useLogin } from '@/features/auth/hooks/useLogin.ts';
import { fetchGroupInfo } from '@/features/group-join/apis/groupApi';
import { groupQK } from '@/features/group-join/hooks/useGroupInfo';
import { fetchMainAccount } from '@/features/link-account/apis/accountApi';
import { accountQK } from '@/features/link-account/hooks/useMainAccount';
import { useGAEvent } from '@/hooks/useGAEvent';
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
    <div className="flex h-full flex-col">
      <div className="flex-grow space-y-6">
        <div className="bg-accent-secondary mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <img src={phoneIcon} alt="phone" className="h-10 w-10" />
        </div>
        <p className="font-hana-regular pt-4 text-left text-3xl">
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
  onTrackEvent: (action: string, label?: string) => void;
};
const LoginStep2 = ({
  password,
  onPasswordChange,
  onLogin,
  onTrackEvent,
}: LoginStep2Props) => {
  const boxInputRef = useRef<BoxInputHandle>(null);

  useEffect(() => {
    boxInputRef.current?.focus();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-grow space-y-6">
        <div className="bg-accent-secondary mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <img src={passwordIcon} alt="password" className="h-10 w-10" />
        </div>
        <p className="font-hana-regular pt-4 text-left text-3xl">
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
        onClick={() => {
          onTrackEvent('login_attempt', 'password_input');
          onLogin();
        }}
        disabled={password.length !== 6}
      />
    </div>
  );
};

export default function LoginPage() {
  const trackAuthEvent = useGAEvent('auth');
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const goNext = () => {
    if (step >= 2) return;
    setDirection(1);
    setStep(2);

    trackAuthEvent('login_step1_done', 'phone_input');
  };

  const goBack = () => {
    if (step === 1) {
      navigate(-1);
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
    } catch (err: unknown) {
      const status =
        (err as { response?: { status?: number } })?.response?.status ??
        'unknown';

      trackAuthEvent('login_failed', status.toString());
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
            onTrackEvent={trackAuthEvent}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-6 flex h-full flex-col">
      <Header onClick={goBack} />
      <div className="pt-5">
        <Stepper totalSteps={2} currentStep={step} color="bg-accent-primary" />
      </div>
      <div className="relative my-10 flex-grow overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
            className="absolute h-full w-full"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
