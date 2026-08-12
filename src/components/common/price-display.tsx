import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/format-currency';

interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number | null;
  size?: 'sm' | 'md' | 'lg';
  showDiscount?: boolean;
  className?: string;
}

const priceSizes = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
};

const compareSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function PriceDisplay({
  price,
  compareAtPrice,
  size = 'md',
  showDiscount = true,
  className,
}: PriceDisplayProps) {
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-baseline gap-2">
        <span className={cn('font-semibold text-foreground', priceSizes[size])}>
          {formatCurrency(price)}
        </span>
        {hasDiscount && showDiscount && (
          <span className={cn('text-muted-foreground line-through', compareSizes[size])}>
            {formatCurrency(compareAtPrice)}
          </span>
        )}
      </div>
      {hasDiscount && showDiscount && (
        <span className="mt-1 inline-block w-fit rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-medium text-destructive">
          Hemat {discountPercentage}%
        </span>
      )}
    </div>
  );
}

interface ProductPriceProps {
  price: number;
  compareAtPrice?: number | null;
  quantity?: number;
}

export function ProductPrice({ price, compareAtPrice, quantity = 1 }: ProductPriceProps) {
  const total = price * quantity;
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const totalCompare = hasDiscount ? compareAtPrice * quantity : null;

  return (
    <div className="space-y-1">
      <PriceDisplay price={total} compareAtPrice={totalCompare} size="lg" />
      {quantity > 1 && (
        <p className="text-sm text-muted-foreground">
          {formatCurrency(price)} x {quantity}
        </p>
      )}
    </div>
  );
}
