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
  const shouldShowBottomTab = showBottomTabPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen flex justify-center bg-background">
      <main className="w-full max-w-md flex flex-col relative">
        <div className={`flex-1 ${shouldShowBottomTab ? 'pb-20' : ''}`}>
          <Outlet />
        </div>

        {shouldShowBottomTab && (
          <>
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-50 max-w-md">
              <BottomTab />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
