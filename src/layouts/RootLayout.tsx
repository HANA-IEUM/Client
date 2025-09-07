import { Outlet, useLocation } from 'react-router-dom';

import BottomTab from '@/components/BottomTab';
import { usePageStayTime } from '@/hooks/usePageStayTime';
import { usePageTracking } from '@/hooks/usePageTracking';

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

  usePageTracking();
  usePageStayTime();

  return (
    <div className="bg-background flex min-h-screen justify-center">
      <main className="relative flex w-full max-w-md flex-col">
        <div className={`flex-1 ${shouldShowBottomTab ? 'pb-20' : ''}`}>
          <Outlet />
        </div>

        {shouldShowBottomTab && (
          <>
            <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2">
              <BottomTab />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
