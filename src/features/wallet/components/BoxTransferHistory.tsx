import React from 'react';

import Button from '@/components/button/Button';
import Header from '@/components/Header';

import type { Box } from '../types';

interface BoxTransferHistoryProps {
  box: Box;
  onBack: () => void;
  onViewBucket: () => void;
}

const BoxTransferHistory: React.FC<BoxTransferHistoryProps> = ({
  box,
  onBack,
  onViewBucket,
}) => {
  const transactions = [
    {
      date: '08월 24일',
      type: '자동 이체',
      amount: '+20,000원',
      balance: '260,000원',
    },
    {
      date: '08월 24일',
      type: '원윤서님의 후원',
      amount: '+20,000원',
      balance: '240,000원',
    },
    {
      date: '08월 24일',
      type: '자동 이체',
      amount: '+20,000원',
      balance: '220,000원',
    },
    {
      date: '08월 25일',
      type: '자동 이체',
      amount: '+20,000원',
      balance: '220,000원',
    },
    {
      date: '08월 26일',
      type: '자동 이체',
      amount: '+20,000원',
      balance: '220,000원',
    },
  ];

  // 날짜별로 거래 내역 그룹화
  const groupedTransactions = transactions.reduce(
    (groups, tx) => {
      if (!groups[tx.date]) {
        groups[tx.date] = [];
      }
      groups[tx.date].push(tx);
      return groups;
    },
    {} as Record<string, typeof transactions>
  );

  return (
    <div className="h-full w-full">
      <div className="mb-7 px-6 pt-5">
        <Header onClick={onBack} />
        <div className="flex items-center justify-between">
          <h1 className="font-hana-bold text-text-primary !mb-0 text-3xl">
            박스
          </h1>
          <Button
            intent="silver"
            className="!font-hana-regular !text-text-secondary !text-base"
            onClick={onViewBucket}
          >
            버킷리스트 보기
          </Button>
        </div>
      </div>

      <div className="!mb-3 px-6">
        <p className="text-text-secondary font-hana-regular !mb-0 text-base">
          매월 5일 100,000원씩 채우고 있어요
        </p>
      </div>

      <div className="px-6">
        <div className="bg-theme-secondary mb-7 rounded-2xl p-3">
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
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="space-y-4">
          {Object.entries(groupedTransactions).map(([date, txs]) => (
            <div key={date}>
              <div className="mb-3">
                <span className="text-text-secondary font-hana-regular text-base">
                  {date}
                </span>
              </div>

              <div className="space-y-3">
                {txs.map((tx, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary font-hana-bold text-xl">
                          {tx.type}
                        </span>
                        <span className="font-hana-bold text-text-secondary text-xl">
                          {tx.amount}
                        </span>
                      </div>
                      <div className="flex items-center justify-end">
                        <span className="font-hana-regular text-theme-primary !mt-0 mb-2 text-base">
                          {tx.balance}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoxTransferHistory;
