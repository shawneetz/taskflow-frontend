import api from './axios'
import type { LoginRequest, RegisterRequest, TokenResponse, UserRead } from '@/types/auth.types'

export const authApi = {
  register: (data: RegisterRequest) => api.post<UserRead>('/auth/register', data),
  login: (data: LoginRequest) => api.post<TokenResponse>('/auth/login', data),
  refresh: (refresh_token: string) => api.post<TokenResponse>('/auth/refresh', { refresh_token }),
  getMe: () => api.get<UserRead>('/users/me'),
}
