import { useMutation, useQueryClient } from '@tanstack/react-query';
import { joinGroup } from '../apis/groupApi';
import { groupQK } from './useGroupInfo';
import type { GroupInfo } from '@/types/group';

export function useJoinGroup() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (inviteCode: string) => joinGroup(inviteCode),
    onSuccess: (data: GroupInfo) => {
      // 그룹 정보 캐시 갱신
      qc.setQueryData(groupQK.info, data);
    },
  });
}
