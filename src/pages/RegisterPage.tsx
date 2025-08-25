import { useState } from 'react';
import Stepper from '@/components/common/Stepper.tsx';
import { Avatar } from 'antd';
import CallIcon from '@/assets/common/CallIcon.tsx';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const goNext = () => {
    setStep(step + 1);
  };
  return (
    <div className="mx-6">
      <Stepper totalSteps={6} currentStep={step} />
      <Avatar icon={CallIcon()} />
      <p className="text-3xl">
        <span className="font-bold">전화번호</span>를 입력해주세요
      </p>
      <input></input>
      <button onClick={goNext}>확인</button>
    </div>
  );
}
