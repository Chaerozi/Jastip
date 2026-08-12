import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/constants/theme';

interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      isOpen: true,
      isCollapsed: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
      toggleCollapsed: () => set({ isCollapsed: !get().isCollapsed }),
    }),
    {
      name: STORAGE_KEYS.SIDEBAR_STATE,
    }
  )
);
