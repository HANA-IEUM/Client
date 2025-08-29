import type { LoginPayload, LoginResponse } from '@/types/auth.ts';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/features/auth/apis/auth';
import { setTokens } from '@/lib/token.ts';

export const useLogin = (
  onSuccess?: (data: LoginResponse) => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: (req: LoginPayload) => loginUser(req),
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.data;
      if (accessToken && refreshToken) {
        setTokens(accessToken, refreshToken);
      }
      onSuccess?.(data);
    },
    onError,
  });
};
