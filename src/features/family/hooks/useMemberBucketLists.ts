import { useQuery } from '@tanstack/react-query';
import {
  fetchMemberBucketLists,
  type MemberBucketListItem,
} from '@/features/family/apis/familyApi';

export const memberBucketListQK = {
  all: ['member-bucket-lists'] as const,
  lists: () => [...memberBucketListQK.all, 'list'] as const,
  list: (memberId: string, filter: string) =>
    [...memberBucketListQK.lists(), memberId, filter] as const,
};

export function useMemberBucketLists(memberId: string, filter: string) {
  return useQuery<MemberBucketListItem[]>({
    queryKey: memberBucketListQK.list(memberId, filter),
    queryFn: () => fetchMemberBucketLists(memberId, filter),
    enabled: !!memberId, // memberId가 있을 때만 API 호출
    staleTime: 1000 * 60 * 3, // 3분
    refetchOnWindowFocus: false,
  });
}
