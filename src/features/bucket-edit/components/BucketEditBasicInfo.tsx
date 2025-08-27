import { useState } from 'react';
import Button from '@/components/button/Button';
import SelectItem from '@/components/SelectItem';
import Input from '@/components/input/Input';
import { Switch } from 'antd';
import type { SwitchChangeEventHandler } from 'antd/es/switch';

type BucketEditBasicInfoProps = {
  onNext: () => void;
};

const BucketEditBasicInfo = ({ onNext }: BucketEditBasicInfoProps) => {
  const [withWho, setWithWho] = useState<'혼자' | '함께'>('혼자');

  const [what, setWhat] = useState<string>('');

  const [checked, setChecked] = useState(false);
  const onChange: SwitchChangeEventHandler = (val) => setChecked(val);

  const isValid = what.trim().length > 0;

  const handleNext = () => {
    if (!isValid) return;
    onNext();
  };

  return (
    <div className="relative h-full flex flex-col items-center w-full pt-28 px-6 pb-5">
      <div className="font-hana-regular text-3xl flex flex-col w-full">
        <p>
          <br />
          <span className="font-hana-bold">버킷리스트</span>에 대한 정보를
          <br />
          입력해 주세요
        </p>
      </div>

      <div className="w-full scrollbar-hide overflow-y-auto min-h-0 pr-1 mb-5 pb-10">
        <div className="w-full">
          <p className="font-hana-bold text-3xl">1. 누구와</p>
          <div className="flex gap-2 w-full mt-3">
            <SelectItem
              text="혼자"
              selected={withWho === '혼자'}
              onClick={() => setWithWho('혼자')}
            />
            <SelectItem
              text="함께"
              selected={withWho === '함께'}
              onClick={() => setWithWho('함께')}
            />
          </div>
        </div>

        <div className="w-full mt-12">
          <p className="font-hana-bold text-3xl">2. 무엇을</p>
          <Input
            placeholder="유럽여행 가기"
            value={what}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWhat(e.target.value)
            }
          />
        </div>

        <div className="w-full mt-12 flex gap-15 items-center">
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

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
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
