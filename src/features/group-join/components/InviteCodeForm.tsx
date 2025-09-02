import { useState } from 'react';

import Button from '@/components/button/Button';
import Header from '@/components/Header';
import Input from '@/components/input/Input';

type InviteCodeFormProps = {
  onBack: () => void;
  onJoin: (code: string) => void;
  loading?: boolean;
};

const InviteCodeForm = ({
  onBack,
  onJoin,
  loading = false,
}: InviteCodeFormProps) => {
  const [code, setCode] = useState('');
  const hasText = code.trim().length > 0;

  const submit = () => {
    if (!hasText || loading) return;
    onJoin(code.trim());
  };

  return (
    <div className="relative h-full px-6">
      <Header onClick={onBack} />

      <div className="flex w-full flex-col items-center justify-center pt-5 pb-28">
        <div className="font-hana-regular mb-5 flex w-full flex-col text-3xl">
          <p>
            <span className="font-hana-bold">초대코드</span>를 입력해 주세요
          </p>
        </div>

        <Input
          placeholder="초대 코드 입력"
          value={code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCode(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') submit();
          }}
          font="bold"
        />
      </div>

      <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
        <Button
          intent={hasText ? 'green' : 'gray'}
          label={loading ? '참여 중…' : '그룹 참여하기'}
          size="full"
          disabled={!hasText || loading}
          onClick={submit}
        />
      </div>
    </div>
  );
};

export default InviteCodeForm;
