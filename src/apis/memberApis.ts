import { api } from '@/lib/axios.ts';

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

export const updateMonthlyLivingCost = async (payload: {
  monthlyLivingCost: number;
}) => {
  const { data } = await api.put('members/monthly-living-cost', payload);
  return data;
};
