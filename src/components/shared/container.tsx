import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: 'div' | 'section' | 'article' | 'main';
}

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1400px]',
  full: 'max-w-full',
};

export function Container({
  children,
  className,
  size = 'lg',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', containerSizes[size], className)}
    >
      {children}
    </Component>
  );
}

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn('min-h-screen py-6 md:py-8 lg:py-10', className)}>
      <Container size="lg">{children}</Container>
    </main>
  );
}
