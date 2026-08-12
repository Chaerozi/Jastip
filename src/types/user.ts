import type { UserRole } from '@/constants/roles';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  avatar: string | null;
  role: UserRole;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  displayName: string | null;
  bio: string | null;
  avatar: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  gender: 'male' | 'female' | 'other' | null;
  user: User;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  recipientName: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  subdistrict: string;
  postalCode: string;
  streetAddress: string;
  notes: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserWithProfile extends User {
  profile: UserProfile | null;
  addresses: Address[];
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone?: string;
  role?: UserRole;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
