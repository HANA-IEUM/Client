import { api } from '@/lib/axios';
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RefreshPayload,
} from '@/types/auth';

export const registerUser = (payload: RegisterPayload) => {
  return api.post('/auth/register', payload);
};

export const loginUser = (payload: LoginPayload) => {
  return api.post<LoginResponse>('/auth/login', payload);
};

export const refreshToken = (payload: RefreshPayload) => {
  return api.post<LoginResponse>('/auth/refresh', payload);
};
