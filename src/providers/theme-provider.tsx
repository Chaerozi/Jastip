'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { THEME } from '@/constants/theme';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = THEME.SYSTEM,
  storageKey = 'kitorang-theme',
}: ThemeProviderProps): JSX.Element {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
      storageKey={storageKey}
    >
      {children}
    </NextThemesProvider>
  );
}
