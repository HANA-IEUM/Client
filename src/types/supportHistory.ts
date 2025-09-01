export type SupportType = 'CHEER' | 'SPONSOR';

export interface SupportHistory {
  id: number;
  bucketListId: number;
  bucketListTitle: string;
  supporterName: string;
  supportType: 'CHEER' | 'SPONSOR';
  supportAmount: number;
  message: string;
  letterColor: 'PINK' | 'BLUE' | 'GREEN';
  supportedAt: string;
}
