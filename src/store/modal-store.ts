import { create } from 'zustand';

interface ModalState {
  modals: Record<string, { isOpen: boolean; data?: unknown }>;
  openModal: (id: string, data?: unknown) => void;
  closeModal: (id: string) => void;
  toggleModal: (id: string, data?: unknown) => void;
  isModalOpen: (id: string) => boolean;
  getModalData: <T>(id: string) => T | undefined;
  closeAllModals: () => void;
}

export const useModalStore = create<ModalState>()((set, get) => ({
  modals: {},
  openModal: (id, data) =>
    set((state) => ({
      modals: { ...state.modals, [id]: { isOpen: true, data } },
    })),
  closeModal: (id) =>
    set((state) => ({
      modals: { ...state.modals, [id]: { isOpen: false, data: undefined } },
    })),
  toggleModal: (id, data) => {
    const current = get().modals[id];
    set((state) => ({
      modals: { ...state.modals, [id]: { isOpen: !current?.isOpen, data } },
    }));
  },
  isModalOpen: (id) => get().modals[id]?.isOpen ?? false,
  getModalData: <T>(id: string): T | undefined => get().modals[id]?.data as T | undefined,
  closeAllModals: () => {
    const modals = { ...get().modals };
    Object.keys(modals).forEach((key) => {
      modals[key] = { isOpen: false, data: undefined };
    });
    set({ modals });
  },
}));
