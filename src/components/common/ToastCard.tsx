import checkCircleSvg from '@/assets/common/toast/checkCircle.svg';
import errorCheckCircleSvg from '@/assets/common/toast/errorCheckCircle.svg';

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
    <div className="mx-auto flex max-w-[400px] items-center">
      <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
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
