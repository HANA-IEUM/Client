import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/components/button/Button';
import FillBoxAmount from '@/features/wallet/components/FillBoxAmount';
import FillBoxPassword from '@/features/wallet/components/FillBoxPassword';
import type { Box } from '../types';
import HanaIcon from '@/assets/common/HanaIcon';
import {
  useMainAccount,
  useMoneyBoxes,
} from '@/features/wallet/hooks/useMainAccount';

interface WalletHomeProps {
  onFillBox: (box: Box) => void;
  onViewHistory: (box: Box) => void;
  onEditBox: (box: Box) => void;
  onViewBucket: (bucketId: number) => void;
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

  const { data: mainAccount, isLoading: accountLoading } = useMainAccount();
  const { data: moneyBoxes, isLoading: boxesLoading } = useMoneyBoxes();

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

  const handlePasswordConfirm = () => {
    setStep(null); // 바텀시트 완전히 닫기
    setSelectedBox(null); // 선택된 박스 초기화
    setFillAmount(''); // 입력된 금액 초기화
  };

  const modal =
    selectedBox && step ? (
      <>
        <div className="fixed inset-0 z-40 bg-black/50" onClick={handleBack} />

        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 flex flex-col">
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
      <div className="w-full h-full pt-12">
        <div className="px-6">
          <h1 className="text-4xl font-hana-bold text-text-primary !mb-8">
            지갑
          </h1>
        </div>

        {accountLoading ? (
          <div className="w-full px-6 mb-14">
            <div className="bg-btn-default-bg rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-theme-secondary rounded-full flex items-center justify-center">
                  <HanaIcon />
                </div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ) : mainAccount ? (
          <div className="w-full px-6 mb-14">
            <div className="bg-btn-default-bg rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-theme-secondary rounded-full flex items-center justify-center">
                  <HanaIcon />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-hana-bold text-text-secondary !mb-0">
                    {mainAccount.accountName}
                  </h2>
                  <p className="text-base font-hana-regular text-text-secondary !mb-0">
                    {mainAccount.accountNumber}
                  </p>
                  <div className="text-left">
                    <p className="text-2xl font-hana-bold text-text-primary !mb-0">
                      {mainAccount.balance.toLocaleString()} 원
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="px-6">
          <h1 className="text-3xl font-hana-bold text-text-primary !mb-8">
            박스
          </h1>

          {boxesLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-3 !mb-8">
                  <div className="bg-theme-secondary rounded-2xl p-3 !mb-[5px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="ml-2 w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                          <div className="w-7 h-7 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex-1">
                          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="mr-2">
                        <div className="w-20 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[5px]">
                    {[1, 2, 3].map((j) => (
                      <div
                        key={j}
                        className="flex-1 h-12 bg-gray-200 rounded-xl animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : boxes.length > 0 ? (
            <div className="space-y-4">
              {boxes.map((box) => (
                <div key={box.id} className="space-y-3 !mb-8">
                  <div className="bg-theme-secondary rounded-2xl p-3 !mb-[5px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="ml-2 w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                          <img
                            src="/images/box.png"
                            alt="박스 아이콘"
                            className="w-7 h-7"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-hana-regular text-text-secondary !mb-0">
                            {box.name}
                          </h4>
                          <p className="text-xl font-hana-bold text-text-secondary !mb-0">
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
                      className="!text-base flex-1"
                      onClick={() => onViewHistory(box)}
                    >
                      상세 보기
                    </Button>
                    <Button
                      intent="silver"
                      size="lg"
                      font="regular"
                      className="!text-base flex-1"
                      onClick={() => onViewBucket(box.bucketListId)}
                    >
                      버킷 보기
                    </Button>
                    <Button
                      intent="silver"
                      size="lg"
                      font="regular"
                      className="!text-base flex-1"
                      onClick={() => onEditBox(box)}
                    >
                      수정하기
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-text-secondary text-lg">
                등록된 박스가 없습니다.
              </p>
              <p className="text-text-secondary text-base">
                새로운 박스를 만들어보세요!
              </p>
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
