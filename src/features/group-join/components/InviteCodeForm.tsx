import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Header from '@/components/Header';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';
import { useJoinGroup } from '../hooks/useJoinGroup';
import { showSuccess, showError } from '@/lib/toast';

type InviteCodeFormProps = { onBack: () => void; onNext?: () => void };

const InviteCodeForm = ({ onBack }: InviteCodeFormProps) => {
  const [code, setCode] = useState('');
  const hasText = code.trim().length > 0;

  const navigate = useNavigate();
  const joinGroup = useJoinGroup();

  const onJoin = () => {
    if (!hasText || joinGroup.isPending) return;

    joinGroup.mutate(code.trim(), {
      onSuccess: () => {
        showSuccess('그룹에 찹여했어요!');
        navigate('/home', { replace: true });
      },
      onError: (err: unknown) => {
        const msg =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ?? '참여에 실패했습니다. 초대코드를 확인해 주세요.';
        showError(msg);
      },
    });
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') onJoin();
          }}
          font="bold"
        />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
        <Button
          intent={hasText ? 'green' : 'gray'}
          label={joinGroup.isPending ? '참여 중…' : '그룹 참여하기'}
          size="full"
          disabled={!hasText || joinGroup.isPending}
          onClick={onJoin}
        />
      </div>
    </div>
  );
};

export default InviteCodeForm;
