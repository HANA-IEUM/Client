import { api } from '@/lib/axios';
import type { GroupInfo } from '@/types/group';

export async function fetchGroupInfo(): Promise<GroupInfo | null> {
  const res = await api.get('/groups/info');
  return (res.data?.data ?? null) as GroupInfo | null;
}

export async function joinGroup(inviteCode: string): Promise<GroupInfo> {
  const res = await api.post('/groups/join', { inviteCode });
  return res.data.data as GroupInfo;
}

export async function createGroup(groupName: string): Promise<GroupInfo> {
  const res = await api.post('/groups', { groupName });
  return res.data?.data as GroupInfo;
}
