import { useLocation, useNavigate } from 'react-router-dom';

import AlbumIcon from '@/assets/common/navbar/AlbumIcon';
import FamilyIcon from '@/assets/common/navbar/FamilyIcon';
import HomeIcon from '@/assets/common/navbar/HomeIcon';
import MyPageIcon from '@/assets/common/navbar/MyPageIcon';
import WalletIcon from '@/assets/common/navbar/WalletIcon';

const tabs = [
  { path: '/home', label: '홈', Icon: HomeIcon },
  { path: '/family', label: '가족', Icon: FamilyIcon },
  { path: '/wallet', label: '지갑', Icon: WalletIcon },
  { path: '/album', label: '앨범', Icon: AlbumIcon },
  { path: '/mypage', label: '마이', Icon: MyPageIcon },
];

const BottomTab = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-full h-20 py-3 border-t border-line bg-white">
      <div className="flex gap-1">
        {tabs.map(({ path, label, Icon }) => {
          const isActive =
            path === '/family'
              ? location.pathname.startsWith('/family')
              : location.pathname === path;

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col gap-2 w-1/5 h-full items-center cursor-pointer"
            >
              <Icon active={isActive} />
              <p
                className={`font-hana-bold ${
                  isActive
                    ? 'text-[var(--color-theme-primary)]'
                    : 'text-[var(--color-text-primary)]'
                }`}
              >
                {label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTab;
