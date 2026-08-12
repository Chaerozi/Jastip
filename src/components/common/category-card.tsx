import Link from 'next/link';
import Image from 'next/image';
import { Folder } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface CategoryCardProps {
  id: string;
  slug: string;
  name: string;
  image?: string | null;
  productCount?: number;
  className?: string;
  variant?: 'default' | 'compact';
}

export function CategoryCard({
  slug,
  name,
  image,
  productCount,
  className,
  variant = 'default',
}: CategoryCardProps) {
  if (variant === 'compact') {
    return (
      <Link href={`/products/category/${slug}`}>
        <Card
          className={cn(
            'group flex items-center gap-3 p-3 transition-colors hover:bg-muted',
            className
          )}
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted">
            {image ? (
              <Image src={image} alt={name} fill className="object-cover" sizes="48px" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Folder className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-foreground group-hover:text-primary">{name}</h3>
            {productCount !== undefined && (
              <p className="text-sm text-muted-foreground">{productCount} produk</p>
            )}
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/products/category/${slug}`}>
      <Card className={cn('group overflow-hidden border-0 shadow-none', className)}>
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 16vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Folder className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-semibold text-white">{name}</h3>
            {productCount !== undefined && (
              <p className="text-sm text-white/80">{productCount} produk</p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

interface CategoryGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 4 | 5 | 6;
}

const columnClasses = {
  4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
};

export function CategoryGrid({ children, className, columns = 6 }: CategoryGridProps) {
  return (
    <div className={cn('grid gap-4 lg:gap-6', columnClasses[columns], className)}>{children}</div>
  );
}
