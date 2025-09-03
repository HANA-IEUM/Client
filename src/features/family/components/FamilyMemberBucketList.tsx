import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import starBoyIcon from '@/assets/common/header/starBoy.png';
import BucketListItem from '@/components/BucketListItem';
import EmptyStateMessage from '@/components/common/EmptyStateMessage';
import Header from '@/components/Header';
import { useMemberBucketLists } from '@/features/family/hooks/useMemberBucketLists';
import { useGroupInfo } from '@/features/group-join/hooks/useGroupInfo';
import { FilterTabs, type Tab } from '@/features/home/components/FilterTabs';
import { formatKoreanDateTime } from '@/utils/dateFormat';

const FamilyMemberBucketList = () => {
  const [selected, setSelected] = useState('IN_PROGRESS');
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();

  const { data: groupInfo } = useGroupInfo();
  const member = groupInfo?.members?.find(
    (m) => m.memberId.toString() === memberId
  );

  const tabs: Tab[] = [
    { id: 'IN_PROGRESS', label: '진행중' },
    { id: 'COMPLETED', label: '완료' },
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
      <div className="flex h-full w-full items-center justify-center">
        <div className="font-hana-regular text-text-secondary text-lg">
          구성원을 찾을 수 없습니다
        </div>
      </div>
    );
  }

  return (
    <div className="bg-theme-secondary mx-auto flex h-full w-full max-w-md flex-col">
      <header className="relative z-0 mb-[-50px] flex-shrink-0 px-6 text-white">
        {/* 뒤로가기 버튼 */}
        <div className="mb-4">
          <Header onClick={handleBack} />
        </div>

        <div className="flex items-start justify-between">
          <div className="mt-2 w-1/2">
            <p className="text-text-secondary font-hana-regular !mb-0 text-3xl">
              <span className="font-hana-bold">{member.name}</span>님의 <br />
              <span className="font-hana-bold">버킷리스트</span>
            </p>
          </div>
          <div className="-mt-4 flex h-60 w-36 items-center justify-center">
            <img
              src={starBoyIcon}
              alt="Star Boy"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="relative z-20 flex-1 overflow-hidden rounded-tl-3xl rounded-tr-3xl bg-white shadow-[0px_-4px_2px_0px_rgba(0,0,0,0.09)]">
        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="font-hana-regular text-text-secondary text-lg">
              버킷리스트를 불러오는 중...
            </div>
          </div>
        ) : bucketLists && bucketLists.length > 0 ? (
          <div className="flex h-full flex-col">
            <div className="flex-shrink-0 pt-6">
              <FilterTabs
                tabs={tabs}
                selected={selected}
                setSelected={setSelected}
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="mt-6 space-y-3 px-4 pb-6">
                {bucketLists.map((item) => (
                  <BucketListItem
                    key={item.id}
                    text={item.title}
                    date={formatKoreanDateTime(item.createdAt, false)}
                    category={item.type === 'FAMILY' ? 'FAMILY' : item.type}
                    completed={item.status === 'COMPLETED'}
                    onClick={() =>
                      navigate(`/family/member/${memberId}/bucket/${item.id}`)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex-shrink-0 pt-6">
              <FilterTabs
                tabs={tabs}
                selected={selected}
                setSelected={setSelected}
              />
            </div>

            <div className="flex-1">
              <EmptyStateMessage
                title={
                  selected === 'IN_PROGRESS'
                    ? `${member.name}님이 진행중인 버킷리스트가 없어요`
                    : `${member.name}님이 완료한 버킷리스트가 없어요`
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyMemberBucketList;
