import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import InviteCodeCopyBtn from '@/components/common/InviteCodeCopyBtn';
import MemberItem from '@/components/MemberItem';
import { useGroupInfo } from '@/features/group-join/hooks/useGroupInfo';
import { useAuth } from '@/hooks/useToken';

import FamilyGroupEmptyStateCard from './FamilyGroupEmptyStateCard';

const FamilyHome = () => {
  const { data: groupInfo, isLoading, refetch } = useGroupInfo();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSupportClick = (memberId: string) => {
    navigate(`/family/member/${memberId}/bucket`);
  };

  // 컴포넌트 마운트 시 및 페이지 포커스 시 데이터 새로고침
  useEffect(() => {
    refetch();
    const handleFocus = () => {
      refetch();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="h-full w-full pt-12">
        <div className="px-6">
          <h1 className="font-hana-bold text-text-primary !mb-8 text-4xl">
            가족
          </h1>
        </div>

        <div className="w-full px-6">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="font-hana-regular text-text-secondary text-lg">
              가족 정보를 불러오는 중...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 가족 그룹에 속해있지 않은 경우
  if (!groupInfo) {
    return <FamilyGroupEmptyStateCard />;
  }

  // 가족 그룹에 속해있는 경우
  return (
    <>
      <div className="h-full w-full pt-12">
        <div className="px-6">
          <h1 className="font-hana-bold text-text-primary !mb-8 text-4xl">
            {groupInfo.groupName}
          </h1>
        </div>

        <div className="w-full px-6">
          <div className="bg-btn-default-bg mb-14 flex flex-col items-center justify-center gap-2 rounded-2xl px-20 py-6">
            <span className="font-hana-bold text-text-secondary text-3xl">
              {groupInfo?.inviteCode || '123456'}
            </span>
            <InviteCodeCopyBtn text={groupInfo?.inviteCode || '123456'} />
          </div>

          <h1 className="font-hana-bold text-text-primary !mb-8 text-3xl">
            구성원
          </h1>

          <div className="space-y-3">
            {groupInfo?.members
              ?.sort((a, b) => {
                // 현재 사용자를 제일 위에 표시
                if (a.name === user?.name) return -1;
                if (b.name === user?.name) return 1;
                return 0;
              })
              .map((member) => (
                <MemberItem
                  key={member.memberId}
                  name={member.name}
                  onSupportClick={
                    member.name === user?.name
                      ? undefined
                      : () => handleSupportClick(member.memberId.toString())
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyHome;
