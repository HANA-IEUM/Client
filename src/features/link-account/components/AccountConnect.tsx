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
    <div className="relative flex h-full w-full flex-col items-center px-6 pt-20 md:pt-10">
      <div className="font-hana-regular flex w-full flex-col text-3xl">
        <p>
          서비스를 사용하기 위해
          <br />
          <span className="font-hana-bold">하나은행 입출금 계좌</span>를
          <br />
          연결해야 해요
        </p>
      </div>

      <div className="mt-36 md:mt-20">
        <HanaIcon width={92} height={92} />
      </div>

      <div className="absolute bottom-6 left-1/2 z-50 mb-9 w-full max-w-md -translate-x-1/2 px-6">
        <div
          onClick={onClickHandler}
          className="bg-btn-default-bg mb-7 flex w-full gap-3 rounded-md py-2 pl-5"
        >
          <div className="flex items-center justify-center">
            <CheckIcon selected={selected} />
          </div>

          <div className="flex flex-col">
            <span className="font-hana-bold text-xl">선택 동의</span>
            <span className="font-hana-regular text-lg">
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
