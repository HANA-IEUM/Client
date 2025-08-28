import { api } from '@/lib/axios';
import type { MainAccount } from '@/types/account';

export async function fetchMainAccount(): Promise<MainAccount | null> {
  const res = await api.get('/accounts/main');
  return (res.data?.data ?? null) as MainAccount | null;
}

export async function linkMainAccount(): Promise<string> {
  const res = await api.put('/members/main-account/link');
  return (res.data?.data ?? 'OK') as string;
}
