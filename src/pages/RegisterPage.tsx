import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Stepper from '@/components/common/Stepper.tsx';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '@/features/auth/hooks/useRegister.ts';
import { PhoneInput } from '@/features/auth/components/PhoneInput.tsx';
import { PasswordInput } from '@/features/auth/components/PasswordInput.tsx';
import { PhoneVerification } from '@/features/auth/components/PhoneVerification.tsx';
import { NameInput } from '@/features/auth/components/NameInput.tsx';
import { BirthdayInput } from '@/features/auth/components/BirthdayInput';
import { MonthlyCostInput } from '@/features/auth/components/MonthlyCostInput.tsx';

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
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1: next, -1: prev
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [cost, setCost] = useState('');

  const navigate = useNavigate();

  const TOTAL_STEPS = 7; // Stepper에 표시될 전체 단계 수

  // 회원가입 훅
  const registerMutation = useRegister(
    () => {
      //TODO UI 변경 필요
      alert('회원가입 성공');
      navigate('/login');
    },
    (error) => {
      alert(error.message);
    }
  );
  const goNext = () => {
    if (step == TOTAL_STEPS - 1) {
      registerMutation.mutate({
        phoneNumber: phoneNumber,
        password: pw,
        name: name,
        birthDate: birthday,
        gender: 'M',
        monthlyLivingCost: Number(cost),
      });
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
          <MonthlyCostInput
            cost={cost}
            onCostChange={(e) => setCost(e.target.value)}
            onNext={goNext}
          />
        );
      default:
        return <div>완료!</div>; // 마지막 단계 이후
    }
  };

  return (
    <div className="mx-6 flex flex-col h-screen">
      <AnimatePresence>
        {step > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header onClick={goBack} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="pt-5">
        <Stepper totalSteps={TOTAL_STEPS} currentStep={step} />
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
