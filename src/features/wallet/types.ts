//임시, 추후 types 폴더 하위로 이동 예정

export interface Box {
  id: number;
  name: string;
  balance: string;
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
