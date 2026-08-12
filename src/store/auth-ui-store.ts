import { create } from 'zustand';

interface AuthUIState {
  // Password visibility
  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePasswordVisibility: () => void;
  toggleConfirmPasswordVisibility: () => void;

  // Remember me
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;

  // Loading states
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
  isForgotPasswordLoading: boolean;
  isResetPasswordLoading: boolean;
  setLoginLoading: (loading: boolean) => void;
  setRegisterLoading: (loading: boolean) => void;
  setForgotPasswordLoading: (loading: boolean) => void;
  setResetPasswordLoading: (loading: boolean) => void;

  // Auth modal
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;

  // Reset state
  reset: () => void;
}

const initialState = {
  showPassword: false,
  showConfirmPassword: false,
  rememberMe: false,
  isLoginLoading: false,
  isRegisterLoading: false,
  isForgotPasswordLoading: false,
  isResetPasswordLoading: false,
  isAuthModalOpen: false,
};

export const useAuthUIStore = create<AuthUIState>((set) => ({
  ...initialState,

  // Password visibility
  togglePasswordVisibility: () => set((state) => ({ showPassword: !state.showPassword })),
  toggleConfirmPasswordVisibility: () =>
    set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),

  // Remember me
  setRememberMe: (value: boolean) => set({ rememberMe: value }),

  // Loading states
  setLoginLoading: (loading: boolean) => set({ isLoginLoading: loading }),
  setRegisterLoading: (loading: boolean) => set({ isRegisterLoading: loading }),
  setForgotPasswordLoading: (loading: boolean) => set({ isForgotPasswordLoading: loading }),
  setResetPasswordLoading: (loading: boolean) => set({ isResetPasswordLoading: loading }),

  // Auth modal
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  // Reset
  reset: () => set(initialState),
}));
