import { jwtDecode } from 'jwt-decode';

import { getAccessToken } from './token';

export interface DecodedToken {
  sub: string; // 사용자 ID
  name: string; // 사용자 이름
  phoneNumber: string; // 전화번호
  iat: number; // 발급 시간
  exp: number; // 만료 시간
}

export const decodeAccessToken = (): DecodedToken | null => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    return null;
  }
};
