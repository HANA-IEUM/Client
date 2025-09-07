import { useQuery } from '@tanstack/react-query';

import { fetchAllAlbums, fetchMemberAlbums } from '../apis/albumApi';
import type { AlbumResponse } from '../apis/albumApi';

export const albumQK = {
  all: ['albums', 'all'] as const,
  member: (memberId: number) => ['albums', 'member', memberId] as const,
  post: (photoId: number) => ['albums', 'post', photoId] as const,
};

export function useAlbums(options?: { enabled?: boolean }) {
  return useQuery<AlbumResponse>({
    queryKey: albumQK.all,
    queryFn: fetchAllAlbums,
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnWindowFocus: false,
    ...options,
  });
}

export function useMemberAlbums(
  memberId: number,
  options?: { enabled?: boolean }
) {
  return useQuery<AlbumResponse>({
    queryKey: albumQK.member(memberId),
    queryFn: () => fetchMemberAlbums(memberId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!memberId,
    ...options,
  });
}
