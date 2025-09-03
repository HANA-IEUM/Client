import { useMutation } from '@tanstack/react-query';

import { registerUser } from '@/features/auth/apis/auth';
import type { RegisterPayload } from '@/types/auth.ts';

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
