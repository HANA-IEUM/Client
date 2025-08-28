import Button from '@/components/button/Button';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-full flex flex-col items-center w-full pt-28 px-6">
      <div className="font-hana-regular text-3xl flex flex-col w-full">
        <p>하나이음</p>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full max-w-md px-6 z-50">
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
