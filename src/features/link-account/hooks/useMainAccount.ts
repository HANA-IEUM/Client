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

// 필요 시: “주계좌가 있는가”만 boolean으로
export function useHasMainAccount(options?: { enabled?: boolean }) {
  const q = useMainAccount(options);
  return { ...q, data: Boolean(q.data) };
}
