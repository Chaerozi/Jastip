import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  title,
  subtitle,
  description,
  action,
  className,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-8', align === 'center' && 'text-center', className)}>
      {subtitle && (
        <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
          {subtitle}
        </span>
      )}
      <div className={cn('flex items-center gap-4', align === 'center' && 'flex-col')}>
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2>
        {action && (
          <Button variant="link" className={cn('gap-1', align === 'center' && 'mt-2')} asChild>
            <a href={action.href}>
              {action.label}
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
      {description && <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'article';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1400px]',
  full: 'max-w-full',
};

export function Section({
  children,
  className,
  id,
  as: Component = 'section',
  containerSize = 'lg',
}: SectionProps) {
  return (
    <Component id={id} className={cn('py-12 md:py-16 lg:py-20', className)}>
      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', containerSizes[containerSize])}>
        {children}
      </div>
    </Component>
  );
}
