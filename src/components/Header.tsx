import backIconSvg from '@/assets/common/header/backIcon.svg';
import type { HeaderProps } from '@/types/common';

const Header = ({ onClick, isVisible = true }: HeaderProps) => {
  return (
    <div className="w-full pt-7 pb-5">
      {isVisible && (
        <img src={backIconSvg} className="cursor-pointer" onClick={onClick} />
      )}
    </div>
  );
};

export default Header;
