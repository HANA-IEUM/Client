import { useNavigate } from 'react-router-dom';

import starBoyIcon from '@/assets/common/header/starBoy.png';
import Button from '@/components/button/Button.tsx';

export type HomeHeaderProps = {
  name: string;
};

export const HomeHeader = ({ name }: HomeHeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="bg-theme-primary relative z-0 mb-[-50px] w-full px-6 pt-8 text-white">
      <div className="flex items-start justify-between">
        <div className="mt-2 w-1/2">
          <p className="font-hana-regular text-3xl">
            <span className="font-hana-bold">{name}</span>님의 <br />
            <span className="font-hana-bold">버킷리스트</span>
          </p>
          <Button
            label="등록하기"
            intent="yellow"
            size="lg"
            font="regular"
            onClick={() => navigate('/bucket-create')}
          />
        </div>
        <img src={starBoyIcon} alt="캐릭터" className="h-60 w-36" />
      </div>
    </header>
  );
};
