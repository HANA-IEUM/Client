import toast, { type ToastOptions } from 'react-hot-toast';
import ToastCard from '@/components/common/ToastCard';

const base: ToastOptions = { position: 'bottom-center', duration: 2200 };

export const showSuccess = (msg: string, opts?: ToastOptions) =>
  toast.custom(
    () => (
      <div className="max-w-[400px] mx-auto mb-24">
        <ToastCard message={msg} variant="success" />
      </div>
    ),
    { ...base, ...opts }
  );

export const showError = (msg: string, opts?: ToastOptions) =>
  toast.custom(
    () => (
      <div className="max-w-[400px] mx-auto mb-24">
        <ToastCard message={msg} variant="error" />
      </div>
    ),
    { ...base, ...opts }
  );
