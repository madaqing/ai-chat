import request from '../utils/request';
import type { RegisterParams, AuthResponse,LoginParams } from '../types/auth';

// 注册接口
export const authApi = {
  async register(data: RegisterParams): Promise<AuthResponse> {
    return request.post('/auth/register', data);
  },

  async login(data: LoginParams):Promise<AuthResponse> { 
    return request.post('/auth/login', data);
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return request.post('/auth/refresh', { refreshToken });
  }
};