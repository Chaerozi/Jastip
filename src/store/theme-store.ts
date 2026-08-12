import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme } from '@/constants/theme';
import { THEME, STORAGE_KEYS } from '@/constants/theme';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: THEME.SYSTEM,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        const currentTheme = get().theme;
        const nextTheme =
          currentTheme === THEME.LIGHT
            ? THEME.DARK
            : currentTheme === THEME.DARK
              ? THEME.SYSTEM
              : THEME.LIGHT;
        set({ theme: nextTheme });
      },
    }),
    {
      name: STORAGE_KEYS.THEME,
    }
  )
);
