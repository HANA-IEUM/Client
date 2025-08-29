import { useState } from 'react';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import SupportBottomSheet from './SupportBottomSheet';

const WriteTextAndSupport = () => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const isEmpty = text.trim().length === 0;

  return (
    <div className="relative h-full flex flex-col items-center w-full pt-28 px-6 pb-5">
      <div className="font-hana-regular text-3xl w-full mb-6">
        <p>
          <br />
          <span className="font-hana-bold">응원의 멘트</span>를 적어주세요
        </p>
      </div>

      <div className="w-full">
        <Input
          placeholder="엄마의 버킷리스트를 응원해요."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && !isEmpty) setOpen(true);
          }}
        />
      </div>

      <SupportBottomSheet
        open={open}
        onClose={() => setOpen(false)}
        messageText={text}
        bucketTitle="유럽 여행 가기"
        onSubmit={({ amount, pin }) => {
          console.log('후원 요청', { message: text, amount, pin });
        }}
      />

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
        <Button
          intent={isEmpty ? 'gray' : 'green'}
          label="확인"
          size="full"
          disabled={isEmpty}
          onClick={() => setOpen(true)}
        />
      </div>
    </div>
  );
};

export default WriteTextAndSupport;
