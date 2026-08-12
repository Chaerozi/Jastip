'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks';
import { ROUTES } from '@/constants/routes';
import { PageLoader } from '@/components/shared';

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export function AuthGuard({ children, redirectTo = ROUTES.AUTH.LOGIN }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const callbackUrl = encodeURIComponent(pathname ?? '/');
      router.push(`${redirectTo}?callbackUrl=${callbackUrl}`);
    }
  }, [isLoading, isAuthenticated, router, redirectTo, pathname]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

interface GuestGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export function GuestGuard({ children, redirectTo = ROUTES.HOME }: GuestGuardProps) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return fallback ?? <PageLoader />;
  }

  if (!isAuthenticated) {
    return fallback ?? null;
  }

  return <>{children}</>;
}
