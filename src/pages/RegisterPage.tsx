import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Stepper from '@/components/common/Stepper.tsx';
import type { InputRef } from 'antd';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/Button.tsx';
import Input from '@/components/input/Input.tsx';
import BoxInput, {
  type BoxInputHandle,
} from '@/components/common/BoxInput.tsx';
import phoneIcon from '@/assets/common/user/phone.png';
import messageIcon from '@/assets/common/user/message.png';
import { useRegister } from '@/hooks/auth/useRegister.ts';
import { useVerification } from '@/hooks/auth/useVerification.ts';
import checkCircleSvg from '@/assets/group-join/checkCircle.svg';
import toast from 'react-hot-toast';
import { useVerificationConfirm } from '@/hooks/auth/useVerificationConfirm.ts';

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

type Step1Props = {
  phoneNumber: string;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
};

const Step1 = ({ phoneNumber, onPhoneNumberChange, onNext }: Step1Props) => {
  const inputRef = useRef<InputRef>(null);

  const verificationMutation = useVerification(
    () => {},
    () => {}
  );

  const buttonClick = () => {
    onNext();
    verificationMutation.mutate({
      to: phoneNumber,
    });
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="w-16 h-16 bg-theme-secondary rounded-full flex items-center justify-center mx-auto">
          <img src={phoneIcon} alt="phone" className="w-10 h-10" />
        </div>
        <p className="text-3xl font-hana-regular pt-4 text-center">
          <span className="font-hana-bold">전화번호</span>를 입력해주세요
        </p>
        <Input
          ref={inputRef}
          intent="green"
          placeholder="01012345678"
          helperText="하이픈(-) 없이 숫자만 입력"
          value={phoneNumber}
          onChange={onPhoneNumberChange}
        />
      </div>
      <Button
        label="확 인"
        size="full-lg"
        intent="green"
        font="regular"
        onClick={buttonClick}
        disabled={phoneNumber.length < 10} // 전화번호가 입력되어야 활성화
      />
    </div>
  );
};

type Step2Props = {
  phoneNumber: string;
  onNext: () => void;
};

const Step2 = ({ phoneNumber, onNext }: Step2Props) => {
  const [pin, setPin] = useState('');
  const boxInputRef = useRef<BoxInputHandle>(null);

  // 인증번호 발송을 위한 mutation
  const sendVerificationMutation = useVerification(
    () => {
      toast.custom(
        () => (
          <div className="max-w-[400px] mx-auto mb-16">
            <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5 px-4 py-3 flex items-center gap-2">
              <img
                src={checkCircleSvg}
                className="inline-block size-5"
                alt="성공"
              />
              <span className="font-hana-bold text-xl text-[var(--color-text-primary)]">
                인증번호를 재전송했어요
              </span>
            </div>
          </div>
        ),
        { duration: 2000, position: 'top-center', id: 'resend-ok' }
      );
    },
    () => {}
  );

  // 인증번호 검증을 위한 mutation
  const verificationConfirmMutation = useVerificationConfirm(
    () => {
      // 성공 시 다음 단계로 이동
      onNext();
    },
    () => {
      // 실패 시 토스트 알림을 띄우고 입력값을 초기화
      toast.error('인증번호가 올바르지 않아요.');
      setPin('');
      boxInputRef.current?.focus();
    }
  );

  useEffect(() => {
    boxInputRef.current?.focus();
  }, []);

  const handleResend = () => {
    sendVerificationMutation.mutate({
      to: phoneNumber,
    });
  };

  const handleConfirm = () => {
    verificationConfirmMutation.mutate({
      to: phoneNumber,
      verificationCode: pin,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="w-16 h-16 bg-theme-secondary rounded-full flex items-center justify-center mx-auto">
          <img src={messageIcon} alt="message" className="w-10 h-10" />
        </div>
        <p className="text-3xl font-hana-regular text-center">
          <span className="font-hana-bold">{phoneNumber}</span>로 받은 <br />
          <span className="font-hana-bold">인증번호</span>를 입력해 주세요
        </p>
        <BoxInput ref={boxInputRef} length={6} onChange={setPin} value={pin} />
        <div className="text-center">
          <Button
            label="인증번호 재전송"
            font="regular"
            size="full-lg"
            intent="gray"
            onClick={handleResend}
          ></Button>
        </div>
      </div>
      <Button
        label="확 인"
        size="full-lg"
        intent="green"
        font="regular"
        onClick={handleConfirm}
        disabled={pin.length !== 6 || verificationConfirmMutation.isPending} // 6자리 입력 & 로딩 중 아닐 때 활성화
        loading={verificationConfirmMutation.isPending}
      />
    </div>
  );
};

type Step3Props = {
  pw: string;
  onPwChange: (pin: string) => void;
  onNext: () => void;
};
const Step3 = ({ pw, onPwChange, onNext }: Step3Props) => {
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
          <img
            src="/src/assets/common/user/password.png"
            alt="message"
            className="w-10 h-10"
          />
        </div>
        <p className="text-3xl font-hana-regular text-center">
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
            <p className="text-3xl font-hana-regular text-center">
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

type Step4Props = {
  name: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
};

const Step4 = ({ name, onNameChange, onNext }: Step4Props) => {
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="w-16 h-16 bg-theme-secondary rounded-full flex items-center justify-center mx-auto">
          <img
            src="/src/assets/common/user/name.png"
            alt="message"
            className="w-10 h-10"
          />
        </div>
        <p className="text-3xl font-hana-regular text-center">
          <span className="font-hana-bold">성함</span>을 입력해 주세요
        </p>
        <Input
          ref={inputRef}
          intent="green"
          placeholder="홍길동"
          value={name}
          onChange={onNameChange}
        />
      </div>
      <Button
        label="다 음"
        size="full-lg"
        intent="green"
        font="regular"
        onClick={onNext}
        disabled={!name}
      />
    </div>
  );
};

type Step5Props = {
  birthday: string;
  onBirthdayChange: (birthday: string) => void;
  onNext: () => void;
};

const Step5 = ({ birthday, onBirthdayChange, onNext }: Step5Props) => {
  const yearInputRef = useRef<BoxInputHandle>(null);
  const monthInputRef = useRef<BoxInputHandle>(null);
  const dayInputRef = useRef<BoxInputHandle>(null);
  const [year, setYear] = useState(() => birthday?.split('-')[0] || '');
  const [month, setMonth] = useState(() => birthday?.split('-')[1] || '');
  const [day, setDay] = useState(() => birthday?.split('-')[2] || '');

  useEffect(() => {
    yearInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (year.length === 4 && month.length === 2 && day.length === 2) {
      onBirthdayChange(`${year}-${month}-${day}`);
    } else {
      onBirthdayChange('');
    }
  }, [year, month, day, onBirthdayChange]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="w-16 h-16 bg-theme-secondary rounded-full flex items-center justify-center mx-auto">
          <img
            src="/src/assets/common/user/birthday.png"
            alt="birthday"
            className="w-10 h-10"
          />
        </div>
        <p className="text-3xl font-hana-regular text-center">
          <span className="font-hana-bold">생년월일</span>을 입력해 주세요
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BoxInput
              ref={yearInputRef}
              length={4}
              onChange={setYear}
              onComplete={() => monthInputRef.current?.focus()}
              value={year}
              align="start"
            />
            <span className="text-3xl font-hana-regular">년</span>
          </div>
          <div className="flex items-center gap-2">
            <BoxInput
              ref={monthInputRef}
              length={2}
              onChange={setMonth}
              onComplete={() => dayInputRef.current?.focus()}
              value={month}
              align="start"
            />
            <span className="text-3xl font-hana-regular">월</span>
          </div>
          <div className="flex items-center gap-2">
            <BoxInput
              ref={dayInputRef}
              length={2}
              onChange={setDay}
              value={day}
              align="start"
            />
            <span className="text-3xl font-hana-regular">일</span>
          </div>
        </div>
      </div>
      <Button
        label="다 음"
        size="full-lg"
        intent="green"
        font="regular"
        onClick={onNext}
        disabled={birthday.length !== 10}
      />
    </div>
  );
};

type Step6Props = {
  cost: string;
  onCostChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
};

const Step6 = ({ cost, onCostChange, onNext }: Step6Props) => {
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6">
        <div className="w-16 h-16 bg-theme-secondary rounded-full flex items-center justify-center mx-auto">
          <img
            src="/src/assets/common/user/coin.png"
            alt="wallet"
            className="w-10 h-10"
          />
        </div>
        <p className="text-3xl font-hana-regular text-center">
          <span className="font-hana-bold">월 생활비</span>를 입력해 주세요
        </p>
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            intent="green"
            placeholder="500000"
            value={cost}
            onChange={onCostChange}
          />
          <span className="text-3xl font-hana-regular">원</span>
        </div>
      </div>
      <div className="mb-4">
        <p>
          은퇴 후 자금 설계 이전이라면, <br />
          아래 버튼을 클릭해 진단을 먼저 받아주세요
        </p>
        <Button
          label="자금 설계 →"
          size="full-lg"
          intent="mint"
          font="regular"
          onClick={() =>
            window.open(
              'https://pension.kebhana.com/rpc/hhom/kr/rpc02060201.do',
              '_blank'
            )
          }
        />
      </div>
      <Button
        label="완료"
        size="full-lg"
        intent="green"
        font="regular"
        onClick={onNext}
        disabled={!cost}
      />
    </div>
  );
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
          <Step1
            phoneNumber={phoneNumber}
            onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
            onNext={goNext}
          />
        );
      case 2:
        return <Step2 phoneNumber={phoneNumber} onNext={goNext} />;
      case 3:
        return <Step3 pw={pw} onPwChange={setPw} onNext={goNext} />;
      case 4:
        return (
          <Step4
            name={name}
            onNameChange={(e) => setName(e.target.value)}
            onNext={goNext}
          />
        );
      case 5:
        return (
          <Step5
            birthday={birthday}
            onBirthdayChange={setBirthday}
            onNext={goNext}
          />
        );
      case 6:
        return (
          <Step6
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
