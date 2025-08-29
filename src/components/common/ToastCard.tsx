import checkCircleSvg from '@/assets/common/toast/checkCircle.svg';
import errorCheckCircleSvg from '@/assets/common/toast/ErrorCheckCircle.svg';

type ToastCardProps = {
  message: string;
  variant: 'success' | 'error';
};

const ICONS = {
  success: checkCircleSvg,
  error: errorCheckCircleSvg,
};

export default function ToastCard({ message, variant }: ToastCardProps) {
  return (
    <div className="max-w-[400px] mx-auto flex items-center">
      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5 px-4 py-3 flex items-center gap-2">
        <img
          src={ICONS[variant]}
          alt={variant}
          className="inline-block size-5"
        />
        <span className="font-hana-bold text-xl text-[var(--color-text-primary)]">
          {message}
        </span>
      </div>
    </div>
  );
}
