import { api } from '@/lib/axios';
import type {
  RegisterPayload,
  LoginPayload,
  LoginResponse,
  VerificationPayload,
  VerificationConfirmPayload,
} from '@/types/auth';

// 회원가입을 요청 API 함수
export const registerUser = async (
  payload: RegisterPayload
): Promise<LoginResponse> => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

//로그인을 요청 API 함수
export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

//인증번호 요청 API 함수
export const verificationPhoneNumber = async (payload: VerificationPayload) => {
  const { data } = await api.post('/verification/send', payload);
  return data;
};

//인증번호 제출 API 함수
export const verificationPhoneNumberConfirm = async (
  payload: VerificationConfirmPayload
) => {
  const { data } = await api.post('/verification/confirm', payload);
  return data;
};
