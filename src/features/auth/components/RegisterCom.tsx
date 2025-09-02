import Button from '@/components/button/Button.tsx';
import ConIcon from '@/assets/common/user/register.png';
import { useNavigate } from 'react-router-dom';

export default function RegisterCom() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-6 text-left">
        <p className="text-3xl font-hana-regular">
          <span className="font-hana-bold">회원가입</span>을 완료했어요
          <br />
          <span className="font-hana-bold">로그인</span>하고 서비스를
          <br />
          이용해 보세요
        </p>
        <div className="mt-24 flex-grow flex justify-center items-center">
          <img src={ConIcon} alt="축하해요" />
        </div>
      </div>
      <Button
        label="로그인하러 가기"
        size="full-lg"
        intent={'green'}
        font="regular"
        onClick={() => navigate('/login')}
      />
    </div>
  );
}
