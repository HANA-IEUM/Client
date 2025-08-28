import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { InputRef } from 'antd';
import type { IconColor } from '@/types/common.ts';
import Header from '@/components/Header';
import Stepper from '@/components/common/Stepper.tsx';
import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';
import BucketListCategoryItem from '@/components/BucketListCategoryItem.tsx';

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

// Step 1: 카테고리 선택
type Step1Props = {
  setCategory: (str: string) => void;
  onNext: () => void;
};
const Step1 = ({ setCategory, onNext }: Step1Props) => {
  const categories: Array<{ id: string; label: string; color: IconColor }> = [
    { id: 'TRAVEL', label: '여행', color: 'pink' },
    { id: 'HOBBY', label: '취미', color: 'blue' },
    { id: 'HEALTH', label: '건강', color: 'yellow' },
    { id: 'FAMILY_SUPPORT', label: '가족지원', color: 'green' },
  ];
  const handleSelectCategory = (str: string) => {
    setCategory(str);
    onNext();
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <p className="text-3xl font-hana-regular text-left">
          <span className="font-hana-bold">버킷리스트의 카테고리</span>를
          <br />
          선택해 주세요
        </p>
        <div className="grid grid-cols-2 gap-4 place-items-center">
          {categories.map((cat) => (
            <BucketListCategoryItem
              text={cat.label}
              color={cat.color}
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Step 2: 누구와 무엇을
const Step2 = ({ title, onTitleChange, onNext }) => {
  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <p className="text-3xl font-hana-regular text-center">
          <span className="font-hana-bold">누구와 무엇을</span> 하고
          <br />
          싶으신가요?
        </p>
        <Input
          ref={inputRef}
          value={title}
          onChange={onTitleChange}
          placeholder="예: 스위스에서 패러글라이딩"
          intent="green"
          label="무엇을"
        />
        <div className="text-text-secondary text-center p-8 border border-dashed rounded-lg">
          {/* TODO: '혼자' 또는 '함께' 선택 UI */}
          누구와 (혼자/함께) 선택 UI 영역
        </div>
      </div>
      <Button
        label="다 음"
        size="full-lg"
        intent="green"
        onClick={onNext}
        disabled={!title}
      />
    </div>
  );
};

// Step 3: 함께할 그룹원
const Step3 = ({ onNext }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <p className="text-3xl font-hana-regular text-center">
          <span className="font-hana-bold">누구와 함께</span>
          <br />
          하시겠어요?
        </p>
        <div className="text-text-secondary text-center p-8 border border-dashed rounded-lg">
          {/* TODO: 그룹원 초대/선택 UI */}
          그룹원 선택 UI 영역
        </div>
      </div>
      <Button label="다 음" size="full-lg" intent="green" onClick={onNext} />
    </div>
  );
};

// Step 4: 목표 금액, 기간
const Step4 = ({ amount, onAmountChange, onNext }) => {
  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <p className="text-3xl font-hana-regular text-center">
          <span className="font-hana-bold">목표와 기간</span>을
          <br />
          설정해주세요
        </p>
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            value={amount}
            onChange={onAmountChange}
            placeholder="예: 3000000"
            type="number"
            intent="green"
            label="목표 금액"
          />
          <span className="text-3xl font-hana-regular pt-8">원</span>
        </div>
        <div className="text-text-secondary text-center p-8 border border-dashed rounded-lg">
          {/* TODO: 기간 설정(Date Picker) UI 구현 */}
          기간 설정 UI 영역
        </div>
      </div>
      <Button
        label="다 음"
        size="full-lg"
        intent="green"
        onClick={onNext}
        disabled={!amount}
      />
    </div>
  );
};

// Step 5: 최종 확인
const Step5 = ({ bucketData, onCreate }) => (
  <div className="flex flex-col h-full">
    <div className="flex-grow space-y-6">
      <p className="text-3xl font-hana-regular text-center">
        <span className="font-hana-bold">마지막</span>으로
        <br />
        확인해주세요
      </p>
      <div className="text-left p-4 bg-btn-default-bg rounded-lg space-y-2 font-hana-regular">
        <p>
          <strong>카테고리:</strong> {bucketData.category || '미선택'}
        </p>
        <p>
          <strong>이름:</strong> {bucketData.title}
        </p>
        <p>
          <strong>목표 금액:</strong>{' '}
          {Number(bucketData.amount).toLocaleString()}원
        </p>
        {/* TODO: 다른 정보 요약 표시 */}
      </div>
    </div>
    <Button label="생성하기" size="full-lg" intent="green" onClick={onCreate} />
  </div>
);

export default function BucketCreatePage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();

  // 버킷리스트 데이터 상태
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const TOTAL_STEPS = 5;

  const handleCreate = () => {
    console.log('버킷리스트 생성:', { category, title, amount });
    // TODO: useMutation을 사용하여 서버에 생성 요청
  };

  const goNext = () => {
    if (step >= TOTAL_STEPS) {
      handleCreate();
      return;
    }
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const goBack = () => {
    if (step === 1) {
      navigate(-1); // 이전 페이지로 이동
    } else {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1 setCategory={setCategory} onNext={goNext} />;
      case 2:
        return (
          <Step2
            title={title}
            onTitleChange={(e) => setTitle(e.target.value)}
            onNext={goNext}
          />
        );
      case 3:
        return <Step3 onNext={goNext} />;
      case 4:
        return (
          <Step4
            amount={amount}
            onAmountChange={(e) => setAmount(e.target.value)}
            onNext={goNext}
          />
        );
      case 5:
        return (
          <Step5
            bucketData={{ category, title, amount }}
            onCreate={handleCreate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-6 flex flex-col h-screen">
      <Header onClick={goBack} />
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
