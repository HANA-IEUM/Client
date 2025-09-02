import { Switch } from 'antd';
import type { SwitchChangeEventHandler } from 'antd/es/switch';
import { useState, useEffect } from 'react';

import Button from '@/components/button/Button';
import Header from '@/components/Header';
import Input from '@/components/input/Input';
import SelectItem from '@/components/SelectItem';

type BucketEditBasicInfoProps = {
  onNext: () => void;
  onBack: () => void;
  onChangeTitle: (title: string) => void;
  onChangePublicFlag: (flag: boolean) => void;
  onChangeShareFlag: (flag: boolean) => void;
  familyCount: number;
};

const BucketEditBasicInfo = ({
  onNext,
  onBack,
  onChangeTitle,
  onChangePublicFlag,
  onChangeShareFlag,
  familyCount,
}: BucketEditBasicInfoProps) => {
  const [withWho, setWithWho] = useState<'혼자' | '함께'>('혼자');
  const [what, setWhat] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    onChangeTitle(what);
  }, [what]);

  useEffect(() => {
    onChangePublicFlag(checked);
  }, [checked]);

  useEffect(() => {
    onChangeShareFlag(withWho === '함께');
  }, [withWho]);

  const onChange: SwitchChangeEventHandler = (
    checked: boolean,
    _event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLSpanElement>
  ) => {
    setChecked(checked);
  };
  const isValid = what.trim().length > 0;

  const handleNext = () => {
    if (!isValid) return;
    onNext();
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center px-6 pb-5">
      <Header onClick={onBack} />

      <div className="font-hana-regular flex w-full flex-col text-3xl">
        <p>
          <br />
          <span className="font-hana-bold">버킷리스트</span>에 대한 정보를
          <br />
          입력해 주세요
        </p>
      </div>

      <div className="scrollbar-hide mb-5 min-h-0 w-full overflow-y-auto pr-1 pb-10">
        <div className="w-full">
          <p className="font-hana-bold text-3xl">1. 누구와</p>
          <div className="mt-3 flex w-full gap-2">
            <SelectItem
              text="혼자"
              selected={withWho === '혼자'}
              onClick={() => setWithWho('혼자')}
            />
            <div className={familyCount > 1 ? '' : 'invisible w-full'}>
              <SelectItem
                text="함께"
                selected={withWho === '함께'}
                onClick={() => setWithWho('함께')}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 w-full">
          <p className="font-hana-bold text-3xl">2. 무엇을</p>
          <Input
            placeholder="유럽여행 가기"
            value={what}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWhat(e.target.value)
            }
          />
        </div>

        <div className="mt-12 flex w-full items-center gap-15">
          <span className="font-hana-regular text-3xl">
            <span className="font-hana-bold">가족</span>에게 버킷 공개{' '}
          </span>
          <Switch
            checked={checked}
            onChange={onChange}
            style={{
              backgroundColor: checked ? '#008485' : '#d1d5db',
              transform: 'scale(1.5)',
              transformOrigin: 'center',
              position: 'relative',
              top: '3px',
            }}
          />{' '}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
        <Button
          onClick={handleNext}
          intent={isValid ? 'green' : 'gray'}
          disabled={!isValid}
          label="확인"
          size="full"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default BucketEditBasicInfo;
