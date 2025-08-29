import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { type InputRef, Switch } from 'antd';
import Header from '@/components/Header';
import Stepper from '@/components/common/Stepper.tsx';
import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';
import BoxInput from '@/components/common/BoxInput.tsx';
import confettiGif from '@/assets/bucket-detail/confetti.gif';
import { SelectCategory } from '@/features/bucket-create/components/SelectCategory.tsx';
import { WhoAndWhat } from '@/features/bucket-create/components/WhoAndWhat';
import { SelectGroupMember } from '@/features/bucket-create/components/SelectGroupMember';
import { GoalAmountPeriod } from '@/features/bucket-create/components/GoalAmountPeriod.tsx';
import { CreateBox } from '@/features/bucket-create/components/CreateBox.tsx';
import { ConfirmBucket } from '@/features/bucket-create/components/ConfirmBucket.tsx';
import { BoxInfo } from '@/features/bucket-create/components/BoxInfo.tsx';

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

export default function BucketCreatePage() {
  const today = new Date();
  const dayStr = String(today.getDate()).padStart(2, '0');
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();
  // 버킷리스트 데이터 상태
  const [category, setCategory] = useState('');
  const [withFamily, setWithFamily] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState<number | null>(null);
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  // TODO 실제 사용자의 월 생활비 데이터
  const [livingCost, setLivingCost] = useState(2000000);
  const [boxName, setBoxName] = useState('');
  const [automaticTransfer, setAutomaticTransfer] = useState(false);
  const [transferDay, setTransferDay] = useState(dayStr);

  const TOTAL_STEPS = 4;

  const handleAmount = () => {
    // 콤마 제거 및 월 저축액 계산
    const cleanAmount = Number(amount.replace(/,/g, ''));
    const monthlySaving = period ? Math.round(cleanAmount / period) : 0;
    setMonthlyAmount(monthlySaving);
  };
  // const handleCreate = () => {
  //   console.log('버킷리스트 생성:', { category, title, amount, period });
  //   // TODO: useMutation을 사용하여 서버에 생성 요청
  // };

  const goNext = () => {
    setDirection(1);
    if (withFamily === false && step === 2) {
      setStep(4);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (step === 1) {
      navigate(-1); // 이전 페이지로 이동
    } else {
      setDirection(-1);
      if (withFamily === false && step === 4) {
        setStep((prev) => prev - 2);
      } else {
        setStep((prev) => prev - 1);
      }
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <SelectCategory setCategory={setCategory} onNext={goNext} />;
      case 2:
        return (
          <WhoAndWhat
            title={title}
            setTitle={setTitle}
            withFamily={withFamily}
            setWithFamily={setWithFamily}
            visible={visible}
            setVisible={setVisible}
            onNext={goNext}
          />
        );
      case 3:
        return (
          <SelectGroupMember
            selectedNames={selectedNames}
            setSelectedNames={setSelectedNames}
            onNext={goNext}
          />
        );
      case 4:
        return (
          <GoalAmountPeriod
            amount={amount}
            setAmount={setAmount}
            period={period}
            setPeriod={setPeriod}
            handleAmount={handleAmount}
            onNext={goNext}
          />
        );
      case 5:
        return (
          <CreateBox
            title={title}
            targetAmount={amount}
            period={period}
            livingCost={livingCost}
            onNext={goNext}
          />
        );
      case 6:
        return (
          <BoxInfo
            boxName={boxName}
            setBoxName={setBoxName}
            automaticTransfer={automaticTransfer}
            setAutomaticTransfer={setAutomaticTransfer}
            monthlyAmount={monthlyAmount}
            setMonthlyAmount={setMonthlyAmount}
            transferDay={transferDay}
            setTransferDay={setTransferDay}
            onNext={goNext}
          />
        );
      case 7:
        return <ConfirmBucket title={title} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-6 flex flex-col h-screen">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Header onClick={goBack} isVisible={step !== 5 && step !== 7} />{' '}
        </motion.div>
      </AnimatePresence>
      {step < 5 ? (
        <div className="pt-5">
          <Stepper totalSteps={TOTAL_STEPS} currentStep={step} />
        </div>
      ) : (
        <></>
      )}
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
