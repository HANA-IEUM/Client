import { useState } from 'react';

import CheckIcon from '@/assets/common/CheckIcon';
import HanaIcon from '@/assets/common/HanaIcon';
import Button from '@/components/button/Button';

type AccountConnectProps = {
  goToTermOfUse: () => void;
  handleAgreeAll: () => void;
};

const AccountConnect = ({
  goToTermOfUse,
  handleAgreeAll,
}: AccountConnectProps) => {
  const [selected, setSelected] = useState(false);
  const onClickHandler = () => {
    setSelected(!selected);
    goToTermOfUse();
  };

  return (
    <div className="relative h-full flex flex-col items-center w-full pt-28 px-6">
      <div className="font-hana-regular text-3xl flex flex-col w-full">
        <p>
          서비스를 사용하기 위해
          <br />
          <span className="font-hana-bold">하나은행 입출금 계좌</span>를
          <br />
          연결해야 해요
        </p>
      </div>

      <div className="mt-36">
        <HanaIcon width={92} height={92} />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
        <div
          onClick={onClickHandler}
          className="bg-btn-default-bg rounded-md flex gap-3 w-full py-2 pl-5 mb-7"
        >
          <div className="flex justify-center items-center">
            <CheckIcon selected={selected} />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-hana-bold">선택 동의</span>
            <span className="text-lg font-hana-regular">
              이용 약관 확인 및 동의
            </span>
          </div>
        </div>
        <Button
          onClick={handleAgreeAll}
          intent="green"
          label="동의해요"
          size="full"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default AccountConnect;
