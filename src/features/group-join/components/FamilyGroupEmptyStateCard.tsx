import inviteSvg from '@/assets/group-join/invite.svg';
import plusSvg from '@/assets/group-join/plus.svg';

const FamilyGroupEmptyStateCard = () => {
  return (
    <div className="flex flex-col jusitify-center items-center w-full pt-28">
      <div className="font-hana-regular text-3xl flex justify-center items-center flex-col w-full">
        <p>
          <span className="font-hana-bold">승희</span>님은 아직 가족 그룹에{' '}
          <br />
          속해있지 않아요
        </p>
      </div>

      <div className="bg-btn-default-bg gap-3 rounded-lg w-[345px] h-[110px] flex pb-5 pt-6 pl-5 pr-9 mt-20">
        <img src={inviteSvg} />
        <div className="flex flex-col gap-1">
          <span className="text-xl font-hana-regular">
            이미 초대코드를 받았다면
          </span>
          <span className="text-2xl font-hana-bold">가족 그룹 초대하기</span>
        </div>
      </div>

      <div className="bg-btn-default-bg gap-3 rounded-lg flex w-[345px] h-[110px] mt-9 pb-6 pt-5 pl-8 pr-12  border-2 border-dashed border-[var(--color-line)]">
        <img src={plusSvg} />
        <div className="flex flex-col gap-1">
          <span className="text-xl font-hana-regular">
            초대 받은 그룹이 없다면
          </span>
          <span className="text-2xl font-hana-bold">새 가족 그룹 만들기</span>
        </div>
      </div>
    </div>
  );
};

export default FamilyGroupEmptyStateCard;
