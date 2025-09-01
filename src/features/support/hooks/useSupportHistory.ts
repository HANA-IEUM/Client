import { useQuery } from '@tanstack/react-query';
import { fetchSupportHistory } from '../apis/support';
import type { SupportHistory } from '@/types/supportHistory';

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
