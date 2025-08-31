import hanabankGif from '@/assets/common/header/hanabank.gif';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/Button.tsx';

export type HomeHeaderProps = {
  name: string;
};

export const HomeHeader = ({ name }: HomeHeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="relative px-6 pt-8 text-white bg-theme-primary w-full mb-[-50px] z-0">
      <div className="flex items-start justify-between">
        <div className="w-1/2 mt-2">
          <p className="text-3xl font-hana-regular">
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
        <img src={hanabankGif} alt="캐릭터" className="w-36 h-60" />
      </div>
    </header>
  );
};
