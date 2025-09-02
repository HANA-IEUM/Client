import { api } from '@/lib/axios.ts';
import type {
  CheckPhoneNumberResponse,
  LoginPayload,
  LoginResponse,
  PhoneNumberPayload,
  RefreshPayload,
  RegisterPayload,
  VerificationConfirmPayload,
  VerificationPayload,
} from '@/types/auth.ts';

export const registerUser = async (payload: RegisterPayload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const loginUser = async (payload: LoginPayload) => {
  const { data } = await api.post<LoginResponse>('/auth/login', payload);
  return data as LoginResponse;
};

export const refreshToken = async (payload: RefreshPayload) => {
  const { data } = await api.post<LoginResponse>('/auth/refresh', payload);
  return data;
};

export const checkPhoneNumber = async (payload: PhoneNumberPayload) => {
  const { data } = await api.post<CheckPhoneNumberResponse>(
    '/auth/check-phone',
    payload
  );
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

export async function hideGroupPrompt(): Promise<void> {
  await api.put('/members/group-prompt/hide');
}

export const logoutUser = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};
