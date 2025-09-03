import { useQuery } from '@tanstack/react-query';

import type { SupportHistory } from '@/types/supportHistory';

import { fetchSupportHistory } from '../apis/support';

export const supportQK = {
  history: (bucketListId: number) =>
    ['support', 'history', bucketListId] as const,
};

export function useSupportHistory(bucketListId: number) {
  return useQuery<SupportHistory[]>({
    queryKey: supportQK.history(bucketListId),
    queryFn: () => fetchSupportHistory(bucketListId),
    enabled: !!bucketListId,
    staleTime: 1000 * 60 * 5,
  });
}
