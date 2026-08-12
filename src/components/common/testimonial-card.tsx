import Image from 'next/image';
import { Quote, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Rating } from './rating';

interface TestimonialCardProps {
  id: string;
  name: string;
  role?: string;
  avatar?: string | null;
  content: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  name,
  role,
  avatar,
  content,
  rating,
  className,
}: TestimonialCardProps) {
  return (
    <Card className={cn('h-full', className)}>
      <CardContent className="flex h-full flex-col p-6">
        <div className="mb-4 flex items-start justify-between">
          {rating !== undefined && <Rating value={rating} showValue />}
          <Quote className="h-6 w-6 text-muted-foreground/50" />
        </div>
        <p className="flex-1 text-muted-foreground">{content}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
            {avatar ? (
              <Image src={avatar} alt={name} fill className="object-cover" sizes="48px" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-foreground">{name}</p>
            {role && <p className="text-sm text-muted-foreground">{role}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface TestimonialGridProps {
  children: React.ReactNode;
  className?: string;
}

export function TestimonialGrid({ children, className }: TestimonialGridProps) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>{children}</div>
  );
}
