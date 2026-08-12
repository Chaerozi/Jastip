'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthCard, AuthHeader } from '@/components/auth';

type VerificationStatus = 'loading' | 'success' | 'error';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        return;
      }

      try {
        // TODO: Replace with actual API call
        // await authService.verifyEmail(token);
        // For now, simulate success
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus('success');
      } catch {
        setStatus('error');
      }
    };

    verifyEmail();
  }, [token]);

  const handleResendVerification = async () => {
    if (!email) return;
    setIsResending(true);
    try {
      // TODO: Replace with actual API call
      // await authService.resendVerification(email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsResending(false);
    }
  };

  if (status === 'loading') {
    return (
      <AuthCard>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
          <AuthHeader
            title="Memverifikasi Email"
            description="Mohon tunggu sementara kami memverifikasi email Anda..."
          />
        </div>
      </AuthCard>
    );
  }

  if (status === 'success') {
    return (
      <AuthCard>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <AuthHeader
            title="Email Terverifikasi"
            description="Email Anda telah berhasil diverifikasi. Sekarang Anda dapat login ke akun Anda."
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
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <XCircle className="h-8 w-8 text-destructive" />
        </div>
        <AuthHeader
          title="Verifikasi Gagal"
          description="Link verifikasi tidak valid atau telah kedaluwarsa. Silakan minta link baru."
        />

        <div className="mt-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Masukkan email Anda untuk mengirim ulang link verifikasi.
          </p>

          <div className="space-y-3">
            <input
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button
              onClick={handleResendVerification}
              className="w-full"
              disabled={isResending || !email}
            >
              {isResending ? 'Mengirim...' : 'Kirim Ulang Link'}
            </Button>
          </div>

          <Button variant="outline" asChild className="w-full">
            <Link href="/login">Kembali ke Login</Link>
          </Button>
        </div>
      </div>
    </AuthCard>
  );
}
