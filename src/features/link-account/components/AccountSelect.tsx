import { useState } from 'react';
import Button from '@/components/button/Button';
import AccountItem from '@/components/AccountItem';
import type { MainAccount } from '@/types/account';
import { formatAccountNumber } from '@/utils/formatAccountNumber';

type AccountSelectProps = {
  account?: MainAccount;
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  onConfirm?: (account: MainAccount | null) => void;
};

const AccountSelect = ({
  account,
  isLoading,
  onRetry,
  onConfirm,
}: AccountSelectProps) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (!account) return;
    setSelected((v) => !v);
  };

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

      <div className="w-full mt-6">
        <div className="flex justify-end">
          <p className="font-hana-regular text-text-secondary">
            {isLoading ? '로딩 중…' : account ? '총 1개' : '없음'}
          </p>
        </div>

        {account && (
          <div className="mt-2">
            <AccountItem
              accountName={account.accountName}
              accountNum={formatAccountNumber(account.accountNumber)}
              selected={selected}
              onClick={handleClick}
            />
          </div>
        )}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
        <Button
          intent={selected ? 'green' : 'gray'}
          label="확인"
          size="full"
          disabled={!account || !selected}
          onClick={() => onConfirm?.(selected && account ? account : null)}
        />
      </div>
    </div>
  );
};

export default AccountSelect;
