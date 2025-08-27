import React from 'react';
import Button from '@/components/button/Button';
import type { Box, MainAccount } from '../types';
import HanaIcon from '@/assets/common/HanaIcon';

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
  // 데모 데이터
  const mainAccount = {
    name: '달달 하나 통장',
    number: '352-1022-1234-12',
    balance: '7,500,000',
  };

  const boxes = [
    {
      id: 1,
      name: '유럽 꿈 박스',
      balance: '260,000',
    },
    {
      id: 2,
      name: '유럽 꿈 박스',
      balance: '260,000',
    },
  ];

  return (
    <div className="w-full h-full pt-12 pb-20">
      <div className="px-6">
        <h1 className="text-4xl font-hana-bold text-text-primary !mb-8">
          지갑
        </h1>
      </div>

      {/* Main Account */}
      <div className="w-full px-6 mb-14">
        <div className="bg-btn-default-bg rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-theme-secondary rounded-full flex items-center justify-center">
              <HanaIcon />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-hana-bold text-text-secondary !mb-0">
                {mainAccount.name}
              </h2>
              <p className="text-base font-hana-regular text-text-secondary !mb-0">
                {mainAccount.number}
              </p>
              <div className="text-left">
                <p className="text-2xl font-hana-bold text-text-primary !mb-0">
                  {mainAccount.balance} 원
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <h1 className="text-3xl font-hana-bold text-text-primary !mb-8">
          박스
        </h1>
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
                      onClick={() => onFillBox(box)}
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
                  onClick={() => onViewBucket}
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
      </div>
    </div>
  );
};

export default WalletHome;
