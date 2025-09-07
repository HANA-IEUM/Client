import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BucketListItem from '@/components/BucketListItem.tsx';
import EmptyStateMessage from '@/components/common/EmptyStateMessage.tsx';
import { EmptyBucketList } from '@/features/home/components/EmptyBucketList';
import {
  FilterTabs,
  type Tab,
} from '@/features/home/components/FilterTabs.tsx';
import { HomeHeader } from '@/features/home/components/HomeHeader.tsx';
import { useBucketLists } from '@/features/home/hooks/useBucketLists.ts';
import { useAuth } from '@/hooks/useToken.ts';
import type { BucketListItem as BucketListItemType } from '@/types/bucket';
import { formatKoreanDateTime } from '@/utils/dateFormat.ts';

const HomePage = () => {
  const [selected, setSelected] = useState('in_progress');
  const tabs: Tab[] = [
    { id: 'in_progress', label: '진행중' },
    { id: 'completed', label: '종료' },
    { id: 'participated', label: '참여' },
  ];
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: bucketLists, isLoading: isListLoading } =
    useBucketLists(selected);

  const { data: progressBucket, isLoading: isExistenceLoading } =
    useBucketLists('in_progress');

  const hasAnyBucket = progressBucket && progressBucket.length > 0;

  if (isExistenceLoading) {
    return (
      <div className="mx-auto h-full w-full max-w-md bg-white">
        <HomeHeader name={user?.name || '유저'} />
        <div className="relative z-20 min-h-[60vh] w-full rounded-tl-3xl rounded-tr-3xl bg-white shadow-[0px_-4-px_2px_0px_rgba(0,0,0,0.09)]">
          <div className="flex h-40 items-center justify-center"></div>
        </div>
      </div>
    );
  }
  const emptyMessage: Record<string, string> = {
    in_progress: '진행중인 버킷리스트가 없어요',
    completed: '종료된 버킷리스트가 없어요',
    participated: '참여중인 버킷리스트가 없어요',
  };

  const handleBucketClick = (item: BucketListItemType) => {
    if (selected === 'participated') {
      navigate(`/family/member/${item.memberId}/bucket/${item.id}`, {
        state: { from: 'home' },
      });
    } else {
      navigate(`/bucket/${item.id}`);
    }
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col bg-white">
      <HomeHeader name={user?.name || '유저'} />
      <div className="scrollbar-hide relative z-20 h-full w-full flex-1 overflow-y-auto rounded-tl-3xl rounded-tr-3xl bg-white shadow-[0px_-4-px_2px_0px_rgba(0,0,0,0.09)]">
        {hasAnyBucket ? (
          <>
            <div className="sticky top-0 z-10 bg-white pt-6">
              <FilterTabs
                tabs={tabs}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <div className="mt-6 space-y-3 overflow-hidden px-4 pb-8">
              {isListLoading ? (
                <div className="flex h-40 items-center justify-center"></div>
              ) : bucketLists && bucketLists.length > 0 ? (
                bucketLists.map((item) => (
                  <BucketListItem
                    key={item.id}
                    text={item.title}
                    date={formatKoreanDateTime(item.targetDate, false)}
                    category={item.type}
                    completed={item.status === 'COMPLETED'}
                    onClick={() => handleBucketClick(item)}
                  />
                ))
              ) : (
                <EmptyStateMessage title={emptyMessage[selected]} />
              )}
            </div>
          </>
        ) : (
          <EmptyBucketList />
        )}
      </div>
    </div>
  );
};

export default HomePage;
