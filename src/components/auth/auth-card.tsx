import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <Card className={cn('w-full max-w-md border-0 shadow-lg', className)}>
      <CardContent className="p-8">{children}</CardContent>
    </Card>
  );
}

interface AuthHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function AuthHeader({ title, description, className }: AuthHeaderProps) {
  return (
    <div className={cn('mb-8 text-center', className)}>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}

interface AuthFooterProps {
  label: string;
  linkText: string;
  href: string;
  className?: string;
}

export function AuthFooter({ label, linkText, href, className }: AuthFooterProps) {
  return (
    <div className={cn('mt-6 text-center text-sm', className)}>
      <span className="text-muted-foreground">{label} </span>
      <Link href={href} className="font-medium text-primary hover:underline">
        {linkText}
      </Link>
    </div>
  );
}

interface AuthDividerProps {
  text?: string;
  className?: string;
}

export function AuthDivider({ text = 'atau', className }: AuthDividerProps) {
  return (
    <div className={cn('relative my-6', className)}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-card px-2 text-muted-foreground">{text}</span>
      </div>
    </div>
  );
}
