import Lottie from 'lottie-react';

import sandyLoading from '@/assets/common/json/SandyLoading.json';
import { useAuth } from '@/hooks/useToken.ts';

const AccountFetching = () => {
  const { user } = useAuth();
  return (
    <div className="relative flex h-full w-full flex-col items-center px-6 pt-28">
      <div className="font-hana-regular mb-28 flex w-full flex-col text-3xl">
        <p>
          <br />
          <span className="font-hana-bold">{user?.name || '고객'}</span>님의
          계좌를
          <br />
          불러오고 있어요
        </p>
      </div>

      <Lottie animationData={sandyLoading} autoplay loop />
    </div>
  );
};

export default AccountFetching;
