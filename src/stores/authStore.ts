import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { decodeAccessToken, type DecodedToken } from '@/lib/jwt.ts';
import { clearTokens } from '@/lib/token.ts';

interface AuthState {
  user: DecodedToken | null;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (accessToken: string) => {
        const decodedUser = decodeAccessToken();
        set({ user: decodedUser, isAuthenticated: !!decodedUser });
      },
      logout: () => {
        clearTokens();
        set({ user: null, isAuthenticated: false });
      },
      initialize: () => {
        const decodedUser = decodeAccessToken();
        if (decodedUser) {
          set({ user: decodedUser, isAuthenticated: true });
        }
      },
    }),
    { name: 'AuthStore' }
  )
);

useAuthStore.getState().initialize();
