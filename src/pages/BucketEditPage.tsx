import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

import BucketEditBasicInfo from '@/features/bucket-edit/components/BucketEditBasicInfo';
import BucketEditFamily from '@/features/bucket-edit/components/BucketEditFamily';
import BucketEditSummary from '@/features/bucket-edit/components/BucketEditSummary';
import { useUpdateBucket } from '@/features/bucket-edit/hooks/useUpdateBucket';
import { showError, showSuccess } from '@/lib/toast';

type EditInfo = {
  title: string;
  publicFlag: boolean;
  shareFlag: boolean;
  selectedMemberIds: number[];
};

const BucketEditPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bucketId = searchParams.get('id');
  const { mutate: update, isPending } = useUpdateBucket(Number(bucketId));
  const [step, setStep] = useState(0);

  const [editInfo, setEditInfo] = useState<EditInfo>({
    title: '',
    publicFlag: false,
    shareFlag: false,
    selectedMemberIds: [],
  });

  const handleChangeTitle = (title: string) => {
    setEditInfo((prev) => ({ ...prev, title }));
  };

  const handleChangePublicFlag = (flag: boolean) => {
    setEditInfo((prev) => ({ ...prev, publicFlag: flag }));
  };

  const handleChangeShareFlag = (flag: boolean) => {
    setEditInfo((prev) => ({ ...prev, shareFlag: flag }));
  };

  const handleChangeMembers = (ids: number[]) => {
    setEditInfo((prev) => ({ ...prev, selectedMemberIds: ids }));
  };

  const handleConfirm = () => {
    update(editInfo, {
      onSuccess: () => {
        showSuccess('버킷이 성공적으로 수정되었어요.');
        setStep(2);
      },
      onError: () => {
        showError('버킷 수정에 오류가 생겼어요. 다시 시도해 주세요.');
      },
    });
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden px-6">
      <div className="mt-5"></div>

      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={step}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full transform-gpu will-change-transform"
        >
          {step === 0 && (
            <BucketEditBasicInfo
              onNext={() => {
                if (editInfo.shareFlag) {
                  setStep(1);
                } else {
                  handleConfirm(); // 혼자 → API 성공 시 Summary로
                }
              }}
              onBack={() => navigate(-1)}
              onChangeTitle={handleChangeTitle}
              onChangeShareFlag={handleChangeShareFlag}
              onChangePublicFlag={handleChangePublicFlag}
            />
          )}

          {step === 1 && (
            <BucketEditFamily
              onNext={() => {
                handleConfirm();
              }}
              onBack={() => setStep(step - 1)}
              onChangeMembers={handleChangeMembers}
            />
          )}

          {step === 2 && (
            <BucketEditSummary
              onConfirm={() => navigate(`/bucket/${bucketId}`)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BucketEditPage;
