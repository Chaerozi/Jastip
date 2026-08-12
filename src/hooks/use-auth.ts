import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { LoginCredentials, RegisterData } from '@/types/user';
import { ROUTES } from '@/constants/routes';

// Hook for checking authentication status
export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(authService.getUser());

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        setUser(authService.getUser());
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const logout = useCallback(() => {
    authService.clearTokens();
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return {
    isLoading,
    isAuthenticated,
    user,
    logout,
  };
}

// Hook for login mutation
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      return authService.login(credentials);
    },
    onSuccess: (data) => {
      if (data.data) {
        authService.setAccessToken(data.data.accessToken);
        authService.setRefreshToken(data.data.refreshToken);
        authService.setUser(data.data.user);
        queryClient.invalidateQueries({ queryKey: ['auth'] });
        router.push(ROUTES.HOME);
      }
    },
  });
}

// Hook for register mutation
export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      return authService.register(data);
    },
    onSuccess: () => {
      router.push(ROUTES.AUTH.VERIFY_EMAIL);
    },
  });
}

// Hook for logout
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await authService.logout();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      queryClient.clear();
      router.push(ROUTES.AUTH.LOGIN);
    },
  });
}

// Hook for forgot password
export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      return authService.forgotPassword(email);
    },
  });
}

// Hook for reset password
export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ token, password }: { token: string; password: string }) => {
      return authService.resetPassword(token, password);
    },
    onSuccess: () => {
      router.push(ROUTES.AUTH.LOGIN);
    },
  });
}

// Hook for email verification
export function useVerifyEmail() {
  return useMutation({
    mutationFn: async (token: string) => {
      return authService.verifyEmail(token);
    },
  });
}

// Hook for resending verification email
export function useResendVerification() {
  return useMutation({
    mutationFn: async (email: string) => {
      return authService.resendVerification(email);
    },
  });
}
