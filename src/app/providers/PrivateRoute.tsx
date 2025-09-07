import { Outlet } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { useSessionStore } from '@/stores/useSessionStore';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const { openModal } = useSessionStore();

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    openModal('로그인이 필요한 서비스입니다.');
    return null; // 빈 화면만
  }

  return <Outlet />;
};

export default PrivateRoute;
