export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export type Theme = (typeof THEME)[keyof typeof THEME];

export const THEMES: Theme[] = [THEME.LIGHT, THEME.DARK, THEME.SYSTEM];

export const THEME_LABELS: Record<Theme, string> = {
  light: 'Terang',
  dark: 'Gelap',
  system: 'Ikuti Sistem',
};

export const THEME_ICONS: Record<Theme, string> = {
  light: 'Sun',
  dark: 'Moon',
  system: 'Monitor',
};

export const STORAGE_KEYS = {
  THEME: 'kitorang-theme',
  SIDEBAR_STATE: 'kitorang-sidebar',
  CART: 'kitorang-cart',
  AUTH_TOKEN: 'kitorang-auth-token',
  RECENTLY_VIEWED: 'kitorang-recently-viewed',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
