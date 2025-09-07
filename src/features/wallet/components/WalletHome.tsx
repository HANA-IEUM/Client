import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import boxPng from '@/assets/bucket-detail/box.png';
import HanaIcon from '@/assets/common/HanaIcon';
import Button from '@/components/button/Button';
import EmptyStateMessage from '@/components/common/EmptyStateMessage';
import FillBoxAmount from '@/features/wallet/components/FillBoxAmount';
import FillBoxPassword from '@/features/wallet/components/FillBoxPassword';
import {
  useMainAccount,
  useMoneyBoxes,
  useFillMoneyBox,
} from '@/features/wallet/hooks/useMainAccount';
import { showError, showSuccess } from '@/lib/toast';
import { formatAccountNumber } from '@/utils/formatAccountNumber';

import type { Box } from '../types';

interface WalletHomeProps {
  onFillBox: (box: Box) => void;
  onViewHistory: (box: Box) => void;
  onEditBox: (box: Box) => void;
  onViewBucket: (bucketId: number) => void;
  onViewMainAccount: () => void;
}

const WalletHome: React.FC<WalletHomeProps> = ({
  onFillBox,
  onViewHistory,
  onEditBox,
  onViewBucket,
  onViewMainAccount,
}) => {
  const [step, setStep] = useState<'amount' | 'password' | null>(null);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [fillAmount, setFillAmount] = useState('');

  const { data: mainAccount, isLoading: accountLoading } = useMainAccount();
  const {
    data: moneyBoxes,
    isLoading: boxesLoading,
    refetch: refetchMoneyBoxes,
  } = useMoneyBoxes();
  const { mutate: fillMoneyBox } = useFillMoneyBox();

  // 페이지 포커스 시 박스 목록 새로고침
  useEffect(() => {
    const handleFocus = () => {
      refetchMoneyBoxes();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchMoneyBoxes]);

  // MoneyBox를 Box 형식으로 변환
  const boxes =
    moneyBoxes?.map((moneyBox) => ({
      id: moneyBox.accountId,
      name: moneyBox.boxName,
      balance: moneyBox.balance.toLocaleString(),
      // MoneyBox의 원본 데이터는 별도 속성으로 저장
      originalBalance: moneyBox.balance,
      accountId: moneyBox.accountId,
      accountNumber: moneyBox.accountNumber,
      accountName: moneyBox.accountName,
      bankName: moneyBox.bankName,
      bucketListId: moneyBox.bucketListId,
      bucketListTitle: moneyBox.bucketListTitle,
      targetAmount: moneyBox.targetAmount,
      createdAt: moneyBox.createdAt,
      updatedAt: moneyBox.updatedAt,
    })) || [];

  const handleFillBox = (box: Box) => {
    setSelectedBox(box);
    setStep('amount');
  };

  const handleBack = () => {
    if (step === 'password') {
      setStep('amount');
      setFillAmount('');
    } else {
      setStep(null);
      setSelectedBox(null);
      setFillAmount('');
    }
  };

  const handleAmountConfirm = (amount: string) => {
    setFillAmount(amount);
    setStep('password');
  };

  const handlePasswordConfirm = (password: string) => {
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
          setStep(null);
          setSelectedBox(null);
          setFillAmount('');
          refetchMoneyBoxes();
        },
        onError: () => {
          showError('충전에 실패했어요. 다시 시도해 주세요.');
        },
      }
    );
  };

  const modal =
    selectedBox && step ? (
      <>
        <div className="fixed inset-0 z-40 bg-black/50" onClick={handleBack} />

        <div className="fixed right-0 bottom-0 left-0 z-50 flex flex-col rounded-t-3xl bg-white p-6">
          {step === 'amount' && (
            <FillBoxAmount
              box={selectedBox}
              onBack={handleBack}
              onConfirm={handleAmountConfirm}
            />
          )}

          {step === 'password' && (
            <FillBoxPassword
              box={selectedBox}
              amount={fillAmount}
              onBack={handleBack}
              onConfirm={handlePasswordConfirm}
            />
          )}
        </div>
      </>
    ) : null;

  return (
    <>
      <div className="h-full w-full pt-12">
        <div className="px-6">
          <h1 className="font-hana-bold text-text-primary !mb-8 text-4xl">
            지갑
          </h1>
        </div>

        {accountLoading ? (
          <div className="mb-14 w-full px-6">
            <div className="bg-btn-default-bg rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-5">
                <div className="bg-theme-secondary flex h-14 w-14 items-center justify-center rounded-full">
                  <HanaIcon />
                </div>
                <div className="flex-1">
                  <div className="mb-2 h-6 animate-pulse rounded bg-gray-200"></div>
                  <div className="mb-2 h-5 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-8 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        ) : mainAccount ? (
          <div className="mb-14 w-full px-6">
            <div
              className="bg-btn-default-bg cursor-pointer rounded-2xl p-4 shadow-sm"
              onClick={onViewMainAccount}
            >
              <div className="flex items-center gap-5">
                <div className="bg-theme-secondary flex h-14 w-14 items-center justify-center rounded-full">
                  <HanaIcon />
                </div>
                <div className="flex-1">
                  <h2 className="font-hana-bold text-text-secondary !mb-0 text-lg">
                    {mainAccount.accountName}
                  </h2>
                  <p className="font-hana-regular text-text-secondary !mb-0 text-base">
                    {formatAccountNumber(mainAccount.accountNumber)}
                  </p>
                  <div className="text-left">
                    <p className="font-hana-bold text-text-primary !mb-0 text-2xl">
                      {mainAccount.balance.toLocaleString()} 원
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="px-6">
          <h1 className="font-hana-bold text-text-primary !mb-8 text-3xl">
            박스
          </h1>

          {boxesLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="!mb-8 space-y-3">
                  <div className="bg-theme-secondary !mb-[5px] rounded-2xl p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="ml-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                          <div className="h-7 w-7 animate-pulse rounded bg-gray-200"></div>
                        </div>
                        <div className="flex-1">
                          <div className="mb-2 h-6 animate-pulse rounded bg-gray-200"></div>
                          <div className="h-6 animate-pulse rounded bg-gray-200"></div>
                        </div>
                      </div>
                      <div className="mr-2">
                        <div className="h-12 w-20 animate-pulse rounded-xl bg-gray-200"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[5px]">
                    {[1, 2, 3].map((j) => (
                      <div
                        key={j}
                        className="h-12 flex-1 animate-pulse rounded-xl bg-gray-200"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : boxes.length > 0 ? (
            <div className="space-y-4">
              {boxes.map((box) => (
                <div key={box.id} className="!mb-8 space-y-3">
                  <div className="bg-theme-secondary !mb-[5px] rounded-2xl p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="ml-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                          <img
                            src={boxPng}
                            alt="박스 아이콘"
                            className="h-7 w-7"
                          />
                        </div>
                        <div>
                          <h4 className="font-hana-regular text-text-secondary !mb-0 text-lg">
                            {box.name}
                          </h4>
                          <p className="font-hana-bold text-text-secondary !mb-0 text-xl">
                            {box.balance} 원
                          </p>
                        </div>
                      </div>
                      <div className="mr-2">
                        <Button
                          intent="pink"
                          size="lg"
                          font="bold"
                          radius="xl"
                          label="채우기"
                          onClick={() => handleFillBox(box)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-[5px]">
                    <Button
                      intent="silver"
                      size="lg"
                      font="regular"
                      className="flex-1 !text-base"
                      onClick={() => onViewHistory(box)}
                    >
                      상세 보기
                    </Button>
                    <Button
                      intent="silver"
                      size="lg"
                      font="regular"
                      className="flex-1 !text-base"
                      onClick={() => onViewBucket(box.bucketListId)}
                    >
                      버킷 보기
                    </Button>
                    <Button
                      intent="silver"
                      size="lg"
                      font="regular"
                      className="flex-1 !text-base"
                      onClick={() => onEditBox(box)}
                    >
                      수정하기
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <EmptyStateMessage title="등록된 박스가 없습니다" />
            </div>
          )}
        </div>
      </div>

      {/* Portal로 body에 렌더링 */}
      {modal && createPortal(modal, document.body)}
    </>
  );
};

export default WalletHome;
