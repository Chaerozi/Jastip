'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AuthCard, AuthHeader, AuthFooter, AuthDivider } from '@/components/auth';
import { PasswordInput, PasswordStrengthIndicator } from '@/components/auth/password-input';
import { SocialLoginButton } from '@/components/auth/social-button';
import { useAuthUIStore } from '@/store';

const registerSchema = z
  .object({
    fullName: z.string().min(3, 'Nama minimal 3 karakter'),
    email: z.string().email('Email tidak valid'),
    phone: z.string().min(10, 'Nomor telepon tidak valid').optional().or(z.literal('')),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'Anda harus menyetujui syarat dan ketentuan',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useAuthUIStore();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const password = form.watch('password');
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: RegisterFormData) => {
    // TODO: Replace with actual API call
  };

  return (
    <AuthCard>
      <AuthHeader title="Buat Akun Baru" description="Daftar untuk mulai berbelanja" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="nama@email.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon (Opsional)</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="08xxxxxxxxxx" autoComplete="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Buat password"
                    showPassword={showPassword}
                    onTogglePassword={togglePasswordVisibility}
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {password && <PasswordStrengthIndicator password={password} />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Konfirmasi password"
                    showPassword={showConfirmPassword}
                    onTogglePassword={toggleConfirmPasswordVisibility}
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="text-sm leading-none">
                  <FormLabel className="font-normal">
                    Saya menyetujui{' '}
                    <a href="/terms" className="text-primary hover:underline">
                      Syarat & Ketentuan
                    </a>{' '}
                    dan{' '}
                    <a href="/privacy" className="text-primary hover:underline">
                      Kebijakan Privasi
                    </a>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Daftar'}
          </Button>
        </form>
      </Form>

      <AuthDivider />

      <div className="space-y-3">
        <SocialLoginButton provider="google" />
        <SocialLoginButton provider="facebook" />
      </div>

      <AuthFooter label="Sudah punya akun?" linkText="Masuk" href="/login" />
    </AuthCard>
  );
}
