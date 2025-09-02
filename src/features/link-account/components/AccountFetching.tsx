import Lottie from 'lottie-react';
import sandyLoading from '@/assets/common/json/SandyLoading.json';
import { useAuth } from '@/hooks/useToken.ts';

const AccountFetching = () => {
  const { user } = useAuth();
  return (
    <div className="relative h-full flex flex-col items-center w-full pt-28 px-6">
      <div className="font-hana-regular text-3xl flex flex-col w-full mb-28">
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
