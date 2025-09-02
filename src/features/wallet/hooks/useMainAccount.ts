import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  fetchMainAccount,
  fetchMoneyBoxes,
  fetchAccountTransactions,
  fetchMoneyBoxInfo,
} from '@/features/wallet/apis/walletApi';

export const walletQK = {
  mainAccount: ['wallet', 'mainAccount'] as const,
  moneyBoxes: ['wallet', 'moneyBoxes'] as const,
  accountTransactions: (accountId: number, page: number, size: number) =>
    ['wallet', 'accountTransactions', accountId, page, size] as const,
  moneyBoxInfo: (boxId: number) => ['wallet', 'moneyBoxInfo', boxId] as const,
};

export function useMainAccount() {
  return useQuery({
    queryKey: walletQK.mainAccount,
    queryFn: fetchMainAccount,
    staleTime: 1000 * 60 * 3, // 3분
    refetchOnWindowFocus: false,
  });
}

export function useMoneyBoxes() {
  return useQuery({
    queryKey: walletQK.moneyBoxes,
    queryFn: fetchMoneyBoxes,
    staleTime: 1000 * 60 * 3, // 3분
    refetchOnWindowFocus: false,
  });
}

export function useAccountTransactions(
  accountId: number,
  page: number = 0,
  size: number = 20
) {
  return useQuery({
    queryKey: walletQK.accountTransactions(accountId, page, size),
    queryFn: () => fetchAccountTransactions(accountId, page, size),
    staleTime: 1000 * 60 * 3, // 3분
    refetchOnWindowFocus: false,
    enabled: !!accountId,
  });
}

export function useMoneyBoxInfo(boxId: number) {
  return useQuery({
    queryKey: walletQK.moneyBoxInfo(boxId),
    queryFn: () => fetchMoneyBoxInfo(boxId),
    staleTime: 1000 * 60 * 3, // 3분
    refetchOnWindowFocus: false,
    enabled: !!boxId,
  });
}

export function useInfiniteAccountTransactions(
  accountId: number,
  pageSize: number = 20
) {
  return useInfiniteQuery({
    queryKey: walletQK.accountTransactions(accountId, 0, pageSize),
    queryFn: ({ pageParam = 0 }) => {
      return fetchAccountTransactions(accountId, pageParam, pageSize);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.last || lastPage.number >= lastPage.totalPages - 1) {
        return undefined;
      }
      return lastPage.number + 1;
    },
    staleTime: 1000 * 60 * 3, // 3분
    refetchOnWindowFocus: false,
    enabled: !!accountId,
  });
}
