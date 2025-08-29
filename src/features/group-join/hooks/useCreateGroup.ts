import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGroup } from '../apis/groupApi';
import { groupQK } from './useGroupInfo';
import type { GroupInfo } from '@/types/group';

export function useCreateGroup() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (groupName: string) => createGroup(groupName),
    onSuccess: (data: GroupInfo) => {
      qc.setQueryData(groupQK.info, data);
    },
  });
}
