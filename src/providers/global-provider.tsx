'use client';

import { type ReactNode } from 'react';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';
import { ToastProvider } from './toast-provider';

interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps): JSX.Element {
  return (
    <QueryProvider>
      <ThemeProvider>
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
