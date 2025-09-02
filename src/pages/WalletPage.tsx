import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BoxEdit from '@/features/wallet/components/BoxEdit';
import BoxTransferHistory from '@/features/wallet/components/BoxTransferHistory';
import FillBoxAmount from '@/features/wallet/components/FillBoxAmount';
import FillBoxPassword from '@/features/wallet/components/FillBoxPassword';
import WalletHome from '@/features/wallet/components/WalletHome';
import {
  useMainAccount,
  useFillMoneyBox,
} from '@/features/wallet/hooks/useMainAccount';
import type { Box } from '@/features/wallet/types';
import { showError, showSuccess } from '@/lib/toast';

const WalletPage = () => {
  const [step, setStep] = useState(0);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [fillAmount, setFillAmount] = useState<string>('');
  const navigate = useNavigate();

  const { data: mainAccount } = useMainAccount();
  const { mutate: fillMoneyBox } = useFillMoneyBox();

  const handleFillBox = useCallback((box: Box) => {
    setSelectedBox(box);
    setStep(1);
  }, []);

  const handleAmountConfirm = useCallback((amount: string) => {
    setFillAmount(amount);
    setStep(2);
  }, []);

  const handlePasswordConfirm = useCallback(
    (password: string) => {
      if (!selectedBox) return;
      const amountNumber = Number(fillAmount.replace(/,/g, ''));
      if (!amountNumber || amountNumber <= 0) {
        showError('금액을 확인해 주세요.');
        return;
      }

      fillMoneyBox(
        {
          amount: amountNumber,
          accountPassword: password,
          moneyBoxAccountId: selectedBox.accountId ?? selectedBox.id,
        },
        {
          onSuccess: () => {
            showSuccess('박스에 금액을 채웠어요!');
            setStep(0);
            setSelectedBox(null);
            setFillAmount('');
          },
          onError: () => {
            showError('충전에 실패했어요. 다시 시도해 주세요.');
          },
        }
      );
    },
    [fillAmount, selectedBox, fillMoneyBox]
  );

  const handleViewHistory = useCallback((box: Box) => {
    setSelectedBox(box);
    setStep(3);
  }, []);

  const handleEditBox = useCallback((box: Box) => {
    setSelectedBox(box);
    setStep(4);
  }, []);

  const handleViewMainAccount = useCallback(() => {
    setSelectedBox(
      mainAccount
        ? ({
            id: mainAccount.accountId,
            name: mainAccount.accountName,
            balance: mainAccount.balance.toLocaleString(),
            accountId: mainAccount.accountId,
          } as Box)
        : null
    );
    setStep(5);
  }, [mainAccount]);

  const handleViewBucket = useCallback(
    (bucketId: number) => {
      navigate(`/bucket/${bucketId}`);
    },
    [navigate]
  );

  return (
    <div className="relative h-full w-full">
      {step === 0 && (
        <WalletHome
          onFillBox={handleFillBox}
          onViewHistory={handleViewHistory}
          onEditBox={handleEditBox}
          onViewBucket={handleViewBucket}
          onViewMainAccount={handleViewMainAccount}
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

      {step === 5 && selectedBox && (
        <BoxTransferHistory
          box={selectedBox}
          onBack={() => setStep(0)}
          isMoneyBox={false}
        />
      )}
    </div>
  );
};

export default WalletPage;
