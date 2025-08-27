export interface RegisterPayload {
  phoneNumber: string;
  password: string;
  name: string;
  birthDate: string;
  gender: string;
  monthlyLivingCost: number;
}

export interface LoginResponse {
  data: string;
}

export interface LoginPayload {
  phoneNumber: string;
  password: string;
}

export interface VerificationPayload {
  to: string;
}

export interface VerificationConfirmPayload {
  to: string;
  verificationCode: string;
}
