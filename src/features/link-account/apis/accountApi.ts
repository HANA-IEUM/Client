import { api } from '@/lib/axios';
import type { MainAccount } from '@/types/account'; // 타입을 따로 관리한다면 이걸 사용

export async function fetchMainAccount(): Promise<MainAccount | null> {
  const res = await api.get('/accounts/main');
  // 서버가 envelope({ data })로 주는 스펙 기준
  return (res.data?.data ?? null) as MainAccount | null;
}
