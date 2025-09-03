import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Stepper from '@/components/common/Stepper.tsx';
import Header from '@/components/Header';
import { BirthdayInput } from '@/features/auth/components/BirthdayInput';
import { MonthlyCostInput } from '@/features/auth/components/MonthlyCostInput.tsx';
import { NameInput } from '@/features/auth/components/NameInput.tsx';
import { PasswordInput } from '@/features/auth/components/PasswordInput.tsx';
import { PhoneInput } from '@/features/auth/components/PhoneInput.tsx';
import { PhoneVerification } from '@/features/auth/components/PhoneVerification.tsx';
import RegisterCom from '@/features/auth/components/RegisterCom';
import { useRegister } from '@/features/auth/hooks/useRegister.ts';
import { useGAEvent } from '@/hooks/useGAEvent';
import { showError } from '@/lib/toast';

// 슬라이드 애니메이션을 위한 variants
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

export default function RegisterPage() {
  const trackRegisterEvent = useGAEvent('register');

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1: next, -1: prev
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [cost, setCost] = useState('');

  const navigate = useNavigate();

  const TOTAL_STEPS = 6;

  //  const registerMutation = useRegister(
  //   () => {},
  //   () => {
  //     setStep(1);
  //     toast.error('회원가입에 실패했어요');
  //   }
  // );

  // 회원가입 훅
  const registerMutation = useRegister(
    () => {
      trackRegisterEvent('register_success', 'completed');
      setStep(7);
    },
    () => {
      trackRegisterEvent('register_failed', 'error');
      setStep(1);
      showError('회원가입에 실패했어요. 다시 시도해 주세요.');
    }
  );

  const costToNumber = () => {
    // 입력값에서 숫자만 추출
    const rawValue = cost.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setCost('');
      return 0;
    }
    return Number(rawValue);
  };

  // const goNext = () => {
  //   if (step === TOTAL_STEPS) {
  //     registerMutation.mutate({
  //       phoneNumber: phoneNumber,
  //       password: pw,
  //       name: name,
  //       birthDate: birthday,
  //       gender: 'M',
  //       monthlyLivingCost: costToNumber(),
  //     });
  //   }
  //   setDirection(1);
  //   setStep((prev) => prev + 1);
  // };

  const goNext = () => {
    if (step === TOTAL_STEPS) {
      registerMutation.mutate({
        phoneNumber,
        password: pw,
        name,
        birthDate: birthday,
        gender: 'M',
        monthlyLivingCost: costToNumber(),
      });
      trackRegisterEvent('register_cost_done', 'monthly_cost');
      return;
    }

    switch (step) {
      case 1:
        trackRegisterEvent('register_phone_done', 'phone_input');
        break;
      case 2:
        trackRegisterEvent('register_phone_verified', 'verification');
        break;
      case 3:
        trackRegisterEvent('register_password_set', 'password_input');
        break;
      case 4:
        trackRegisterEvent('register_name_done', 'name_input');
        break;
      case 5:
        trackRegisterEvent('register_birthday_done', 'birthday_input');
        break;
    }

    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const goBack = () => {
    if (step === 1) {
      navigate('/');
    } else if (step <= 0) {
      return;
    }
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  //현재 스텝에 맞는 컴포넌트를 동적으로 렌더링하는 함수
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <PhoneInput
            phoneNumber={phoneNumber}
            onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
            onNext={goNext}
          />
        );
      case 2:
        return <PhoneVerification phoneNumber={phoneNumber} onNext={goNext} />;
      case 3:
        return <PasswordInput pw={pw} onPwChange={setPw} onNext={goNext} />;
      case 4:
        return (
          <NameInput
            name={name}
            onNameChange={(e) => setName(e.target.value)}
            onNext={goNext}
          />
        );
      case 5:
        return (
          <BirthdayInput
            birthday={birthday}
            onBirthdayChange={setBirthday}
            onNext={goNext}
          />
        );
      case 6:
        return (
          <MonthlyCostInput cost={cost} setCost={setCost} onNext={goNext} />
        );
      case 7:
        return <RegisterCom />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-6 flex h-screen flex-col">
      <AnimatePresence>
        {step > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header onClick={goBack} isVisible={step !== TOTAL_STEPS + 1} />
          </motion.div>
        )}
      </AnimatePresence>
      {step < 6 ? (
        <>
          <div className="pt-5">
            <Stepper totalSteps={TOTAL_STEPS} currentStep={step} />
          </div>
        </>
      ) : (
        <></>
      )}
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
