import { useState } from 'react';

import Button from '@/components/button/Button';
import Header from '@/components/Header';
import Input from '@/components/input/Input';

type GroupNameFormProps = {
  onBack: () => void;
  onSubmit: (name: string) => void | Promise<void>;
  loading?: boolean;
};

const GroupNameForm = ({ onBack, onSubmit, loading }: GroupNameFormProps) => {
  const [name, setName] = useState('');
  const hasText = name.trim().length > 0;

  const onConfirm = async () => {
    if (!hasText || loading) return;
    await onSubmit(name.trim());
  };

  return (
    <div className="relative h-full px-6">
      <Header onClick={onBack} />

      <div className="flex w-full flex-col items-center justify-center pt-5">
        <div className="font-hana-regular mb-5 flex w-full flex-col text-3xl">
          <p>
            <span className="font-hana-bold">그룹명</span>을 입력해 주세요
          </p>
        </div>

        <Input
          placeholder="00이네"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          font="bold"
        />
      </div>

      <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6 pb-9">
        <Button
          intent={hasText ? 'green' : 'gray'}
          label={loading ? '생성 중...' : '확인'}
          size="full"
          disabled={!hasText || !!loading}
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default GroupNameForm;
