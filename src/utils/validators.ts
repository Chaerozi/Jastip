import { z } from 'zod';

export const emailSchema = z.string().email('Email tidak valid');

export const passwordSchema = z
  .string()
  .min(8, 'Password minimal 8 karakter')
  .regex(/[A-Z]/, 'Password harus mengandung huruf besar')
  .regex(/[a-z]/, 'Password harus mengandung huruf kecil')
  .regex(/\d/, 'Password harus mengandung angka');

export const phoneSchema = z
  .string()
  .regex(/^(\+62|62|0)8[1-9][0-9]{7,10}$/, 'Nomor telepon tidak valid');

export const indonesiaPhoneNumberRegex = /^(\+62|62|0)8[1-9][0-9]{7,10}$/;

export function isValidEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

export function isValidPassword(password: string): boolean {
  return passwordSchema.safeParse(password).success;
}

export function isValidPhoneNumber(phone: string): boolean {
  return phoneSchema.safeParse(phone).success;
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('62')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('0')) {
    return `+62${cleaned.slice(1)}`;
  }
  return phone;
}

export const requiredString = (field: string) => z.string().min(1, `${field} wajib diisi`);

export const optionalString = z.string().optional();

export const positiveNumber = z.number().positive('Nilai harus lebih dari 0');

export const nonEmptyArray = <T>(schema: z.ZodType<T>) =>
  z.array(schema).min(1, 'Minimal harus ada satu item');
