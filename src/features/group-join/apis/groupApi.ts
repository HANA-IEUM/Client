import { api } from '@/lib/axios';
import type { GroupInfo } from '@/types/group';

// 토이용: envelope 타입 선언 없이 바로 꺼내서 캐스팅
export async function fetchGroupInfo(): Promise<GroupInfo | null> {
  const res = await api.get('/groups/info');
  return (res.data?.data ?? null) as GroupInfo | null; // 미참여 시 null
}
