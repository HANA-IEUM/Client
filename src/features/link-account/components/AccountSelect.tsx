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
            {isLoading ? '로딩 중…' : account ? '총 3개' : '없음'}
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

      <div className="mt-4 flex w-full flex-col gap-4">
        <AccountItem
          accountName="하나 플러스 통장"
          accountNum="022-432122-49182"
        />
        <AccountItem
          accountName="행복나눔 통장"
          accountNum="122-597821-92837"
        />
      </div>

      <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center">
            <p className="font-hana-regular text-center text-3xl">
              <span className="font-hana-bold text-3xl">
                💡 하나은행 연금 수령 계좌
              </span>
              를 <br />
              연결하면{' '}
              <span className="font-hana-bold text-3xl">우대금리 1%</span>를
              <br />
              추가로 받을 수 있어요
            </p>
          </div>

          <Button
            label="연금 수령 계좌 이전하기"
            intent="green"
            onClick={() =>
              window.open(
                'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080103/1455931_115188.jsp',
                '_blank'
              )
            }
          />
          <Button
            intent={selected ? 'green' : 'gray'}
            label="확인"
            size="full"
            disabled={!account || !selected}
            onClick={() => onConfirm?.(selected && account ? account : null)}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSelect;
