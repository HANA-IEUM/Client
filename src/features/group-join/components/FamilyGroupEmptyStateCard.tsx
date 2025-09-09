import inviteSvg from '@/assets/group-join/invite.svg';
import plusSvg from '@/assets/group-join/plus.svg';
import Button from '@/components/button/Button';
import { useAuth } from '@/hooks/useToken.ts';

type FamilyGroupEmptyStateCardProps = {
  onInviteClick: () => void;
  onCreateClick: () => void;
  onHide: () => void;
  onDoLater: () => void;
};

const FamilyGroupEmptyStateCard = ({
  onInviteClick,
  onCreateClick,
  onHide,
  onDoLater,
}: FamilyGroupEmptyStateCardProps) => {
  const { user } = useAuth();

  return (
    <div className="relative flex h-full w-full flex-col items-center px-6 pt-20">
      <div className="font-hana-regular text-text-primary flex w-full flex-col text-3xl">
        <p>
          <span className="font-hana-bold">{user?.name || '고객'}</span>님은
          <br />
          아직 가족 그룹에 <br />
          속해있지 않아요
        </p>
      </div>

      <div
        onClick={onInviteClick}
        className="bg-btn-default-bg mt-20 flex h-[110px] w-full cursor-pointer gap-3 rounded-lg pt-6 pb-5 pl-8"
      >
        <img src={inviteSvg} />
        <div className="flex flex-col gap-1">
          <span className="font-hana-regular text-text-primary text-xl">
            이미 초대코드를 받았다면
          </span>
          <span className="font-hana-bold text-text-primary text-2xl">
            가족 그룹 참여하기
          </span>
        </div>
      </div>

      <div
        onClick={onCreateClick}
        className="bg-btn-default-bg mt-9 flex h-[110px] w-full cursor-pointer gap-3 rounded-lg border-2 border-dashed border-[var(--color-line)] pt-5 pb-6 pl-8"
      >
        <img src={plusSvg} />
        <div className="flex flex-col gap-1">
          <span className="font-hana-regular text-xl">
            초대 받은 그룹이 없다면
          </span>
          <span className="font-hana-bold text-2xl">새 가족 그룹 만들기</span>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
        <div className="flex flex-col gap-5">
          <Button
            intent="gray"
            label="나중에 하기"
            size="full"
            onClick={onDoLater}
          />
          <div
            onClick={onHide}
            className="flex cursor-pointer items-center justify-center"
          >
            <span className="font-hana-bold text-line pb-9 text-2xl">
              다시 보지 않기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyGroupEmptyStateCard;
