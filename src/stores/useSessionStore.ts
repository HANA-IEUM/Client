import { create } from 'zustand';

type SessionState = {
  expired: boolean;
  message: string;
  openModal: (message: string) => void;
  closeModal: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  expired: false,
  message: '',
  openModal: (message) => set({ expired: true, message }),
  closeModal: () => set({ expired: false, message: '' }),
}));
