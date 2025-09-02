//임시, 추후 types 폴더 하위로 이동 예정

export interface Box {
  id: number;
  name: string;
  balance: string;
  boxName?: string;
  automaticTransfer?: boolean;
  monthlyAmount?: number;
  transferDay?: string;
  // MoneyBox API와의 호환성을 위한 추가 필드
  accountId?: number;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
  bucketListId?: number;
  bucketListTitle?: string;
  targetAmount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Transaction {
  date: string;
  type: string;
  amount: string;
  balance: string;
}

export interface MainAccount {
  name: string;
  number: string;
  balance: string;
}
