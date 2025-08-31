import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createAlbumPost,
  updateAlbumPost,
  deleteAlbumPost,
  uploadAlbumImage,
} from '@/features/album/apis/albumApi';
import { albumQK } from './useAlbums';
import type { UpdateAlbumRequest } from '@/features/album/apis/albumApi';

export function useCreateAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAlbumPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: albumQK.all });
    },
  });
}

export function useUpdateAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      photoId,
      data,
    }: {
      photoId: number;
      data: UpdateAlbumRequest;
    }) => updateAlbumPost(photoId, data),
    onSuccess: (_, { photoId }) => {
      queryClient.invalidateQueries({ queryKey: albumQK.post(photoId) });
      queryClient.invalidateQueries({ queryKey: albumQK.all });
    },
  });
}

export function useDeleteAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAlbumPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: albumQK.all });
    },
  });
}

export function useUploadImage() {
  return useMutation({
    mutationFn: uploadAlbumImage,
  });
}
