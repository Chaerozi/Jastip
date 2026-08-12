import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  count?: number;
  className?: string;
}

const sizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function Rating({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  count,
  className,
}: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn('fill-yellow-400 text-yellow-400', sizeClasses[size])}
          />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className={cn('text-muted-foreground', sizeClasses[size])} />
            <StarHalf
              className={cn(
                'absolute left-0 top-0 fill-yellow-400 text-yellow-400',
                sizeClasses[size]
              )}
            />
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className={cn('text-muted-foreground', sizeClasses[size])} />
        ))}
      </div>
      {showValue && <span className="text-sm font-medium text-foreground">{value.toFixed(1)}</span>}
      {count !== undefined && <span className="text-sm text-muted-foreground">({count})</span>}
    </div>
  );
}

interface RatingSummaryProps {
  average: number;
  total: number;
  distribution: Record<number, number>;
}

export function RatingSummary({ average, total, distribution }: RatingSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="text-4xl font-bold">{average.toFixed(1)}</div>
        <div>
          <Rating value={average} showValue={false} />
          <p className="text-sm text-muted-foreground">{total} ulasan</p>
        </div>
      </div>
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = distribution[star] || 0;
          const percentage = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-2">
              <span className="w-8 text-sm text-muted-foreground">{star}</span>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <div className="h-2 flex-1 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-yellow-400"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-sm text-muted-foreground">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
