import { useState } from 'react';
import Header from '@/components/Header';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';

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

      <div className="flex flex-col justify-center items-center w-full pt-5">
        <div className="font-hana-regular text-3xl flex flex-col w-full mb-5">
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

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
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
