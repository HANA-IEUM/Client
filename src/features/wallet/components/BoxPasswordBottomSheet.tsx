import { useEffect, useRef, useState } from 'react';

import Button from '@/components/button/Button';
import BottomSheet from '@/components/common/BottomSheet';
import BoxInput from '@/components/common/BoxInput';
import type { BoxInputHandle } from '@/components/common/BoxInput';

interface BoxPasswordBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}

const BoxPasswordBottomSheet = ({
  open,
  onClose,
  onConfirm,
}: BoxPasswordBottomSheetProps) => {
  const [pin, setPin] = useState('');
  const pinBoxRef = useRef<BoxInputHandle>(null);
  const isPinValid = pin.length === 4;

  useEffect(() => {
    if (!open) {
      setPin('');
    }
  }, [open]);

  useEffect(() => {
    if (open) pinBoxRef.current?.focus();
  }, [open]);

  return (
    <BottomSheet isOpen={open} onClose={onClose} maxHeight="80vh">
      <div className="mt-4 flex min-h-[675px] flex-col gap-4">
        <div className="font-hana-regular mb-6 w-full text-3xl">
          <p className="!mb-0">
            계좌 <span className="font-hana-bold">비밀번호</span>를
            <br />
            입력해 주세요
          </p>
        </div>

        <BoxInput
          ref={pinBoxRef}
          length={4}
          value={pin}
          onChange={(v) => setPin(v)}
          onComplete={(v) => setPin(v)}
          isPassword
          align="start"
        />

        <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
          <div className="flex w-full gap-3">
            <Button
              intent="silver"
              size="full"
              label="뒤로"
              onClick={onClose}
              className="w-1/3"
            />
            <Button
              intent={isPinValid ? 'green' : 'silver'}
              size="full"
              label="확인"
              onClick={() => onConfirm(pin)}
              className="w-2/3"
              disabled={!isPinValid}
            />
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};

export default BoxPasswordBottomSheet;
