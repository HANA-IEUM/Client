import { createBrowserRouter } from 'react-router-dom';

import FamilyMemberBucketList from '@/features/family/components/FamilyMemberBucketList';
import OnboardingWrapper from '@/layouts/OnboardingWrapper';
import RootLayout from '@/layouts/RootLayout';
import AlbumPage from '@/pages/AlbumPage';
import BucketCreatePage from '@/pages/BucketCreatePage.tsx';
import BucketDetailPage from '@/pages/BucketDetailPage';
import BucketEditPage from '@/pages/BucketEditPage';
import FamilyPage from '@/pages/FamilyPage';
import GroupJoinPage from '@/pages/GroupJoinPage';
import HomePage from '@/pages/HomePage';
import LinkAccountPage from '@/pages/LinkAccountPage';
import LoginPage from '@/pages/LoginPage.tsx';
import MyPage from '@/pages/MyPage';
import RegisterPage from '@/pages/RegisterPage.tsx';
import SupportDetailPage from '@/pages/SupportDetailPage';
import SupportPage from '@/pages/SupportPage';
import WalletPage from '@/pages/WalletPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <OnboardingWrapper /> },
      { path: 'home', element: <HomePage /> },
      { path: 'family', element: <FamilyPage /> },
      {
        path: 'family/member/:memberId/bucket',
        element: <FamilyMemberBucketList />,
      },
      { path: 'wallet', element: <WalletPage /> },
      { path: 'album', element: <AlbumPage /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'group', element: <GroupJoinPage /> },
      { path: 'account', element: <LinkAccountPage /> },
      { path: 'bucket/:id', element: <BucketDetailPage /> },
      { path: 'bucket-edit/:id', element: <BucketEditPage /> },
      { path: 'bucket-support/:id', element: <SupportPage /> },
      { path: 'bucket-create', element: <BucketCreatePage /> },
      { path: 'support/:id', element: <SupportDetailPage /> },
    ],
  },
]);
