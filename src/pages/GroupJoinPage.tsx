import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import FamilyGroupEmptyStateCard from '@/features/group-join/components/FamilyGroupEmptyStateCard';
import GroupNameForm from '@/features/group-join/components/GroupNameForm';
import InviteCodeForm from '@/features/group-join/components/InviteCodeForm';
import InviteCodeSharePanel from '@/features/group-join/components/InviteCodeSharePanel';

const GroupJoinPage = () => {
  const [step, setStep] = useState(0);
  const [inviteCode, setInviteCode] = useState<string>('');
  const [creating, setCreating] = useState(false);

  const handleCreateGroup = useCallback(async (groupName: string) => {
    try {
      setCreating(true);
      // TODO: 실제 API 호출
      // const { code } = await api.createGroup({ name: groupName });
      // setInviteCode(code);
      setInviteCode(groupName); // 데모
      setStep(3);
    } finally {
      setCreating(false);
    }
  }, []);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden px-6">
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
            <FamilyGroupEmptyStateCard
              onInviteClick={() => setStep(1)}
              onCreateClick={() => setStep(2)}
            />
          )}

          {step === 1 && <InviteCodeForm onBack={() => setStep(0)} />}

          {step === 2 && (
            <GroupNameForm
              onBack={() => setStep(0)}
              onSubmit={handleCreateGroup}
              loading={creating}
            />
          )}

          {step === 3 && (
            <InviteCodeSharePanel
              code={inviteCode}
              onBack={() => setStep(2)}
              onConfirm={() => setStep(0)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GroupJoinPage;
