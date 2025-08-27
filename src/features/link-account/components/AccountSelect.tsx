import { useState } from 'react';
import Button from '@/components/button/Button';
import AccountItem from '@/components/AccountItem';

const AccountSelect = () => {
  const [selected, setSelected] = useState(false);

  const toggle = () => setSelected((v) => !v);

  return (
    <div className="relative h-full flex flex-col items-center w-full pt-28 px-6">
      <div className="font-hana-regular text-3xl flex flex-col w-full">
        <p>
          서비스에서 사용할
          <br />
          <span className="font-hana-bold">하나은행 입출금 계좌</span>를
          <br />
          선택해 주세요
        </p>
      </div>

      <div className="w-full">
        <div className="flex justify-end">
          <p className="font-hana-regular text-text-secondary">총 1개</p>
        </div>

        <AccountItem
          accountName="달달 하나 통장"
          accountNum="1234-56678-10"
          selected={selected}
          onClick={toggle}
        />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
        <Button
          intent={selected ? 'green' : 'gray'}
          label="확인"
          size="full"
          disabled={!selected}
          className={!selected ? 'cursor-not-allowed' : 'cursor-pointer'}
          // onClick={...} // 선택 완료 액션 연결
        />
      </div>
    </div>
  );
};

export default AccountSelect;
