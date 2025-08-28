import { useMutation } from '@tanstack/react-query';
import type { VerificationPayload } from '@/types/auth.ts';
import { verificationPhoneNumber } from '@/features/auth/services/auth.ts';

export const useVerification = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: (form: VerificationPayload) => verificationPhoneNumber(form),
    onSuccess,
    onError,
  });
};
