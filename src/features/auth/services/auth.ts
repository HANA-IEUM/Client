import { api } from '@/lib/axios.ts';
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RefreshPayload,
  VerificationPayload,
  VerificationConfirmPayload,
} from '@/types/auth.ts';

export const registerUser = async (payload: RegisterPayload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const loginUser = async (payload: LoginPayload) => {
  const { data } = await api.post<LoginResponse>('/auth/login', payload);
  return data;
};

export const refreshToken = async (payload: RefreshPayload) => {
  const { data } = await api.post<LoginResponse>('/auth/refresh', payload);
  return data;
};

export const verificationPhoneNumber = async (payload: VerificationPayload) => {
  const { data } = await api.post('/verification/send', payload);
  return data;
};

export const verificationPhoneNumberConfirm = async (
  payload: VerificationConfirmPayload
) => {
  const { data } = await api.post('/verification/confirm', payload);
  return data;
};
