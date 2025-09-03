import { api } from '@/lib/axios';

export interface Participant {
  memberId: number;
  memberName: string;
  joinedAt: string;
  isActive: boolean;
}

export interface MoneyBoxInfo {
  accountId: number;
  boxName: string;
  accountNumber: string;
  balance: number;
  hasMoneyBox: boolean;
}

export interface MemberBucketListItem {
  id: number;
  memberId: number;
  type: 'TRIP' | 'HOBBY' | 'HEALTH' | 'FAMILY';
  title: string;
  targetAmount: number;
  targetDate: string;
  publicFlag: boolean;
  togetherFlag: boolean;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'PARTICIPATING';
  createdAt: string;
  updatedAt: string;
  participants: Participant[];
  moneyBoxInfo: MoneyBoxInfo;
}

export interface MemberBucketListResponse {
  code: number;
  status: string;
  message: string;
  data: MemberBucketListItem[];
}

export async function fetchMemberBucketLists(
  memberId: string,
  filter: string = 'ALL'
): Promise<MemberBucketListItem[]> {
  const params: Record<string, string> = {};

  if (filter !== 'ALL') {
    params.status = filter;
  }

  const res = await api.get<MemberBucketListResponse>(
    `/bucket-lists/group/${memberId}`,
    {
      params,
    }
  );

  return res.data.data || [];
}
