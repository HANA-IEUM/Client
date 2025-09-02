import { useNavigate } from 'react-router-dom';

import Button from '@/components/button/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full w-full flex-col items-center px-6 pt-28">
      <div className="font-hana-regular flex w-full flex-col text-3xl">
        <p>하나이음</p>
      </div>

      <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
        <div className="flex flex-col gap-5">
          <Button
            intent={'green'}
            label="로그인"
            size="full"
            className="h-[46px]"
            onClick={() => navigate('/login')}
          />
          <Button
            intent={'mint'}
            label="회원가입"
            size="full"
            className="h-[46px]"
            onClick={() => navigate('/register')}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
