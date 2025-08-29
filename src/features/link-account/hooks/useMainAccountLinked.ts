import { useQuery } from '@tanstack/react-query';
import { fetchMainAccount } from '../apis/accountApi';
import type { MainAccount } from '@/types/account';

export function useMainAccountLinked() {
  const { data, isLoading, isError } = useQuery<MainAccount | null>({
    queryKey: ['mainAccount'],
    queryFn: fetchMainAccount,
  });

  const isLinked = data?.mainAccountLinked ?? false;

  return { isLinked, isLoading, isError };
}
