'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ArrowLeft, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AuthCard, AuthHeader } from '@/components/auth';
import { PasswordInput, PasswordStrengthIndicator } from '@/components/auth/password-input';
import { useAuthUIStore } from '@/store';

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const {
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useAuthUIStore();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const password = form.watch('password');
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: ResetPasswordFormData) => {
    // TODO: Replace with actual API call using token
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <AuthCard>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <AuthHeader
            title="Password Berhasil Direset"
            description="Password Anda telah berhasil diubah. Silakan login dengan password baru."
          />
          <Button asChild className="w-full">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <Link
        href="/login"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke login
      </Link>

      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Lock className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>

      <AuthHeader title="Reset Password" description="Buat password baru untuk akun Anda" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Baru</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Buat password baru"
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
                <FormLabel>Konfirmasi Password Baru</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Konfirmasi password baru"
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Reset Password'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
