'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
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
import { PasswordInput } from '@/components/auth/password-input';
import { SocialLoginButton } from '@/components/auth/social-button';
import { useAuthUIStore } from '@/store';

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { showPassword, togglePasswordVisibility, rememberMe, setRememberMe } = useAuthUIStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // TODO: Replace with actual API call
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <AuthCard>
      <AuthHeader title="Selamat Datang" description="Masuk ke akun Anda untuk melanjutkan" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-muted-foreground hover:text-primary"
                  >
                    Lupa password?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput
                    placeholder="Masukkan password"
                    showPassword={showPassword}
                    onTogglePassword={togglePasswordVisibility}
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">Ingat saya</FormLabel>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>
      </Form>

      <AuthDivider />

      <div className="space-y-3">
        <SocialLoginButton provider="google" />
        <SocialLoginButton provider="facebook" />
      </div>

      <AuthFooter label="Belum punya akun?" linkText="Daftar sekarang" href="/register" />
    </AuthCard>
  );
}
