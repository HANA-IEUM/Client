import type { LoginPayload, LoginResponse } from '@/types/auth.ts';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/service/auth.tsx';

export const useLogin = (
  onSuccess?: (data: LoginResponse) => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: (req: LoginPayload) => loginUser(req),
    onSuccess,
    onError,
  });
};
