'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AuthCard, AuthHeader } from '@/components/auth';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email tidak valid'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: ForgotPasswordFormData) => {
    // TODO: Replace with actual API call
    setSubmittedEmail(data.email);
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
            title="Email Terkirim"
            description={`Kami telah mengirim link reset password ke ${submittedEmail}. Silakan cek inbox atau folder spam Anda.`}
          />
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/login">Kembali ke Login</Link>
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsSuccess(false);
                form.reset();
              }}
            >
              Kirim Ulang Email
            </Button>
          </div>
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
          <Mail className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>

      <AuthHeader
        title="Lupa Password"
        description="Masukkan email Anda dan kami akan mengirimkan link untuk reset password"
      />

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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Mengirim...' : 'Kirim Link Reset'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
