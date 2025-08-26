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
        {shouldShowBottomTab ? (
          <div className="flex-1 pb-20">
            <Outlet />
          </div>
        ) : (
          <div className="flex-1">
            <Outlet />
          </div>
        )}

        {shouldShowBottomTab && (
          <>
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
              <BottomTab />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
