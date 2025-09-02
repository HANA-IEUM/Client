import { useMutation } from '@tanstack/react-query';

import { verificationPhoneNumberConfirm } from '@/features/auth/apis/auth';
import type { VerificationConfirmPayload } from '@/types/auth.ts';

export const useVerificationConfirm = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: (form: VerificationConfirmPayload) =>
      verificationPhoneNumberConfirm(form),
    onSuccess,
    onError,
  });
};
