import { api } from '@/lib/axios';

interface MonthlyLivingCostResponse {
  data: {
    monthlyLivingCost: number;
  };
}

export const fetchMonthlyLivingCost = async (): Promise<number> => {
  const { data } = await api.get<MonthlyLivingCostResponse>(
    '/members/monthly-living-cost'
  );
  return data.data.monthlyLivingCost;
};
