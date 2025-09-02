import { useState } from 'react';

import AccountItem from '@/components/AccountItem';
import Button from '@/components/button/Button';
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
    <div className="relative flex h-full w-full flex-col items-center px-6 pt-28">
      <div className="font-hana-regular flex w-full flex-col text-3xl">
        <p>
          서비스에서 사용할
          <br />
          <span className="font-hana-bold">하나은행 입출금 계좌</span>를
          <br />
          선택해 주세요
        </p>
      </div>

      <div className="mt-6 w-full">
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

      <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
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
