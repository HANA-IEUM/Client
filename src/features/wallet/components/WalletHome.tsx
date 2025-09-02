import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import HanaIcon from '@/assets/common/HanaIcon';
import Button from '@/components/button/Button';
import FillBoxAmount from '@/features/wallet/components/FillBoxAmount';
import FillBoxPassword from '@/features/wallet/components/FillBoxPassword';

import type { Box } from '../types';

interface WalletHomeProps {
  onFillBox: (box: Box) => void;
  onViewHistory: (box: Box) => void;
  onEditBox: (box: Box) => void;
  onViewBucket: () => void;
}

const WalletHome: React.FC<WalletHomeProps> = ({
  onFillBox,
  onViewHistory,
  onEditBox,
  onViewBucket,
}) => {
  const [step, setStep] = useState<'amount' | 'password' | null>(null);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [fillAmount, setFillAmount] = useState('');

  // 데모 데이터
  const mainAccount = {
    name: '달달 하나 통장',
    number: '352-1022-1234-12',
    balance: '7,500,000',
  };

  const boxes = [
    { id: 1, name: '유럽 꿈 박스', balance: '260,000' },
    { id: 2, name: '유럽 꿈 박스', balance: '260,000' },
  ];

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

  const handlePasswordConfirm = () => {
    setStep(null); // 바텀시트 완전히 닫기
    setSelectedBox(null); // 선택된 박스 초기화
    setFillAmount(''); // 입력된 금액 초기화
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

        <div className="mb-14 w-full px-6">
          <div className="bg-btn-default-bg rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="bg-theme-secondary flex h-14 w-14 items-center justify-center rounded-full">
                <HanaIcon />
              </div>
              <div className="flex-1">
                <h2 className="font-hana-bold text-text-secondary !mb-0 text-lg">
                  {mainAccount.name}
                </h2>
                <p className="font-hana-regular text-text-secondary !mb-0 text-base">
                  {mainAccount.number}
                </p>
                <div className="text-left">
                  <p className="font-hana-bold text-text-primary !mb-0 text-2xl">
                    {mainAccount.balance} 원
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6">
          <h1 className="font-hana-bold text-text-primary !mb-8 text-3xl">
            박스
          </h1>
          <div className="space-y-4">
            {boxes.map((box) => (
              <div key={box.id} className="!mb-8 space-y-3">
                <div className="bg-theme-secondary !mb-[5px] rounded-2xl p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="ml-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                        <img
                          src="/images/box.png"
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
                    onClick={() => onViewBucket()}
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
        </div>
      </div>

      {/* Portal로 body에 렌더링 */}
      {modal && createPortal(modal, document.body)}
    </>
  );
};

export default WalletHome;
