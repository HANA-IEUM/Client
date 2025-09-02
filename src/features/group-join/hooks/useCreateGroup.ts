import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { GroupInfo } from '@/types/group';

import { groupQK } from './useGroupInfo';
import { createGroup } from '../apis/groupApi';

export function useCreateGroup() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (groupName: string) => createGroup(groupName),
    onSuccess: (data: GroupInfo) => {
      qc.setQueryData(groupQK.info, data);
    },
  });
}
