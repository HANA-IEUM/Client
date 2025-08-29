import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Box } from '@/features/wallet/types';

import WalletHome from '../features/wallet/components/WalletHome';
import FillBoxAmount from '../features/wallet/components/FillBoxAmount';
import FillBoxPassword from '../features/wallet/components/FillBoxPassword';
import BoxTransferHistory from '../features/wallet/components/BoxTransferHistory';
import BoxEdit from '../features/wallet/components/BoxEdit';

const WalletPage = () => {
  const [step, setStep] = useState(0);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [fillAmount, setFillAmount] = useState<string>('');

  const handleFillBox = useCallback((box: Box) => {
    setSelectedBox(box);
    setStep(1);
  }, []);

  const handleAmountConfirm = useCallback((amount: string) => {
    setFillAmount(amount);
    setStep(2);
  }, []);

  const handlePasswordConfirm = useCallback(() => {
    // TODO: 실제 이체 API 호출
    setStep(0);
  }, []);

  const handleViewHistory = useCallback((box: Box) => {
    setSelectedBox(box);
    setStep(3);
  }, []);

  const handleEditBox = useCallback((box: Box) => {
    setSelectedBox(box);
    setStep(4);
  }, []);

  const handleViewBucket = useCallback(() => {
    // TODO: 버킷리스트 페이지로 이동
    console.log('버킷리스트 보기');
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={step}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="absolute top-0 left-0 right-0 w-full transform-gpu will-change-transform"
        >
          {step === 0 && (
            <WalletHome
              onFillBox={handleFillBox}
              onViewHistory={handleViewHistory}
              onEditBox={handleEditBox}
              onViewBucket={handleViewBucket}
            />
          )}

          {step === 1 && selectedBox && (
            <FillBoxAmount
              box={selectedBox}
              onBack={() => setStep(0)}
              onConfirm={handleAmountConfirm}
            />
          )}

          {step === 2 && selectedBox && (
            <FillBoxPassword
              box={selectedBox}
              amount={fillAmount}
              onBack={() => setStep(1)}
              onConfirm={handlePasswordConfirm}
            />
          )}

          {step === 3 && selectedBox && (
            <BoxTransferHistory
              box={selectedBox}
              onBack={() => setStep(0)}
              onViewBucket={handleViewBucket}
            />
          )}

          {step === 4 && selectedBox && (
            <BoxEdit
              box={selectedBox}
              onBack={() => setStep(0)}
              onSave={() => setStep(0)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WalletPage;
