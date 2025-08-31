import { useState } from 'react';
import { HomeHeader } from '@/features/home/components/HomeHeader.tsx';
import {
  FilterTabs,
  type Tab,
} from '@/features/home/components/FilterTabs.tsx';
import { useBucketLists } from '@/features/home/hooks/useBucketLists.ts';
import BucketListItem from '@/components/BucketListItem.tsx';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [selected, setSelected] = useState('ALL');
  const tabs: Tab[] = [
    { id: 'ALL', label: '전체' },
    { id: 'IN_PROGRESS', label: '진행중' },
    { id: 'COMPLETED', label: '종료' },
    { id: 'PARTICIPATING', label: '참여' },
  ];
  const navigate = useNavigate();
  const { data: bucketLists, isLoading } = useBucketLists(selected);
  const name = 'USER';

  return (
    <div className="w-full h-full max-w-md mx-auto bg-white">
      <HomeHeader name={name} />
      <div className="relative pt-6 bg-white z-20 rounded-tl-3xl rounded-tr-3xl w-full shadow-[0px_-4px_2px_0px_rgba(0,0,0,0.09)]">
        <FilterTabs tabs={tabs} selected={selected} setSelected={setSelected} />
        <div className="px-4 mt-6 space-y-3 pb-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-40"></div>
          ) : (
            bucketLists?.map((item) => (
              <BucketListItem
                key={item.id}
                text={item.title}
                date={item.targetDate}
                category={item.type}
                completed={item.status === 'COMPLETED'}
                onClick={() => navigate(`/bucket/${item.id}`)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
