import React, { useRef, useCallback, useEffect } from 'react';
import { Spin } from 'antd';
import Button from '@/components/button/Button';
import Header from '@/components/Header';
import type { Box } from '@/features/wallet/types';
import {
  useInfiniteAccountTransactions,
  useMoneyBoxInfo,
} from '@/features/wallet/hooks/useMainAccount';
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
    <div className="w-full h-full overflow-y-auto pb-20">
      <div className="pt-5 px-6 mb-7">
        <Header onClick={onBack} />
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-hana-bold text-text-primary !mb-0">
            {isMoneyBox ? '박스' : '주계좌'}
          </h1>
          {isMoneyBox && onViewBucket && box.bucketListId && (
            <Button
              intent="silver"
              className="!text-base !font-hana-regular !text-text-secondary"
              onClick={() => box.bucketListId && onViewBucket(box.bucketListId)}
            >
              버킷리스트 보기
            </Button>
          )}
        </div>
      </div>

      {isMoneyBox && (
        <div className="px-6 !mb-3">
          {boxInfoLoading ? (
            <div className="h-5 bg-gray-200 rounded animate-pulse w-64"></div>
          ) : boxInfo?.nextTransferDay && boxInfo?.nextTransferAmount ? (
            <p className="text-text-secondary text-base font-hana-regular !mb-0">
              다음달에는 {boxInfo.nextTransferDay}일에{' '}
              {boxInfo.nextTransferAmount.toLocaleString()}원이 채워져요
            </p>
          ) : (
            <p className="text-text-secondary text-base font-hana-regular !mb-0">
              자동이체가 설정되어 있지 않아요
            </p>
          )}
        </div>
      )}

      <div className="px-6">
        <div className="bg-theme-secondary rounded-2xl p-3 mb-7">
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
          </div>
        </div>
      </div>

      <div className="px-6">
        {transactionsLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="mb-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
                <div className="space-y-3">
                  {[1, 2].map((j) => (
                    <div key={j} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
                          <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
                        </div>
                        <div className="flex items-center justify-end">
                          <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
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
                  <span className="text-base text-text-secondary font-hana-regular">
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
                          <span className="text-xl text-text-secondary font-hana-bold">
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
                                className={`text-xl font-hana-bold ${colorClass}`}
                              >
                                {sign}
                                {tx.amount.toLocaleString()}원
                              </span>
                            );
                          })()}
                        </div>
                        <div className="flex items-center justify-end">
                          <span className="text-base font-hana-regular text-text-secondary !mt-0 mb-2">
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
                <div className="text-center py-4">
                  <p className="text-text-secondary font-hana-regular text-base">
                    모든 거래내역을 불러왔습니다
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
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
