import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Rating } from './rating';
import { PriceDisplay } from './price-display';

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  image?: string | null;
  rating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  inStock?: boolean;
  className?: string;
}

export function ProductCard({
  id,
  slug,
  name,
  price,
  compareAtPrice,
  image,
  rating = 0,
  reviewCount = 0,
  isFeatured,
  isNewArrival,
  isBestSeller,
  inStock = true,
  className,
}: ProductCardProps) {
  const hasDiscount = compareAtPrice && compareAtPrice > price;

  return (
    <Card className={cn('group overflow-hidden border-0 shadow-none', className)}>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Link href={`/products/${slug}`}>
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {isNewArrival && <Badge>Baru</Badge>}
          {isBestSeller && <Badge variant="secondary">Terlaris</Badge>}
          {isFeatured && <Badge variant="outline">Pilihan</Badge>}
          {!inStock && <Badge variant="destructive">Habis</Badge>}
          {hasDiscount && (
            <Badge variant="destructive">
              -{Math.round(((compareAtPrice! - price) / compareAtPrice!) * 100)}%
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
          <Button size="icon" variant="secondary" className="h-8 w-8">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Tambah ke Wishlist</span>
          </Button>
        </div>

        {/* Hover Add to Cart */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/60 to-transparent p-4 transition-transform group-hover:translate-y-0">
          <Button size="sm" className="w-full" disabled={!inStock}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            {inStock ? 'Tambah ke Keranjang' : 'Stok Habis'}
          </Button>
        </div>
      </div>

      <CardContent className="p-3">
        <Link href={`/products/${slug}`}>
          <h3 className="line-clamp-2 text-sm font-medium text-foreground hover:text-primary">
            {name}
          </h3>
        </Link>
        {rating > 0 && (
          <div className="mt-1.5">
            <Rating value={rating} size="sm" count={reviewCount} />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3 pt-0">
        <PriceDisplay price={price} compareAtPrice={compareAtPrice} size="sm" />
      </CardFooter>
    </Card>
  );
}

interface ProductGridProps {
  children: React.ReactNode;
  className?: string;
}

export function ProductGrid({ children, className }: ProductGridProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6', className)}>
      {children}
    </div>
  );
}
