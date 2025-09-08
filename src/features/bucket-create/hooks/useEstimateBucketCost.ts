import { useMutation } from '@tanstack/react-query';

type EstimateResponse = {
  estimated_cost: number;
};

export function useEstimateBucketCost() {
  return useMutation({
    mutationFn: async (bucket: string): Promise<number> => {
      const res = await fetch(
        'https://deso6fk2qf.execute-api.us-east-1.amazonaws.com/default/estimate-bucket-cost',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bucket }),
        }
      );

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data: EstimateResponse = await res.json();
      return data.estimated_cost;
    },
  });
}
