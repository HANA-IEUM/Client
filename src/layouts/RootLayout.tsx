import { Outlet, useLocation } from 'react-router-dom';
import BottomTab from '@/components/BottomTab';

export default function RootLayout() {
  const location = useLocation();
  const showBottomTabPaths = [
    '/home',
    '/family',
    '/wallet',
    '/album',
    '/mypage',
  ];
  const shouldShowBottomTab = showBottomTabPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex justify-center bg-background">
      <main className="w-full max-w-md flex flex-col relative">
        <div className="flex-1">
          <Outlet />
        </div>

        {shouldShowBottomTab && (
          <>
            {/* 1) flow에 공간을 남겨두는 스페이서 (탭과 동일 높이) */}
            <div className="h-20 shrink-0" />

            {/* 2) 화면 하단 고정된 실제 탭 */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
              <BottomTab />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
