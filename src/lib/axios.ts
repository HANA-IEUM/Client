import axios, { type InternalAxiosRequestConfig } from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from '@/lib/token';
import { refreshToken as refreshTokenAPI } from '@/features/auth/apis/auth';

let isRefreshing = false;
let failedQueue: ((token: string) => void)[] = [];

const processQueue = (token: string) => {
  failedQueue.forEach((callback) => callback(token));
  failedQueue = [];
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  withCredentials: true,
  timeout: 10000,
});

//인터셉터: 모든 요청에 Access Token 추가
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//인터셉터: 403 에러 발생 시 Access Token을 재발급하고, 원래 요청 재시도
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedQueue.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const currentRefreshToken = getRefreshToken();
        if (!currentRefreshToken) {
          // 재발급에 사용할 토큰이 없으면 로그인 페이지로 보냅니다.
          clearTokens();
          window.location.href = '/login';
          return Promise.reject(error);
        }
        const response = await refreshTokenAPI({
          refreshToken: currentRefreshToken,
        });
        const { accessToken, refreshToken } = response.data;
        setTokens(accessToken, refreshToken);

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        processQueue(accessToken);

        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
