import request from '../utils/request';
import type { RegisterParams, AuthResponse } from '../types/auth';

// 注册接口
export const authApi = {
  async register(data: RegisterParams): Promise<AuthResponse> {
    return request.post('/auth/register', data);
  },

  // 以后可以加 login、logout 等
  async login(data: { username: string; password: string }) {
    return request.post('/auth/login', data);
  }
};