import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Stepper from '@/components/common/Stepper.tsx';
import Header from '@/components/Header';
import { BoxInfo } from '@/features/bucket-create/components/BoxInfo.tsx';
import { ConfirmBucket } from '@/features/bucket-create/components/ConfirmBucket.tsx';
import { CreateBox } from '@/features/bucket-create/components/CreateBox.tsx';
import { GoalAmount } from '@/features/bucket-create/components/GoalAmount.tsx';
import { GoalPeriod } from '@/features/bucket-create/components/GoalPeriod.tsx';
import { SelectCategory } from '@/features/bucket-create/components/SelectCategory.tsx';
import { SelectGroupMember } from '@/features/bucket-create/components/SelectGroupMember';
import { WhoAndWhat } from '@/features/bucket-create/components/WhoAndWhat';
import { useCreateBucket } from '@/features/bucket-create/hooks/useCreateBucket.ts';
import type {
  BucketCategoryType,
  CreateBucketPayload,
} from '@/features/bucket-create/types/bucket.ts';
import { fetchGroupInfo } from '@/features/group-join/apis/groupApi.ts';
import { groupQK } from '@/features/group-join/hooks/useGroupInfo.ts';
import { useGAEvent } from '@/hooks/useGAEvent';
import { useMonthlyLivingCost } from '@/hooks/useMonthlyLivingCost.ts';
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

export default function BucketCreatePage() {
  const trackBucketEvent = useGAEvent('bucket_create');

  const today = new Date();
  const dayStr = String(today.getDate()).padStart(2, '0');
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();
  // 버킷리스트 데이터 상태
  const [category, setCategory] = useState<BucketCategoryType>('');
  const [withFamily, setWithFamily] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState<number | null>(null);
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [selectedMembersIds, setSelectedMembersIds] = useState<number[]>([]);
  const [boxName, setBoxName] = useState('');
  const [automaticTransfer, setAutomaticTransfer] = useState(false);
  const [transferDay, setTransferDay] = useState(dayStr);
  const { data: livingCost } = useMonthlyLivingCost();
  // 그룹정보 불러오기
  const { data: groupInfo } = useQuery({
    queryKey: groupQK.info,
    queryFn: fetchGroupInfo,
  });

  const TOTAL_STEPS = 5;

  const getNumberAmount = (str: string) => {
    return Number(str.replace(/,/g, ''));
  };

  const handleAmount = () => {
    // 콤마 제거 및 월 저축액 계산
    const cleanAmount = Number(amount.replace(/,/g, ''));
    const monthlySaving = period ? Math.round(cleanAmount / period) : 0;
    setMonthlyAmount(monthlySaving);
  };

  const createBucketMutation = useCreateBucket(
    () => {
      trackBucketEvent('bucket_create_success', 'completed');
      navigate('/home', { replace: true });
    },
    () => {
      trackBucketEvent('bucket_create_failed', 'error');
      showError('버킷 생성에 실패했어요. 다시 시도해 주세요.');
    }
  );

  const handleCreate = () => {
    const payload: CreateBucketPayload = {
      type: category,
      title: title,
      targetAmount: getNumberAmount(amount),
      publicFlag: visible,
      togetherFlag: withFamily,
      selectedMemberIds: selectedMembersIds,
      createMoneyBox: true,
      moneyBoxName: boxName,
      enableAutoTransfer: automaticTransfer,
      monthlyAmount: monthlyAmount,
      transferDay: transferDay,
      targetMonths: period === null ? '' : period.toString(),
    };
    createBucketMutation.mutate(payload);
  };

  const goNext = () => {
    setDirection(1);

    switch (step) {
      case 1:
        trackBucketEvent('bucket_category_selected', category);
        break;
      case 2:
        trackBucketEvent(
          'bucket_whoandwhat_done',
          withFamily ? 'with_family' : 'solo'
        );
        break;
      case 3:
        trackBucketEvent(
          'bucket_members_selected',
          selectedMembersIds.length.toString()
        );
        break;
      case 4:
        trackBucketEvent('bucket_goal_amount_set', amount);
        break;
      case 5:
        trackBucketEvent('bucket_goal_period_set', String(period));
        break;
      case 6:
        trackBucketEvent(
          'bucket_boxinfo_done',
          automaticTransfer ? 'auto_transfer' : 'manual'
        );
        break;
    }

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
            hasGroup={!!groupInfo}
            onNext={goNext}
          />
        );
      case 3:
        if (!groupInfo?.members) {
          return null;
        }
        return (
          <SelectGroupMember
            selectedNames={selectedMembersIds}
            setSelectedNames={setSelectedMembersIds}
            groupMemberInfo={groupInfo.members}
            onNext={goNext}
          />
        );
      case 4:
        return (
          <GoalAmount amount={amount} setAmount={setAmount} onNext={goNext} />
        );
      case 5:
        return (
          <GoalPeriod
            period={period}
            setPeriod={setPeriod}
            onNext={goNext}
            handleAmount={handleAmount}
          />
        );
      case 6:
        return (
          <CreateBox
            title={title}
            targetAmount={amount}
            period={period}
            livingCost={livingCost || 0}
            onNext={goNext}
          />
        );
      case 7:
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
      case 8:
        return <ConfirmBucket title={title} onSubmit={handleCreate} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-6 flex h-screen flex-col">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Header onClick={goBack} isVisible={step !== 6 && step !== 8} />{' '}
        </motion.div>
      </AnimatePresence>
      {step < 6 ? (
        <div className="pt-5">
          <Stepper totalSteps={TOTAL_STEPS} currentStep={step} />
        </div>
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
