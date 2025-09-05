import { useNavigate } from 'react-router-dom';

import hanaIeumLogo from '@/assets/onboarding/hanaIeumLogo.png';
import Button from '@/components/button/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="justify-startpx-6 relative flex h-full w-full flex-col items-center pt-25">
      <img
        src={hanaIeumLogo}
        alt="하나이음 로고"
        className="animate-floating h-auto w-96"
      />

      <div className="font-hana-bold text-text-secondary text-center text-xl">
        "꿈꾸는 순간부터 이뤄지는 순간까지"
      </div>

      <div className="absolute bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-6">
        <div className="flex flex-col gap-5">
          <Button
            intent={'green'}
            label="로그인"
            size="full"
            className="!font-hana-bold !h-11 !text-2xl"
            onClick={() => navigate('/login')}
          />
          <Button
            intent={'mint'}
            label="회원가입"
            size="full"
            className="!font-hana-bold !h-11 !text-2xl"
            onClick={() => navigate('/register')}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
