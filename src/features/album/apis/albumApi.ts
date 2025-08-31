import { api } from '@/lib/axios';

export interface Member {
  memberId: number;
  name: string;
}

export interface Photo {
  photoId: number;
  name: string;
  imgUrl: string;
  caption: string;
  createdAt: string;
  mine: boolean;
}

export interface AlbumPost {
  photoId: number;
  name: string;
  imgUrl: string;
  caption: string;
  createdAt: string;
  mine: boolean;
}

export interface CreateAlbumRequest {
  imgUrl: string;
  caption: string;
}

export interface UpdateAlbumRequest {
  text: string;
}

export interface AlbumResponse {
  members: Member[];
  photos: Photo[];
}

// 게시물 조회
export async function fetchAlbumPost(photoId: number): Promise<AlbumPost> {
  const res = await api.get(`/album/${photoId}`);
  return res.data?.data as AlbumPost;
}

// 게시물 수정
export async function updateAlbumPost(
  photoId: number,
  data: UpdateAlbumRequest
): Promise<AlbumPost> {
  const res = await api.put(`/album/${photoId}`, data);
  return res.data?.data as AlbumPost;
}

// 게시물 삭제
export async function deleteAlbumPost(photoId: number): Promise<void> {
  await api.delete(`/album/${photoId}`);
}

// 앨범 전체 조회
export async function fetchAllAlbums(): Promise<AlbumResponse> {
  const res = await api.get('/album');
  return res.data?.data as AlbumResponse;
}

// 게시물 생성
export async function createAlbumPost(
  data: CreateAlbumRequest
): Promise<AlbumPost> {
  const res = await api.post('/album', data);
  return res.data?.data as AlbumPost;
}

// 사진 업로드
export async function uploadAlbumImage(
  imageFile: File
): Promise<{ imgUrl: string }> {
  const formData = new FormData();
  formData.append('image', imageFile);

  const res = await api.post('/album/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data?.data as { imgUrl: string };
}

// 멤버별 게시물 전체 조회
export async function fetchMemberAlbums(
  memberId: number
): Promise<AlbumResponse> {
  const res = await api.get(`/album/member/${memberId}`);
  return res.data?.data as AlbumResponse;
}
