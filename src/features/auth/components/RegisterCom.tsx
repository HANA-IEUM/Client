import { useNavigate } from 'react-router-dom';

import ConIcon from '@/assets/common/user/register.png';
import Button from '@/components/button/Button.tsx';

export default function RegisterCom() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col">
      <div className="flex-grow space-y-6 text-left">
        <p className="font-hana-regular text-3xl">
          <span className="font-hana-bold">회원가입</span>을 완료했어요
          <br />
          <span className="font-hana-bold">로그인</span>하고 서비스를
          <br />
          이용해 보세요
        </p>
        <div className="mt-24 flex flex-grow items-center justify-center">
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
