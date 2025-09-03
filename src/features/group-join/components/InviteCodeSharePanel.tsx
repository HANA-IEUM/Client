import Button from '@/components/button/Button';
import InviteCodeCopyBtn from '@/components/common/InviteCodeCopyBtn';
import Header from '@/components/Header';

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

      <div className="flex w-full flex-col items-center justify-center pt-5 pb-28">
        <div className="font-hana-regular mb-5 flex w-full flex-col text-3xl">
          <p>
            <span className="font-hana-bold">초대코드</span>를 가족들에게 공유해
            주세요
          </p>
        </div>

        <div className="bg-btn-default-bg flex flex-col items-center justify-center gap-2 rounded-md px-20 py-6">
          <span className="font-hana-bold text-text-secondary text-3xl">
            {code}
          </span>
          <InviteCodeCopyBtn text={code} />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
        <Button intent="green" label="확인" size="full" onClick={onConfirm} />
      </div>
    </div>
  );
};

export default InviteCodeSharePanel;
