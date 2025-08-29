import { useQuery } from '@tanstack/react-query';
import { fetchMainAccount } from '../apis/accountApi';
import type { MainAccount } from '@/types/account';

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

// export function useHasMainAccount(options?: { enabled?: boolean }) {
//   const q = useMainAccount(options);
//   return { ...q, data: Boolean(q.data) };
// }
