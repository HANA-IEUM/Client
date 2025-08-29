import InviteCodeCopyBtn from '@/components/common/InviteCodeCopyBtn';
import MemberItem from '@/components/MemberItem';

const FamilyHome = () => {
  // 임시 구성원 데이터
  const members = [
    { name: '원윤서', avatar: undefined },
    { name: '김대현', avatar: undefined },
    { name: '손혜정', avatar: undefined },
  ];

  const handleSupportClick = (memberName: string) => {
    // 여기에 응원하러 이동
  };

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
              123456
            </span>
            <InviteCodeCopyBtn text="123456" />
          </div>

          <h1 className="text-3xl font-hana-bold text-text-primary !mb-8">
            구성원
          </h1>

          <div className="space-y-3">
            {members.map((member, index) => (
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
