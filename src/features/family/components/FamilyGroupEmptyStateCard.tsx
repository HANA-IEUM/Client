import { useNavigate } from 'react-router-dom';

import inviteSvg from '@/assets/group-join/invite.svg';
import plusSvg from '@/assets/group-join/plus.svg';

interface FamilyGroupEmptyStateCardProps {
  onInviteClick?: () => void;
  onCreateClick?: () => void;
  onBack?: () => void;
}

const FamilyGroupEmptyStateCard = ({
  onInviteClick,
  onCreateClick,
}: FamilyGroupEmptyStateCardProps) => {
  const navigate = useNavigate();

  const handleInviteClick = () => {
    if (onInviteClick) {
      onInviteClick();
    } else {
      // props가 없을 때만 직접 라우팅 (fallback)
      navigate('/group?step=1', { state: { from: '/family' } });
    }
  };

  const handleCreateClick = () => {
    if (onCreateClick) {
      onCreateClick();
    } else {
      // props가 없을 때만 직접 라우팅 (fallback)
      navigate('/group?step=2', { state: { from: '/family' } });
    }
  };

  return (
    <div className="h-full w-full pt-12">
      <div className="px-6">
        <h1 className="font-hana-bold text-text-primary !mb-8 text-4xl">
          가족
        </h1>
      </div>

      <div className="w-full px-6">
        <div className="flex flex-col items-center justify-center py-20">
          {/* 빈 상태 아이콘 */}
          <div className="mb-6 flex h-32 w-40 items-center justify-center">
            <img
              src="/src/assets/common/empty.svg"
              alt="빈 가족 그룹"
              className="h-full w-full object-contain"
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(85%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
              }}
            />
          </div>

          <div className="mb-20 space-y-2 text-center">
            <p className="font-hana-bold text-line !mb-0 text-2xl">
              아직 가족 그룹에
            </p>
            <p className="font-hana-bold text-line !mb-0 text-2xl">
              속해있지 않아요
            </p>
          </div>

          <div className="w-full space-y-4">
            <div
              onClick={handleInviteClick}
              className="bg-btn-default-bg flex h-[110px] w-full cursor-pointer gap-3 rounded-lg pt-6 pr-9 pb-5 pl-5"
            >
              <img src={inviteSvg} alt="초대" />
              <div className="flex flex-col gap-1">
                <span className="font-hana-regular text-xl">
                  이미 초대코드를 받았다면
                </span>
                <span className="font-hana-bold text-2xl">
                  가족 그룹 참여하기
                </span>
              </div>
            </div>

            <div
              onClick={handleCreateClick}
              className="bg-btn-default-bg flex h-[110px] w-full cursor-pointer gap-3 rounded-lg border-2 border-dashed border-[var(--color-line)] pt-5 pr-12 pb-6 pl-8"
            >
              <img src={plusSvg} alt="새로 만들기" />
              <div className="flex flex-col gap-1">
                <span className="font-hana-regular text-xl">
                  초대 받은 그룹이 없다면
                </span>
                <span className="font-hana-bold text-2xl">
                  새 가족 그룹 만들기
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyGroupEmptyStateCard;
