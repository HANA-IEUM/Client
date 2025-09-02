import { useQuery } from '@tanstack/react-query';

import type { MainAccount } from '@/types/account';

import { fetchMainAccount } from '../apis/accountApi';

export function useMainAccountLinked() {
  const { data, isLoading, isError } = useQuery<MainAccount | null>({
    queryKey: ['mainAccount'],
    queryFn: fetchMainAccount,
  });

  const isLinked = data?.mainAccountLinked ?? false;

  return { isLinked, isLoading, isError };
}
