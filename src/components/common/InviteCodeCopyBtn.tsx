import copySvg from '@/assets/group-join/copy.svg';
import { showError, showSuccess } from '@/lib/toast';

type InviteCodeCopyBtnProps = {
  text: string;
  label?: string;
  className?: string;
};

const InviteCodeCopyBtn = ({
  text,
  label = '초대코드 복사하기',
  className = '',
}: InviteCodeCopyBtnProps) => {
  const copyHandler = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccess('초대코드가 복사되었어요.');
      // toast.custom(
      //   () => (
      //     <div className="max-w-[400px] mx-auto mb-16">
      //       <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5 px-4 py-3 flex items-center gap-2">
      //         <img
      //           src={checkCircleSvg}
      //           className="inline-block size-5"
      //           alt="성공"
      //         />
      //         <span className="font-hana-bold text-xl text-[var(--color-text-primary)]">
      //           초대코드가 복사되었어요
      //         </span>
      //       </div>
      //     </div>
      //   ),
      //   { duration: 2000, position: 'bottom-center', id: 'copy-ok' }
      // );
    } catch {
      // toast.custom(
      //   () => (
      //     <div className="w-full mx-auto">
      //       <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5 px-4 py-3 flex items-center gap-2">
      //         <span className="inline-block size-2.5 rounded-full bg-[#ef4444]" />
      //         <span className="font-hana-bold text-xl text-[var(--color-text-primary)]">
      //           복사에 실패했어요. 길게 눌러 직접 복사해 주세요.
      //         </span>
      //       </div>
      //     </div>
      //   ),
      //   { duration: 2500, position: 'bottom-center', id: 'copy-fail' }
      // );
      showError('복사에 실패했어요. 길게 눌러 직접 복사해 주세요.');
    }
  };

  return (
    <button
      type="button"
      onClick={copyHandler}
      className={`flex gap-1 items-center cursor-pointer ${className}`}
    >
      <img src={copySvg} className="w-5 h-5" alt="복사" />
      <span className="font-hana-regular text-xl text-text-secondary">
        {label}
      </span>
    </button>
  );
};

export default InviteCodeCopyBtn;
