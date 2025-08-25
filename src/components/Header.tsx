import backIconSvg from '@/assets/common/header/backIcon.svg';
import type { HeaderProps } from '@/types/common';

const Header = ({ onClick }: HeaderProps) => {
  return (
    <div className="w-full pt-5 pl-3 pb-5">
      <img src={backIconSvg} className="cursor-pointer" onClick={onClick} />
    </div>
  );
};

export default Header;
