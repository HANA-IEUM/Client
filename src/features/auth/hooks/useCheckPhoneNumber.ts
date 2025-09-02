import { useMutation } from '@tanstack/react-query';
import { checkPhoneNumber } from '../apis/auth';
import type {
  CheckPhoneNumberResponse,
  PhoneNumberPayload,
} from '@/types/auth';

export const useCheckPhoneNumber = (
  onSuccess?: (data: CheckPhoneNumberResponse) => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: (payload: PhoneNumberPayload) => checkPhoneNumber(payload),
    onSuccess,
    onError,
  });
};
