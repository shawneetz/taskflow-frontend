import { useAuthStore } from '@/store/auth.store'
import { authApi } from '@/api/auth.api'
import type { LoginRequest, RegisterRequest } from '@/types/auth.types'

export function useAuth() {
  const { setTokens, setUser, logout } = useAuthStore()

  const login = async (data: LoginRequest) => {
    const { data: tokens } = await authApi.login(data)
    setTokens(tokens.access_token, tokens.refresh_token!)
    const { data: user } = await authApi.getMe()
    setUser(user)
  }

  const register = async (data: RegisterRequest) => {
    await authApi.register(data)
    await login({ email: data.email, password: data.password })
  }

  return { login, register, logout }
}
