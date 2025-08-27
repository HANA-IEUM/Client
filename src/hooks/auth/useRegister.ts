import { useMutation } from '@tanstack/react-query';
import type { RegisterPayload } from '@/types/auth.ts';
import { registerUser } from '@/services/auth.ts';

export const useRegister = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: (form: RegisterPayload) => registerUser(form),
    onSuccess,
    onError,
  });
};
