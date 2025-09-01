import Header from '@/components/Header';
import Button from '@/components/button/Button';
import InviteCodeCopyBtn from '@/components/common/InviteCodeCopyBtn';

type InviteCodeSharePanelProps = {
  code: string;
  onBack?: () => void;
  onConfirm?: () => void;
};

const InviteCodeSharePanel = ({
  code,
  onBack,
  onConfirm,
}: InviteCodeSharePanelProps) => {
  const handleBack = () => onBack?.();

  return (
    <div className="relative h-full px-6">
      <Header onClick={handleBack} />

      <div className="flex flex-col justify-center items-center w-full pt-5 pb-28">
        <div className="font-hana-regular text-3xl flex flex-col w-full mb-5">
          <p>
            <span className="font-hana-bold">초대코드</span>를 가족들에게 공유해
            주세요
          </p>
        </div>

        <div className="bg-btn-default-bg rounded-md flex flex-col gap-2 py-6 px-20 justify-center items-center">
          <span className="font-hana-bold text-3xl text-text-secondary">
            {code}
          </span>
          <InviteCodeCopyBtn text={code} />
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
        <Button intent="green" label="확인" size="full" onClick={onConfirm} />
      </div>
    </div>
  );
};

export default InviteCodeSharePanel;
