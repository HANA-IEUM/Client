import { useMutation } from '@tanstack/react-query';
import type { VerificationConfirmPayload } from '@/types/auth.ts';
import { verificationPhoneNumberConfirm } from '@/features/auth/apis/auth';

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
