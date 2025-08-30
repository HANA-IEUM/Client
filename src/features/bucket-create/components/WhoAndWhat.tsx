import { useEffect, useRef } from 'react';
import { type InputRef, Switch } from 'antd';
import SelectItem from '@/components/SelectItem.tsx';
import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';
import type { WhoAndWhatProps } from '@/features/bucket-create/types/props.ts';

// Step 2: 누구와 무엇을
export const WhoAndWhat = ({
  title,
  setTitle,
  withFamily,
  setWithFamily,
  visible,
  setVisible,
  hasGroup,
  onNext,
}: WhoAndWhatProps) => {
  const inputRef = useRef<InputRef>(null);
  if (!hasGroup) {
    setWithFamily(false);
  }
  useEffect(() => {
    if (withFamily !== null) {
      inputRef.current?.focus();
    }
  }, [withFamily]);
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6 text-left">
        <p className="text-3xl font-hana-regular">
          <span className="font-hana-bold">버킷리스트</span>에 대한 정보를
          <br />
          입력해 주세요
        </p>

        <div className="flex gap-15 w-full items-center">
          <span className="font-hana-regular text-3xl">
            <span className="font-hana-bold">가족</span>에게 버킷 공개{' '}
          </span>
          <Switch
            checked={visible}
            onChange={setVisible}
            style={{
              backgroundColor: visible ? '#008485' : '#d1d5db',
              transform: 'scale(1.5)',
              transformOrigin: 'center',
              position: 'relative',
              top: '3px',
            }}
          />{' '}
        </div>

        <div className="w-full">
          <p className="font-hana-bold text-3xl">1. 누구와</p>
          <div className="grid grid-cols-2 gap-2 w-full mt-3">
            <SelectItem
              text="혼자"
              selected={withFamily === false}
              onClick={() => setWithFamily(false)}
            />
            {hasGroup && (
              <SelectItem
                text="함께"
                selected={withFamily === true}
                onClick={() => setWithFamily(true)}
              />
            )}
          </div>
        </div>
        {withFamily !== null ? (
          <>
            <p className="font-hana-bold text-3xl">2. 무엇을</p>
            <Input
              ref={inputRef}
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              placeholder="예: 스위스에서 패러글라이딩"
              intent="green"
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <Button
        label="다 음"
        size="full-lg"
        intent="green"
        onClick={onNext}
        disabled={!title}
      />
    </div>
  );
};
