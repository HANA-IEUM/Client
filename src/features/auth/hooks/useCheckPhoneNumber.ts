import { useMutation } from '@tanstack/react-query';

import type {
  CheckPhoneNumberResponse,
  PhoneNumberPayload,
} from '@/types/auth';

import { checkPhoneNumber } from '../apis/auth';

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
