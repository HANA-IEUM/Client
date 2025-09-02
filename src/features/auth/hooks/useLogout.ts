import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';

import { logoutUser } from '../apis/auth';

export const useLogout = () => {
  const { logout: storeLogout } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      storeLogout();
      navigate('/', { replace: true });
    },
    onError: () => {
      storeLogout();
      navigate('/', { replace: true });
    },
  });
};
