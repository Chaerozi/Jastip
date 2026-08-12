'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Chrome, Facebook } from 'lucide-react';

interface SocialLoginButtonProps {
  provider: 'google' | 'facebook';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const providerConfig = {
  google: {
    label: 'Google',
    icon: Chrome,
  },
  facebook: {
    label: 'Facebook',
    icon: Facebook,
  },
};

export function SocialLoginButton({
  provider,
  onClick,
  disabled = false,
  className,
}: SocialLoginButtonProps) {
  const config = providerConfig[provider];
  const Icon = config.icon;

  return (
    <Button
      type="button"
      variant="outline"
      className={cn('w-full gap-2', className)}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-4 w-4" />
      Lanjutkan dengan {config.label}
    </Button>
  );
}

interface RememberMeCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export function RememberMeCheckbox({
  checked,
  onCheckedChange,
  className,
}: RememberMeCheckboxProps) {
  return (
    <label className={cn('flex items-center gap-2 text-sm', className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="h-4 w-4 rounded border-input"
      />
      <span className="text-muted-foreground">Ingat saya</span>
    </label>
  );
}
