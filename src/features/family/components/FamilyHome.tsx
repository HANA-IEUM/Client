import { useEffect } from 'react';
import { useGroupInfo } from '@/features/group-join/hooks/useGroupInfo';
import InviteCodeCopyBtn from '@/components/common/InviteCodeCopyBtn';
import MemberItem from '@/components/MemberItem';
import FamilyGroupEmptyStateCard from './FamilyGroupEmptyStateCard';

const FamilyHome = () => {
  const { data: groupInfo, isLoading, refetch } = useGroupInfo();

  // 임시 구성원 데이터
  const members = [
    { name: '원윤서', avatar: undefined },
    { name: '김대현', avatar: undefined },
    { name: '손혜정', avatar: undefined },
  ];

  const handleSupportClick = (memberName: string) => {
    // 여기에 응원하러 이동
  };

  // 페이지 포커스 시 데이터 새로고침
  useEffect(() => {
    const handleFocus = () => {
      refetch();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetch]);

  // 가족 그룹에 속해있지 않은 경우
  if (!isLoading && !groupInfo) {
    return <FamilyGroupEmptyStateCard />;
  }

  // 가족 그룹에 속해있는 경우
  return (
    <>
      <div className="w-full h-full pt-12">
        <div className="px-6">
          <h1 className="text-4xl font-hana-bold text-text-primary !mb-8">
            가족
          </h1>
        </div>

        <div className="w-full px-6">
          <div className="bg-btn-default-bg rounded-2xl flex flex-col gap-2 py-6 px-20 justify-center items-center mb-14">
            <span className="font-hana-bold text-3xl text-text-secondary">
              {groupInfo?.inviteCode || '123456'}
            </span>
            <InviteCodeCopyBtn text={groupInfo?.inviteCode || '123456'} />
          </div>

          <h1 className="text-3xl font-hana-bold text-text-primary !mb-8">
            구성원
          </h1>

          <div className="space-y-3">
            {groupInfo?.members?.map((member) => (
              <MemberItem
                key={member.memberId}
                name={member.name}
                onSupportClick={() => handleSupportClick(member.name)}
              />
            )) ||
              members.map((member, index) => (
                <MemberItem
                  key={index}
                  name={member.name}
                  onSupportClick={() => handleSupportClick(member.name)}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyHome;
