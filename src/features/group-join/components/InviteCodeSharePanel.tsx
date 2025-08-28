import Header from '@/components/Header';
import Button from '@/components/button/Button';
import copySvg from '@/assets/group-join/copy.svg';
import checkCircleSvg from '@/assets/common/toast/checkCircle.svg';
import toast from 'react-hot-toast';

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

  const copyHandler = async () => {
    try {
      await navigator.clipboard.writeText(code);

      toast.custom(
        () => (
          <div className="max-w-[400px] mx-auto mb-16">
            <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5 px-4 py-3 flex items-center gap-2">
              <img
                src={checkCircleSvg}
                className="inline-block size-5"
                alt="성공"
              />
              <span className="font-hana-bold text-xl text-[var(--color-text-primary)]">
                초대코드가 복사되었어요
              </span>
            </div>
          </div>
        ),
        { duration: 2000, position: 'bottom-center', id: 'copy-ok' }
      );
    } catch {
      toast.custom(
        () => (
          <div className="w-full mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5 px-4 py-3 flex items-center gap-2">
              <span className="inline-block size-2.5 rounded-full bg-[#ef4444]" />
              <span className="font-hana-bold text-xl text-[var(--color-text-primary)]">
                복사에 실패했어요. 길게 눌러 직접 복사해 주세요.
              </span>
            </div>
          </div>
        ),
        { duration: 2500, position: 'bottom-center', id: 'copy-fail' }
      );
    }
  };

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
          <button
            type="button"
            onClick={copyHandler}
            className="flex gap-1 items-center cursor-pointer"
          >
            <img src={copySvg} className="w-5 h-5" alt="복사" />
            <span className="font-hana-regular text-xl text-text-secondary">
              초대코드 복사하기
            </span>
          </button>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
        <Button
          intent="green"
          label="확인"
          size="full"
          className="cursor-pointer"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default InviteCodeSharePanel;
