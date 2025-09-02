import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMonthlyLivingCost } from '@/apis/memberApis.ts';

import { memberQK } from './useMonthlyLivingCost';

export const useUpdateMonthlyLivingCost = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { monthlyLivingCost: number }) =>
      updateMonthlyLivingCost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberQK.livingCost() });
      onSuccess?.();
    },
    onError,
  });
};
