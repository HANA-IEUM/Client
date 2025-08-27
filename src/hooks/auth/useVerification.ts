import { useMutation } from '@tanstack/react-query';
import { verificationPhoneNumber } from '@/service/auth.tsx';
import type { VerificationPayload } from '@/types/auth.ts';

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
