import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <Card className={cn('h-full', className)}>
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

interface FeatureGridProps {
  children: React.ReactNode;
  className?: string;
}

export function FeatureGrid({ children, className }: FeatureGridProps) {
  return (
    <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-4', className)}>{children}</div>
  );
}

interface IconBlockProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
}

export function IconBlock({
  icon: Icon,
  title,
  description,
  className,
  iconClassName,
}: IconBlockProps) {
  return (
    <div className={cn('flex items-start gap-4', className)}>
      <div className={cn('rounded-lg bg-muted p-3', iconClassName)}>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
