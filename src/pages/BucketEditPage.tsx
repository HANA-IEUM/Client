import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useBucketDetail } from '@/features/bucket-detail/hooks/useBucketDetail';
import BucketEditBasicInfo from '@/features/bucket-edit/components/BucketEditBasicInfo';
import BucketEditFamily from '@/features/bucket-edit/components/BucketEditFamily';
import BucketEditSummary from '@/features/bucket-edit/components/BucketEditSummary';
import { useUpdateBucket } from '@/features/bucket-edit/hooks/useUpdateBucket';
import { useGroupInfo } from '@/features/group-join/hooks/useGroupInfo';
import { useGAEvent } from '@/hooks/useGAEvent';
import { showError } from '@/lib/toast';

type EditInfo = {
  title: string;
  publicFlag: boolean;
  shareFlag: boolean;
  selectedMemberIds: number[];
};

const BucketEditPage = () => {
  const navigate = useNavigate();
  const trackBucketEditEvent = useGAEvent('bucket_edit');

  const { id: bucketId } = useParams<{ id: string }>();
  const { mutate: update } = useUpdateBucket(Number(bucketId));
  const { data: bucketDetail } = useBucketDetail(Number(bucketId));

  const [step, setStep] = useState(0);
  const [editInfo, setEditInfo] = useState<EditInfo>({
    title: '',
    publicFlag: false,
    shareFlag: false,
    selectedMemberIds: [],
  });

  useEffect(() => {
    if (bucketDetail) {
      setEditInfo({
        title: bucketDetail.title ?? '',
        publicFlag: bucketDetail.publicFlag ?? false,
        shareFlag: bucketDetail.togetherFlag,
        selectedMemberIds: [],
      });
    }
  }, [bucketDetail]);

  const { data: groupInfo } = useGroupInfo();
  const familyCount = groupInfo?.members?.length ?? 1; // 멤버 수, 없으면 1로 처리

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
    trackBucketEditEvent('bucket_edit_submit', 'attempt');
    update(editInfo, {
      onSuccess: () => {
        trackBucketEditEvent('bucket_edit_success', 'completed');
        setStep(2);
      },
      onError: () => {
        trackBucketEditEvent('bucket_edit_failed', 'error');
        showError('버킷 수정에 오류가 생겼어요. 다시 시도해 주세요.');
      },
    });
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden px-6">
      <div className="mt-5"></div>

      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={step}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full transform-gpu will-change-transform"
        >
          {step === 0 && (
            <BucketEditBasicInfo
              initialTitle={editInfo.title}
              initialShareFlag={editInfo.shareFlag}
              initialPublicFlag={editInfo.publicFlag}
              onNext={() => {
                trackBucketEditEvent(
                  'bucket_edit_basic_done',
                  `${editInfo.shareFlag ? 'share' : 'solo'}_${editInfo.publicFlag ? 'public' : 'private'}`
                );

                if (editInfo.shareFlag) {
                  setStep(1);
                } else {
                  handleConfirm();
                }
              }}
              onBack={() => navigate('/home')}
              onChangeTitle={handleChangeTitle}
              onChangeShareFlag={handleChangeShareFlag}
              onChangePublicFlag={handleChangePublicFlag}
              familyCount={familyCount}
            />
          )}

          {step === 1 && (
            <BucketEditFamily
              onNext={() => {
                trackBucketEditEvent(
                  'bucket_edit_family_done',
                  editInfo.selectedMemberIds.length.toString()
                );
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
