import type { LoginPayload, LoginResponse } from '@/types/auth.ts';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/features/auth/apis/auth';
import { setTokens } from '@/lib/token.ts';
import { useAuthStore } from '@/stores/authStore.ts';

export const useLogin = (
  onSuccess?: (data: LoginResponse) => void,
  onError?: (error: Error) => void
) => {
  const storeLogin = useAuthStore((state) => state.login);
  return useMutation({
    mutationFn: (req: LoginPayload) => loginUser(req),
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.data;
      setTokens(accessToken, refreshToken);
      storeLogin(accessToken);
      onSuccess?.(data);
    },
    onError,
  });
};
