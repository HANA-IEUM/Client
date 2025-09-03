import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  fetchMainAccount,
  fetchMoneyBoxes,
  fetchAccountTransactions,
  fetchMoneyBoxInfo,
  fetchMoneyBoxEditInfo,
  updateMoneyBox,
  type MoneyBoxEditRequest,
  fillMoneyBox,
  type FillMoneyBoxRequest,
} from '@/features/wallet/apis/walletApi';

export const walletQK = {
  mainAccount: ['wallet', 'mainAccount'] as const,
  moneyBoxes: ['wallet', 'moneyBoxes'] as const,
  accountTransactions: (accountId: number, page: number, size: number) =>
    ['wallet', 'accountTransactions', accountId, page, size] as const,
  moneyBoxInfo: (boxId: number) => ['wallet', 'moneyBoxInfo', boxId] as const,
  moneyBoxEditInfo: (boxId: number) =>
    ['wallet', 'moneyBoxEditInfo', boxId] as const,
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
    refetchOnWindowFocus: true,
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

export function useMoneyBoxEditInfo(boxId: number) {
  return useQuery({
    queryKey: walletQK.moneyBoxEditInfo(boxId),
    queryFn: () => fetchMoneyBoxEditInfo(boxId),
    staleTime: 1000 * 60 * 3, // 3분
    refetchOnWindowFocus: false,
    enabled: !!boxId,
  });
}

export function useUpdateMoneyBox() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      accountId,
      editData,
    }: {
      accountId: number;
      editData: MoneyBoxEditRequest;
    }) => updateMoneyBox(accountId, editData),
    onSuccess: () => {
      // 박스 정보 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['wallet', 'moneyBoxes'] });
      queryClient.invalidateQueries({ queryKey: ['wallet', 'moneyBoxInfo'] });
      queryClient.invalidateQueries({
        queryKey: ['wallet', 'moneyBoxEditInfo'],
      });
    },
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

export function useFillMoneyBox() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: FillMoneyBoxRequest) => fillMoneyBox(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: walletQK.moneyBoxes });
      queryClient.invalidateQueries({ queryKey: ['wallet', 'moneyBoxInfo'] });
      queryClient.invalidateQueries({ queryKey: walletQK.mainAccount });
    },
  });
}
