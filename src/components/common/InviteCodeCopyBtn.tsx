import copySvg from '@/assets/group-join/copy.svg';
import { showError, showSuccess } from '@/lib/toast';

type InviteCodeCopyBtnProps = {
  text: string;
  label?: string;
  className?: string;
  isCoupon?: boolean;
};

const InviteCodeCopyBtn = ({
  text,
  label,
  className = '',
  isCoupon = false,
}: InviteCodeCopyBtnProps) => {
  const copyHandler = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccess(
        isCoupon ? '쿠폰 번호가 복사되었어요.' : '초대코드가 복사되었어요.'
      );
    } catch {
      showError(
        isCoupon
          ? '복사에 실패했어요. 길게 눌러 쿠폰번호를 직접 복사해 주세요.'
          : '복사에 실패했어요. 길게 눌러 직접 복사해 주세요.'
      );
    }
  };

  return (
    <button
      type="button"
      onClick={copyHandler}
      className={`flex cursor-pointer items-center gap-1 ${className}`}
    >
      <img src={copySvg} className="h-5 w-5" alt="복사" />
      <span className="font-hana-regular text-text-secondary text-xl">
        {label ?? (isCoupon ? '쿠폰번호 복사하기' : '초대코드 복사하기')}
      </span>
    </button>
  );
};

export default InviteCodeCopyBtn;
