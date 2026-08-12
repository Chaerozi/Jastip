'use client';

import { forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showPassword: boolean;
  onTogglePassword: () => void;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showPassword, onTogglePassword, className, ...props }, ref) => {
    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
          onClick={onTogglePassword}
          aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

export function PasswordStrengthIndicator({ password, className }: PasswordStrengthIndicatorProps) {
  const getStrength = (pwd: string): { score: number; label: string; color: string } => {
    let score = 0;

    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score, label: 'Sangat Lemah', color: 'bg-destructive' };
    if (score === 2) return { score, label: 'Lemah', color: 'bg-warning' };
    if (score === 3) return { score, label: 'Sedang', color: 'bg-warning' };
    if (score === 4) return { score, label: 'Kuat', color: 'bg-success' };
    return { score, label: 'Sangat Kuat', color: 'bg-success' };
  };

  if (!password) return null;

  const { score, label, color } = getStrength(password);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              level <= score ? color : 'bg-muted'
            )}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Kekuatan password: <span className="font-medium">{label}</span>
      </p>
    </div>
  );
}
