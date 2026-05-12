// src/utils/request.ts
import axios from 'axios';
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useSessionStore } from '../store/sessionStore';

// 给 config 扩展 _retry 属性
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

// 创建实例
const service: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从 zustand 取 token，不是直接从 localStorage
    const token = useSessionStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 + 自动刷新 Token（核心）
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error: unknown) => {
    if (!axios.isAxiosError(error) || !error.config || !error.response) {
      console.error('请求失败：', error);
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // 如果是 401 且 没有重试过
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const store = useSessionStore.getState();
      const refreshToken = store.refreshToken;

      // 没有 refreshToken 直接登出
      if (!refreshToken) {
        store.logout();
        return Promise.reject(error);
      }

      try {
        // 后端刷新 token 接口
        const res = await axios.post('http://localhost:3000/auth/refresh', {
          refreshToken,
        });

        const newToken = res.data.token;
        const newRefreshToken = res.data.refreshToken;

        // 更新到全局状态
        store.refreshTokenFn(newToken, newRefreshToken);

        // 用新 token 重新请求
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);

      } catch (err) {
        // 刷新失败 → 登出
        store.logout();
        return Promise.reject(err);
      }
    }

    console.error('请求失败：', error);
    return Promise.reject(error);
  }
);

export default service;