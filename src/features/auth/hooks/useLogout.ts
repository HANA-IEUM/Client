import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';

import { logoutUser } from '../apis/auth';

export const useLogout = () => {
  const { logout: storeLogout } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      storeLogout();
      queryClient.clear();
      navigate('/login', { replace: true });
    },
    onError: () => {
      storeLogout();
      queryClient.clear();
      navigate('/login', { replace: true });
    },
  });
};
