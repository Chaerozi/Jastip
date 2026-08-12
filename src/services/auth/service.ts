import { AxiosInstance } from 'axios';
import { apiClient } from '@/lib/axios';
import { LoginCredentials, RegisterData, AuthTokens, User } from '@/types/user';
import { ApiResponse } from '@/types/api';

const AUTH_KEY = 'kitorang-auth-token';
const REFRESH_KEY = 'kitorang-refresh-token';
const USER_KEY = 'kitorang-user';

class AuthService {
  private client: AxiosInstance;

  constructor() {
    this.client = apiClient;
  }

  // Token management
  setAccessToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, token);
    }
  }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_KEY);
    }
    return null;
  }

  setRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(REFRESH_KEY, token);
    }
  }

  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(REFRESH_KEY);
    }
    return null;
  }

  setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // API methods (placeholders for backend integration)
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthTokens & { user: User }>> {
    // TODO: Replace with actual API call
    // return this.client.post('/auth/login', credentials);
    throw new Error('API not implemented');
  }

  async register(data: RegisterData): Promise<ApiResponse<{ user: User; message: string }>> {
    // TODO: Replace with actual API call
    // return this.client.post('/auth/register', data);
    throw new Error('API not implemented');
  }

  async logout(): Promise<void> {
    // TODO: Replace with actual API call
    // await this.client.post('/auth/logout');
    this.clearTokens();
  }

  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    // TODO: Replace with actual API call
    // return this.client.post('/auth/forgot-password', { email });
    throw new Error('API not implemented');
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse<{ message: string }>> {
    // TODO: Replace with actual API call
    // return this.client.post('/auth/reset-password', { token, password });
    throw new Error('API not implemented');
  }

  async verifyEmail(token: string): Promise<ApiResponse<{ message: string }>> {
    // TODO: Replace with actual API call
    // return this.client.post('/auth/verify-email', { token });
    throw new Error('API not implemented');
  }

  async resendVerification(email: string): Promise<ApiResponse<{ message: string }>> {
    // TODO: Replace with actual API call
    // return this.client.post('/auth/resend-verification', { email });
    throw new Error('API not implemented');
  }

  async refreshToken(): Promise<ApiResponse<AuthTokens>> {
    // TODO: Replace with actual API call
    // const refreshToken = this.getRefreshToken();
    // return this.client.post('/auth/refresh', { refreshToken });
    throw new Error('API not implemented');
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    // TODO: Replace with actual API call
    // return this.client.get('/auth/me');
    throw new Error('API not implemented');
  }
}

export const authService = new AuthService();
