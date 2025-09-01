import { useState } from 'react';
import { HomeHeader } from '@/features/home/components/HomeHeader.tsx';
import {
  FilterTabs,
  type Tab,
} from '@/features/home/components/FilterTabs.tsx';
import { useBucketLists } from '@/features/home/hooks/useBucketLists.ts';
import BucketListItem from '@/components/BucketListItem.tsx';
import { EmptyBucketList } from '@/features/home/components/EmptyBucketList.tsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useToken.ts';

const HomePage = () => {
  const [selected, setSelected] = useState('all');
  const tabs: Tab[] = [
    { id: 'all', label: '전체' },
    { id: 'in_progress', label: '진행중' },
    { id: 'completed', label: '종료' },
    { id: 'participating', label: '참여' },
  ];
  const navigate = useNavigate();
  const { data: bucketLists, isLoading } = useBucketLists(selected);
  const { user } = useAuth();

  return (
    <div className="w-full h-full max-w-md mx-auto bg-white">
      <HomeHeader name={user?.name || '유저'} />
      <div className="relative bg-white z-20 rounded-tl-3xl rounded-tr-3xl w-full shadow-[0px_-4-px_2px_0px_rgba(0,0,0,0.09)] min-h-[60vh]">
        {isLoading ? (
          <div className="flex justify-center items-center h-40"></div>
        ) : bucketLists && bucketLists.length > 0 ? (
          <>
            <div className="pt-6">
              <FilterTabs
                tabs={tabs}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <div className="px-4 mt-6 space-y-3 pb-8">
              {bucketLists.map((item) => (
                <BucketListItem
                  key={item.id}
                  text={item.title}
                  date={item.targetDate}
                  category={item.type}
                  completed={item.status === 'COMPLETED'}
                  onClick={() => navigate(`/bucket/${item.id}`)}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyBucketList /> // 버킷리스트가 비어있을 때 UI
        )}
      </div>
    </div>
  );
};

export default HomePage;
