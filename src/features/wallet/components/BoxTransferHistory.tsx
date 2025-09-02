import { Spin } from 'antd';
import React, { useRef, useCallback, useEffect } from 'react';

import Button from '@/components/button/Button';
import Header from '@/components/Header';
import {
  useInfiniteAccountTransactions,
  useMoneyBoxInfo,
} from '@/features/wallet/hooks/useMainAccount';
import type { Box } from '@/features/wallet/types';
import { formatKoreanDateTime } from '@/utils/dateFormat';

interface BoxTransferHistoryProps {
  box: Box;
  onBack: () => void;
  onViewBucket?: (bucketId: number) => void;
  isMoneyBox?: boolean; // 주계좌 화면에서는 false
}

const BoxTransferHistory: React.FC<BoxTransferHistoryProps> = ({
  box,
  onBack,
  onViewBucket,
  isMoneyBox = true,
}) => {
  const pageSize = 7;

  const {
    data: transactionPages,
    isLoading: transactionsLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteAccountTransactions(box.accountId || 0, pageSize);

  // 머니박스가 아닌 경우(주계좌)에는 박스 정보 조회를 비활성화
  const infoBoxId = isMoneyBox ? box.accountId || 0 : 0;
  const { data: boxInfo, isLoading: boxInfoLoading } =
    useMoneyBoxInfo(infoBoxId);

  const allTransactions =
    transactionPages?.pages.flatMap((page) => page.content) || [];

  const groupedTransactions = allTransactions.reduce(
    (groups, tx) => {
      const dateKey = formatKoreanDateTime(tx.date, false); // 날짜만 표시
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(tx);
      return groups;
    },
    {} as Record<string, typeof allTransactions>
  );

  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: '100px', // 100px 전에 트리거
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <div className="h-full w-full overflow-y-auto pb-20">
      <div className="mb-7 px-6 pt-5">
        <Header onClick={onBack} />
        <div className="flex items-center justify-between">
          <h1 className="font-hana-bold text-text-primary !mb-0 text-3xl">
            {isMoneyBox ? '박스' : '주계좌'}
          </h1>
          {isMoneyBox && onViewBucket && box.bucketListId && (
            <Button
              intent="silver"
              className="!font-hana-regular !text-text-secondary !text-base"
              onClick={() => box.bucketListId && onViewBucket(box.bucketListId)}
            >
              버킷리스트 보기
            </Button>
          )}
        </div>
      </div>

      {isMoneyBox && (
        <div className="!mb-3 px-6">
          {boxInfoLoading ? (
            <div className="h-5 w-64 animate-pulse rounded bg-gray-200"></div>
          ) : boxInfo?.nextTransferDay && boxInfo?.nextTransferAmount ? (
            <p className="text-text-secondary font-hana-regular !mb-0 text-base">
              다음달에는 {boxInfo.nextTransferDay}일에{' '}
              {boxInfo.nextTransferAmount.toLocaleString()}원이 채워져요
            </p>
          ) : (
            <p className="text-text-secondary font-hana-regular !mb-0 text-base">
              자동이체가 설정되어 있지 않아요
            </p>
          )}
        </div>
      )}

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
        {transactionsLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="mb-3">
                  <div className="h-5 w-20 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="space-y-3">
                  {[1, 2].map((j) => (
                    <div key={j} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
                          <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
                        </div>
                        <div className="flex items-center justify-end">
                          <div className="h-5 w-20 animate-pulse rounded bg-gray-200"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : Object.keys(groupedTransactions).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(groupedTransactions).map(([date, txs]) => (
              <div key={date}>
                <div className="mb-3">
                  <span className="text-text-secondary font-hana-regular text-base">
                    {date}
                  </span>
                </div>

                <div className="space-y-3">
                  {txs.map((tx) => (
                    <div
                      key={tx.transactionId}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-text-secondary font-hana-bold text-xl">
                            {tx.description || tx.transactionType}
                          </span>
                          {(() => {
                            const isDeposit = tx.transactionType === 'DEPOSIT';
                            const sign = isDeposit ? '+' : '-';
                            const colorClass = isDeposit
                              ? 'text-blue-400'
                              : 'text-red-400';
                            return (
                              <span
                                className={`font-hana-bold text-xl ${colorClass}`}
                              >
                                {sign}
                                {tx.amount.toLocaleString()}원
                              </span>
                            );
                          })()}
                        </div>
                        <div className="flex items-center justify-end">
                          <span className="font-hana-regular text-text-secondary !mt-0 mb-2 text-base">
                            {tx.balanceAfter.toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* 무한스크롤을 위한 Intersection Observer */}
            <div ref={observerRef} className="py-4">
              {isFetchingNextPage ? (
                <div className="text-center">
                  <Spin size="small" />
                </div>
              ) : hasNextPage ? (
                <div className="h-3" /> // 관찰용 빈 공간
              ) : (
                <div className="py-4 text-center">
                  <p className="text-text-secondary font-hana-regular text-base">
                    모든 거래내역을 불러왔습니다
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-text-secondary font-hana-regular text-lg">
              거래내역이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxTransferHistory;
