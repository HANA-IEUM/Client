export interface RegisterPayload {
  phoneNumber: string;
  password: string;
  name: string;
  birthDate: string;
  gender: string;
  monthlyLivingCost: number;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    hideGroupPrompt: boolean;
    mainAccountLinked: boolean;
  };
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

export interface RefreshPayload {
  refreshToken: string;
}
