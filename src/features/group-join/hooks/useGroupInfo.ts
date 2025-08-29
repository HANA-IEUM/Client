import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchGroupInfo } from '../apis/groupApi';
import type { GroupInfo } from '@/types/group';

export const groupQK = {
  info: ['group', 'info'] as const,
};

export function useGroupInfo() {
  return useQuery<GroupInfo | null>({
    queryKey: groupQK.info,
    queryFn: fetchGroupInfo,
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
  });
}

export function useIsInGroup() {
  const q = useGroupInfo();
  return { ...q, data: Boolean(q.data) };
}

export function useInvalidateGroupInfo() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: groupQK.info });
}
