import { createPortal } from 'react-dom';

import errorCheckCircle from '@/assets/common/toast/errorCheckCircle.svg';
import { useSessionStore } from '@/stores/useSessionStore';

import Button from '../button/Button';

const SessionExpireModal = () => {
  const { expired, message, closeModal } = useSessionStore();

  if (!expired) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-5 flex items-center gap-3">
          <img src={errorCheckCircle} className="h-7 w-7" />
          <span className="font-hana-bold text-2xl">알림</span>
        </div>

        <p className="font-hana-regular mb-6 text-2xl">{message}</p>
        <div className="flex justify-end">
          <Button
            intent="green"
            size="sm"
            label="확인"
            onClick={() => {
              closeModal();
              window.location.href = '/login';
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SessionExpireModal;
