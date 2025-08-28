import { api } from '@/lib/axios';
import type { MainAccount } from '@/types/account';

export async function fetchMainAccount(): Promise<MainAccount | null> {
  const res = await api.get('/accounts/main');
  return (res.data?.data ?? null) as MainAccount | null;
}
