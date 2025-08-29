import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { type InputRef, Switch } from 'antd';
import type { IconColor } from '@/types/common.ts';
import Header from '@/components/Header';
import Stepper from '@/components/common/Stepper.tsx';
import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';
import BucketListCategoryItem from '@/components/BucketListCategoryItem.tsx';
import SelectItem from '@/components/SelectItem.tsx';
import piggyPng from '@/assets/bucket-edit/piggy.png';
import boxPng from '@/assets/bucket-detail/box.png';
import BottomSheet from '@/components/common/BottomSheet.tsx';
import BoxInput from '@/components/common/BoxInput.tsx';
import confettiGif from '@/assets/bucket-detail/confetti.gif';

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
      <div className="flex-grow space-y-6 text-left">
        <p className="text-3xl font-hana-regular">
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
type Step2Props = {
  title: string;
  setTitle: (str: string) => void;
  withFamily: boolean | null;
  setWithFamily: (bool: boolean) => void;
  visible: boolean;
  setVisible: (bool: boolean) => void;
  onNext: () => void;
};
const Step2 = ({
  title,
  setTitle,
  withFamily,
  setWithFamily,
  visible,
  setVisible,
  onNext,
}: Step2Props) => {
  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    if (withFamily !== null) {
      inputRef.current?.focus();
    }
  }, [withFamily]);
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6 text-left">
        <p className="text-3xl font-hana-regular">
          <span className="font-hana-bold">버킷리스트</span>에 대한 정보를
          <br />
          입력해 주세요
        </p>

        <div className="flex gap-15 w-full items-center">
          <span className="font-hana-regular text-3xl">
            <span className="font-hana-bold">가족</span>에게 버킷 공개{' '}
          </span>
          <Switch
            checked={visible}
            onChange={setVisible}
            style={{
              backgroundColor: visible ? '#008485' : '#d1d5db',
              transform: 'scale(1.5)',
              transformOrigin: 'center',
              position: 'relative',
              top: '3px',
            }}
          />{' '}
        </div>

        <div className="w-full">
          <p className="font-hana-bold text-3xl">1. 누구와</p>
          <div className="flex gap-2 w-full mt-3">
            <SelectItem
              text="혼자"
              selected={withFamily === false}
              onClick={() => setWithFamily(false)}
            />
            <SelectItem
              text="함께"
              selected={withFamily === true}
              onClick={() => setWithFamily(true)}
            />
          </div>
        </div>
        {withFamily !== null ? (
          <>
            <p className="font-hana-bold text-3xl">2. 무엇을</p>
            <Input
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 스위스에서 패러글라이딩"
              intent="green"
            />
          </>
        ) : (
          <></>
        )}
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
type Step3Props = {
  selectedNames: string[];
  setSelectedNames: (prev: (prev: string[]) => string[]) => void;
  onNext: () => void;
};
const Step3 = ({ selectedNames, setSelectedNames, onNext }: Step3Props) => {
  //TODO 가족 구성원 받아오기
  const familyNames = ['원윤서', '손혜정', '김대현', '김기보', '정재희'];
  const toggleName = (name: string) => {
    setSelectedNames((prev: string[]) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6 text-left">
        <p className="text-3xl font-hana-regular">
          버킷리스트를 <span className="font-hana-bold">함께할 가족</span>을
          <br />
          모두 선택해 주세요
        </p>
        <div className="w-full scrollbar-hide overflow-y-auto min-h-0 pr-1 mb-5 pb-24">
          <div className="grid grid-cols-2 gap-3 mt-6">
            {familyNames.map((name) => (
              <SelectItem
                key={name}
                text={name}
                selected={selectedNames.includes(name)}
                onClick={() => toggleName(name)}
              />
            ))}
          </div>
        </div>
      </div>
      <Button label="다 음" size="full-lg" intent="green" onClick={onNext} />
    </div>
  );
};

// Step 4: 목표 금액, 기간
type Step4Props = {
  amount: string;
  setAmount: (str: string) => void;
  period: number | null;
  setPeriod: (num: number) => void;
  handleAmount: () => void;
  onNext: () => void;
};
const Step4 = ({
  amount,
  setAmount,
  period,
  setPeriod,
  handleAmount,
  onNext,
}: Step4Props) => {
  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값에서 숫자만 추출
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setAmount('');
      return;
    }
    // 숫자로 변환 후 locale string 적용
    const formatted = Number(rawValue).toLocaleString();
    setAmount(formatted);
  };
  const handleNext = () => {
    handleAmount();
    onNext();
  };

  const periods = [3, 6, 12, 24];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6 text-left">
        <div>
          <p className="font-hana-regular text-3xl mb-3">
            버킷리스트를 이루기 위한
            <br />
            <span className="font-hana-bold">목표 금액</span>을 입력해 주세요
          </p>
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={amount}
              onChange={handleChange}
              placeholder="3,000,000"
              type="text"
              intent="green"
            />
            <span className="text-3xl font-hana-regular">원</span>
          </div>
        </div>
        <div>
          <p className="font-hana-regular text-3xl mb-3">
            <span className="font-hana-bold">목표 기간</span>을 선택해 주세요
          </p>
          <div className="grid grid-cols-2 gap-3">
            {periods.map((p) => (
              <SelectItem
                key={p}
                text={`${p}개월`}
                selected={period === p}
                onClick={() => setPeriod(p)}
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        label="다 음"
        size="full-lg"
        intent="green"
        onClick={handleNext}
        disabled={!amount || !period}
      />
    </div>
  );
};

// Step 5: 박스 생성 확인
type Step5Props = {
  title: string;
  targetAmount: string;
  period: number | null;
  livingCost: number;
  onNext: () => void;
};
const Step5 = ({
  title,
  targetAmount,
  period,
  livingCost,
  onNext,
}: Step5Props) => {
  const navigate = useNavigate();
  const [bottomVisible, setBottomVisible] = useState(false);

  // 콤마 제거 및 월 저축액 계산
  const cleanAmount = Number(targetAmount.replace(/,/g, ''));
  const monthlySaving = period ? Math.round(cleanAmount / period) : 0;

  // 월 생활비 대비 저축액 비율 및 설명 문구 계산
  const getDescriptiveText = () => {
    if (livingCost <= 0) return { text: '', percentage: 0 };

    const percentage = Math.round((monthlySaving / livingCost) * 100);
    let text = '';
    if (percentage <= 25) {
      text = '현재 월 생활비 대비 여유로운 수준이에요';
    } else if (percentage <= 50) {
      text = '현재 월 생활비 대비 적절한 수준이에요';
    } else if (percentage <= 75) {
      text = '현재 월 생활비 대비 다소 많은 편이에요';
    } else {
      text = '현재 월 생활비 대비 매우 부담될 수 있어요';
    }
    return { text };
  };
  const { text: description } = getDescriptiveText();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6 text-left">
        <p className="text-3xl font-hana-regular">
          버킷리스트를 이루기 위해
          <br />
          한달에{' '}
          <span className="font-hana-bold">
            {monthlySaving.toLocaleString()}
          </span>
          원씩
          <br />
          모아야해요
        </p>
        <div className="text-left">
          <p className="font-hana-medium text-lg text-text-secondary">
            {description}
          </p>
        </div>
        <div className="mt-8 flex-grow flex justify-center items-center">
          <img src={piggyPng} alt="저금하기" />
        </div>
      </div>

      <div className="flex gap-2 w-full">
        <Button
          label="취 소"
          size="lg"
          intent="gray"
          font="regular"
          onClick={() => navigate('/home')}
          className="w-1/4"
        />
        <Button
          label="확 인"
          size="lg"
          intent="green"
          font="regular"
          onClick={(e) => setBottomVisible(true)}
          className="w-3/4"
        />
      </div>
      <BottomSheet
        isOpen={bottomVisible}
        onClose={() => setBottomVisible(false)}
      >
        <div className="flex flex-col h-full items-center">
          <p className="font-hana-regular text-left text-3xl w-full !mb-0">
            <span className="font-hana-bold">{title}</span> 버킷리스트
            <br />
            목표금액을 모으기 위한
            <br />
            <span className="font-hana-bold">박스</span>를 개설할께요{' '}
          </p>
          <img src={boxPng} className="w-48 h-48 my-30" alt="저금하기" />
        </div>
        <Button
          label="확 인"
          size="full-lg"
          font="regular"
          intent="green"
          onClick={() => {
            setBottomVisible(false);
            onNext();
          }}
        />
      </BottomSheet>
    </div>
  );
};

// Step 6: 박스 정보 입력
type Step6Props = {
  boxName: string;
  setBoxName: (str: string) => void;
  automaticTransfer: boolean;
  setAutomaticTransfer: (bool: boolean) => void;
  monthlyAmount: number;
  setMonthlyAmount: (num: number) => void;
  transferDay: string;
  setTransferDay: (str: string) => void;
  onNext: () => void;
};
const Step6 = ({
  boxName,
  setBoxName,
  automaticTransfer,
  setAutomaticTransfer,
  monthlyAmount,
  setMonthlyAmount,
  transferDay,
  setTransferDay,
  onNext,
}: Step6Props) => {
  const inputRef = useRef<InputRef>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값에서 숫자만 추출
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setMonthlyAmount(0);
      return;
    }
    // 숫자로 변환 후 locale string 적용
    setMonthlyAmount(Number(rawValue));
  };
  useEffect(() => {
    if (automaticTransfer) {
      inputRef.current?.focus();
    }
  }, [automaticTransfer]);
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6 text-left">
        <p className="font-hana-regular text-3xl mb-3">
          <span className="font-hana-bold">박스 별명</span>을 입력해 주세요
        </p>
        <Input
          intent="green"
          value={boxName}
          onChange={(e) => setBoxName(e.target.value)}
        />
        <div className="flex items-center gap-15 w-full my-10">
          <span className="font-hana-regular text-3xl">
            <span className="font-hana-bold">자동이체</span> 설정{' '}
          </span>
          <Switch
            checked={automaticTransfer}
            onChange={setAutomaticTransfer}
            style={{
              backgroundColor: automaticTransfer ? '#008485' : '#d1d5db',
              transform: 'scale(1.5)',
              transformOrigin: 'center',
              position: 'relative',
              top: '3px',
            }}
          />{' '}
        </div>
        {automaticTransfer ? (
          <>
            <div className="mt-10">
              <p className="font-hana-regular text-3xl mb-3">
                <span className="font-hana-bold">매월 박스에 충전할 금액</span>
                을
                <br />
                입력해 주세요
              </p>
              <div className="flex items-center gap-2">
                <Input
                  ref={inputRef}
                  value={monthlyAmount.toLocaleString()}
                  onChange={handleChange}
                  type="text"
                  intent="green"
                />
                <span className="text-3xl font-hana-regular">원</span>
              </div>
              <div className="mt-10">
                <p className="font-hana-regular text-3xl mb-3">
                  <span className="font-hana-bold">자동이체일</span>을 입력해
                  주세요
                </p>
                <div className="flex gap-4 items-center">
                  <BoxInput
                    length={2}
                    value={transferDay}
                    onChange={setTransferDay}
                    align="start"
                  />
                  <p className="text-3xl font-hana-regular !m-0">일</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <Button
        label="확 인"
        disabled={boxName.length === 0}
        size="full-lg"
        intent="green"
        font="regular"
        onClick={onNext}
      />
    </div>
  );
};

// Step 7: 최종 화면
type Step7Props = {
  title: string;
};
const Step7 = ({ title }: Step7Props) => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/home');
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6 text-left">
        <p className="font-hana-regular text-3xl mb-3">
          <span className="font-hana-bold">{title}</span> 버킷리스트와
          <br />
          박스가 성공적으로
          <br />
          등록되었어요
        </p>
        <div className="w-80 justify-start">
          <span className="text-zinc-800 text-lg font-normal font-['Hana2.0_R']">
            박스를 모두 채우면 다양한{' '}
          </span>
          <span className="text-zinc-800 text-lg font-normal font-['Hana2.0_B']">
            제휴 혜택
          </span>
          <span className="text-zinc-800 text-lg font-normal font-['Hana2.0_R']">
            을<br />
            받을 수 있어요
          </span>
        </div>
        <img src={confettiGif} alt={'축하해요!'} />
      </div>
      <Button
        label="확 인"
        size="full-lg"
        font="regular"
        intent="green"
        onClick={goHome}
      />
    </div>
  );
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
        return <Step1 setCategory={setCategory} onNext={goNext} />;
      case 2:
        return (
          <Step2
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
          <Step3
            selectedNames={selectedNames}
            setSelectedNames={setSelectedNames}
            onNext={goNext}
          />
        );
      case 4:
        return (
          <Step4
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
          <Step5
            title={title}
            targetAmount={amount}
            period={period}
            livingCost={livingCost}
            onNext={goNext}
          />
        );
      case 6:
        return (
          <Step6
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
        return <Step7 title={title} />;
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
