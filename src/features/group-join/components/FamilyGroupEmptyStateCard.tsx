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
    <div className="relative h-full flex flex-col items-center w-full pt-28 px-6">
      <div className="font-hana-regular text-3xl flex flex-col w-full">
        <p>
          <span className="font-hana-bold">{user?.name || '고객'}</span>님은
          아직 가족 그룹에 <br />
          속해있지 않아요
        </p>
      </div>

      <div
        onClick={onInviteClick}
        className="bg-btn-default-bg gap-3 cursor-pointer rounded-lg w-full h-[110px] flex pb-5 pt-6 pl-5 pr-9 mt-20"
      >
        <img src={inviteSvg} />
        <div className="flex flex-col gap-1">
          <span className="text-xl font-hana-regular">
            이미 초대코드를 받았다면
          </span>
          <span className="text-2xl font-hana-bold">가족 그룹 참여하기</span>
        </div>
      </div>

      <div
        onClick={onCreateClick}
        className="bg-btn-default-bg gap-3 rounded-lg cursor-pointer flex w-full h-[110px] mt-9 pb-6 pt-5 pl-8 pr-12 border-2 border-dashed border-[var(--color-line)]"
      >
        <img src={plusSvg} />
        <div className="flex flex-col gap-1">
          <span className="text-xl font-hana-regular">
            초대 받은 그룹이 없다면
          </span>
          <span className="text-2xl font-hana-bold">새 가족 그룹 만들기</span>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
        <div className="flex flex-col gap-5">
          <Button
            intent="gray"
            label="나중에 하기"
            size="full"
            onClick={onDoLater}
          />
          <div
            onClick={onHide}
            className="flex justify-center items-center cursor-pointer"
          >
            <span className="text-lg font-hana-bold text-line">
              다시 보지 않기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyGroupEmptyStateCard;
