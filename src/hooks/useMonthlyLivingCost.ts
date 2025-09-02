import { useQuery } from '@tanstack/react-query';

import { fetchMonthlyLivingCost } from '@/apis/memberApis.ts';

export const memberQK = {
  all: ['members'] as const,
  livingCost: () => [...memberQK.all, 'living-cost'] as const,
};

export const useMonthlyLivingCost = () => {
  return useQuery({
    queryKey: memberQK.livingCost(),
    queryFn: fetchMonthlyLivingCost,
  });
};
