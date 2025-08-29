import { useState } from 'react';
import Header from '@/components/Header';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';

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

      <div className="flex flex-col justify-center items-center w-full pt-5 pb-28">
        <div className="font-hana-regular text-3xl flex flex-col w-full mb-5">
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

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
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
