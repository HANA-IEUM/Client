import { useQuery } from '@tanstack/react-query';
import { fetchSupportDetail } from '../apis/support';
import type { SupportHistory } from '@/types/supportHistory';

export const supportQK = {
  detail: (supportId: number) => ['support', 'detail', supportId] as const,
};

export function useSupportDetail(supportId: number) {
  return useQuery<SupportHistory>({
    queryKey: supportQK.detail(supportId),
    queryFn: () => fetchSupportDetail(supportId),
    enabled: !!supportId,
    staleTime: 1000 * 60 * 3,
  });
}
