import { cn } from '@/lib/utils';
import { ShoppingBag, Lock, Mail, User } from 'lucide-react';

interface AuthIllustrationProps {
  variant?: 'login' | 'register' | 'forgot' | 'reset' | 'verify';
  className?: string;
}

const variants = {
  login: { icon: Lock, label: 'Login' },
  register: { icon: User, label: 'Register' },
  forgot: { icon: Mail, label: 'Forgot Password' },
  reset: { icon: Lock, label: 'Reset Password' },
  verify: { icon: Mail, label: 'Verify Email' },
};

export function AuthIllustration({ variant = 'login', className }: AuthIllustrationProps) {
  const Icon = variants[variant].icon;

  return (
    <div className={cn('hidden lg:flex lg:flex-1 lg:items-center lg:justify-center', className)}>
      <div className="relative">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-muted">
          <Icon className="h-16 w-16 text-muted-foreground" />
        </div>
        <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <ShoppingBag className="h-8 w-8 text-primary" />
        </div>
      </div>
    </div>
  );
}
