import InviteCodeCopyBtn from '@/components/common/InviteCodeCopyBtn';

const FamilyHome = () => {
  return (
    <>
      <div className="w-full h-full pt-12">
        <div className="px-6">
          <h1 className="text-4xl font-hana-bold text-text-primary !mb-8">
            가족
          </h1>
        </div>

        <div className="w-full px-6 mb-14">
          <div className="bg-btn-default-bg rounded-2xl flex flex-col gap-2 py-6 px-20 justify-center items-center">
            <span className="font-hana-bold text-3xl text-text-secondary">
              123456
            </span>
            <InviteCodeCopyBtn text="123456" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyHome;
