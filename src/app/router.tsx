import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';

import LandingPage from '@/pages/LandingPage';
import HomePage from '@/pages/HomePage';
import FamilyPage from '@/pages/FamilyPage';
import WalletPage from '@/pages/WalletPage';
import AlbumPage from '@/pages/AlbumPage';
import MyPage from '@/pages/MyPage';
import RegisterPage from '@/pages/RegisterPage.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'home', element: <HomePage /> },
      { path: 'family', element: <FamilyPage /> },
      { path: 'wallet', element: <WalletPage /> },
      { path: 'album', element: <AlbumPage /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
]);
