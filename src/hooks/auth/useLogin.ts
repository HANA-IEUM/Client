import type { LoginPayload, LoginResponse } from '@/types/auth.ts';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/services/auth.ts';
import { setTokens } from '@/lib/token.ts';

export const useLogin = (
  onSuccess?: (data: LoginResponse) => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: (req: LoginPayload) => loginUser(req),
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data.data;
      if (accessToken && refreshToken) {
        setTokens(accessToken, refreshToken);
      }
      onSuccess?.(response.data);
    },
    onError,
  });
};
