import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FilterTabs, type Tab } from '@/features/home/components/FilterTabs';
import BucketListItem from '@/components/BucketListItem';
import EmptyStateMessage from '@/components/common/EmptyStateMessage';
import { useGroupInfo } from '@/features/group-join/hooks/useGroupInfo';
import { useMemberBucketLists } from '../hooks/useMemberBucketLists';
import Header from '@/components/Header';
import starBoyIcon from '@/assets/common/header/starBoy.png';

const FamilyMemberBucketList = () => {
  const [selected, setSelected] = useState('ALL');
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();

  const { data: groupInfo } = useGroupInfo();
  const member = groupInfo?.members?.find(
    (m) => m.memberId.toString() === memberId
  );

  const tabs: Tab[] = [
    { id: 'ALL', label: '전체' },
    { id: 'IN_PROGRESS', label: '진행중' },
    { id: 'COMPLETED', label: '달성' },
    { id: 'PARTICIPATING', label: '참여' },
  ];

  const { data: bucketLists, isLoading } = useMemberBucketLists(
    memberId || '',
    selected
  );

  const handleBack = () => {
    navigate('/family');
  };

  if (!member) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-lg font-hana-regular text-text-secondary">
          구성원을 찾을 수 없습니다
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full max-w-md mx-auto bg-theme-secondary flex flex-col">
      <header className="relative px-6 pt-8 text-white flex-shrink-0 mb-[-50px] z-0">
        {/* 뒤로가기 버튼 */}
        <div className="mb-4">
          <Header onClick={handleBack} />
        </div>

        <div className="flex items-start justify-between">
          <div className="w-1/2 mt-2">
            <p className="text-3xl text-text-secondary font-hana-regular !mb-0">
              <span className="font-hana-bold">{member.name}</span>님의 <br />
              <span className="font-hana-bold">버킷리스트</span>
            </p>
          </div>
          <div className="w-36 h-60 -mt-4 flex items-center justify-center">
            <img
              src={starBoyIcon}
              alt="Star Boy"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="relative bg-white z-20 rounded-tl-3xl rounded-tr-3xl flex-1 shadow-[0px_-4px_2px_0px_rgba(0,0,0,0.09)] overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-lg font-hana-regular text-text-secondary">
              버킷리스트를 불러오는 중...
            </div>
          </div>
        ) : bucketLists && bucketLists.length > 0 ? (
          <div className="h-full flex flex-col">
            <div className="pt-6 flex-shrink-0">
              <FilterTabs
                tabs={tabs}
                selected={selected}
                setSelected={setSelected}
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="px-4 mt-6 space-y-3 pb-6">
                {bucketLists.map((item) => (
                  <BucketListItem
                    key={item.id}
                    text={item.title}
                    date={item.targetDate}
                    category={
                      item.type === 'FAMILY' ? 'FAMILY_SUPPORT' : item.type
                    }
                    completed={item.status === 'COMPLETED'}
                    onClick={() => navigate(`/bucket/${item.id}`)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="pt-6 flex-shrink-0">
              <FilterTabs
                tabs={tabs}
                selected={selected}
                setSelected={setSelected}
              />
            </div>

            <div className="flex-1">
              <EmptyStateMessage
                title={`${member.name}님이 작성한 버킷리스트가 없어요`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyMemberBucketList;
