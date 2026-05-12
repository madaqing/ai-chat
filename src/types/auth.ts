// 注册请求参数
export interface RegisterParams {
  username: string;
  email: string;
  password: string;
}
// 登录请求参数
export interface LoginParams {
  email: string;
  password: string;
}

// 用户信息
export interface User {
  id: string;
  username: string;
  email: string;
}

// 注册/登录成功返回
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}