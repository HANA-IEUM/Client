import { api } from '@/lib/axios';

export interface MainAccount {
  accountId: number;
  accountNumber: string;
  accountName: string;
  bankName: string;
  balance: number;
  accountType: string;
  mainAccountLinked: boolean;
}

export interface MainAccountResponse {
  status: string;
  message: string;
  data: MainAccount;
  code: number;
}

export interface MoneyBox {
  accountId: number;
  accountNumber: string;
  accountName: string;
  bankName: string;
  balance: number;
  bucketListId: number;
  bucketListTitle: string;
  targetAmount: number;
  boxName: string;
  createdAt: string;
  updatedAt: string;
}

export interface MoneyBoxResponse {
  status: string;
  message: string;
  data: MoneyBox[];
  code: number;
}

export async function fetchMainAccount(): Promise<MainAccount | null> {
  const res = await api.get<MainAccountResponse>('/accounts/main');
  return (res.data?.data ?? null) as MainAccount | null;
}

export async function fetchMoneyBoxes(): Promise<MoneyBox[]> {
  const res = await api.get<MoneyBoxResponse>('/money-box');
  return (res.data?.data ?? []) as MoneyBox[];
}

export interface Transaction {
  transactionId: number;
  date: string;
  transactionType: 'TRANSFER' | 'DEPOSIT' | 'WITHDRAWAL';
  counterpartyName: string;
  description: string;
  amount: number;
  balanceAfter: number;
}

export interface TransactionPageable {
  offset: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

export interface TransactionSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface TransactionResponse {
  code: number;
  status: string;
  message: string;
  data: {
    totalElements: number;
    totalPages: number;
    size: number;
    content: Transaction[];
    number: number;
    sort: TransactionSort;
    numberOfElements: number;
    pageable: TransactionPageable;
    first: boolean;
    last: boolean;
    empty: boolean;
  };
}

export async function fetchAccountTransactions(
  accountId: number,
  page: number = 0,
  size: number = 20
): Promise<TransactionResponse['data']> {
  const res = await api.get<TransactionResponse>(
    `/accounts/${accountId}/transactions`,
    {
      params: { page, size },
    }
  );
  return res.data.data;
}

export interface MoneyBoxInfo {
  boxId: number;
  boxName: string;
  balance: number;
  nextTransferDay: number | null;
  nextTransferAmount: number | null;
  bucketId: number;
  bucketTitle: string;
}

export interface MoneyBoxInfoResponse {
  status: string;
  message: string;
  data: MoneyBoxInfo;
  code: number;
}

export async function fetchMoneyBoxInfo(
  boxId: number
): Promise<MoneyBoxInfo | null> {
  const res = await api.get<MoneyBoxInfoResponse>(`/money-box/${boxId}/info`);
  return (res.data?.data ?? null) as MoneyBoxInfo | null;
}
