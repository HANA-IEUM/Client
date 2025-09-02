import { useQuery } from '@tanstack/react-query';

import type { MainAccount } from '@/types/account';

import { fetchMainAccount } from '../apis/accountApi';

export const accountQK = {
  main: ['accounts', 'main'] as const,
};

export function useMainAccount(options?: { enabled?: boolean }) {
  return useQuery<MainAccount | null>({
    queryKey: accountQK.main,
    queryFn: fetchMainAccount,
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
    ...options,
  });
}
