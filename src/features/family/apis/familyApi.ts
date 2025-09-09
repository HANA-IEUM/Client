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
  publicFlag: boolean;
  togetherFlag: boolean;
  status: 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
  participants: Participant[];
  targetDate: string;
}

export interface MemberBucketListResponse {
  code: number;
  status: string;
  message: string;
  data: MemberBucketListItem[];
}

export interface FamilyBucketDetail {
  title: string;
  targetAmount: number;
  targetDate: string;
  togetherFlag: boolean;
  bucketListStatus: 'IN_PROGRESS' | 'COMPLETED';
  participants: Participant[];
}

export interface FamilyBucketDetailResponse {
  code: number;
  status: string;
  message: string;
  data: FamilyBucketDetail;
}

export async function fetchMemberBucketLists(
  memberId: string,
  filter: string = 'IN_PROGRESS'
): Promise<MemberBucketListItem[]> {
  let endpoint: string;

  if (filter === 'IN_PROGRESS') {
    endpoint = `/bucket-lists/group/${memberId}/in-progress`;
  } else if (filter === 'COMPLETED') {
    endpoint = `/bucket-lists/group/${memberId}/completed`;
  } else {
    endpoint = `/bucket-lists/group/${memberId}/in-progress`;
  }

  const res = await api.get<MemberBucketListResponse>(endpoint);
  return res.data.data || [];
}

export async function fetchFamilyBucketDetail(
  bucketListId: string
): Promise<FamilyBucketDetail> {
  const res = await api.get<FamilyBucketDetailResponse>(
    `/bucket-lists/group/${bucketListId}`
  );
  return res.data.data;
}
