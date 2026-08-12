'use client';

import { useState } from 'react';
import { Tag, X, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/utils/format-currency';
import { cn } from '@/lib/utils';
import type { Cart, Coupon } from '@/types/customer';

interface CartSummaryProps {
  cart: Cart | null;
  coupon: Coupon | null;
  isApplyingCoupon?: boolean;
  isRemovingCoupon?: boolean;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  onCheckout: () => void;
  isCheckingOut?: boolean;
  checkoutDisabled?: boolean;
  className?: string;
}

export function CartSummary({
  cart,
  coupon,
  isApplyingCoupon,
  isRemovingCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onCheckout,
  isCheckingOut,
  checkoutDisabled,
  className,
}: CartSummaryProps) {
  const [couponCode, setCouponCode] = useState('');

  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const subtotal = cart?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const discount = coupon ? calculateDiscountValue(coupon, subtotal) : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode.trim().toUpperCase());
      setCouponCode('');
    }
  };

  return (
    <Card className={cn('sticky top-4', className)}>
      <CardHeader>
        <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal ({itemCount} item)</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Diskon</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>

        <div className="space-y-2">
          <p className="flex items-center gap-2 text-sm font-medium">
            <Tag className="h-4 w-4" />
            Kode Kupon
          </p>

          {coupon ? (
            <div className="flex items-center justify-between rounded-lg border border-success/20 bg-success/10 p-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-success">{coupon.code}</span>
                <span className="text-sm text-muted-foreground">
                  (
                  {coupon.discount_type === 'percentage'
                    ? `${coupon.discount_value}%`
                    : formatCurrency(coupon.discount_value)}{' '}
                  off)
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onRemoveCoupon}
                disabled={isRemovingCoupon}
              >
                {isRemovingCoupon ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Masukkan kode kupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="uppercase"
              />
              <Button
                variant="outline"
                onClick={handleApplyCoupon}
                disabled={!couponCode.trim() || isApplyingCoupon}
              >
                {isApplyingCoupon ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Pakai'}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={onCheckout}
          disabled={checkoutDisabled || isCheckingOut || itemCount === 0}
        >
          {isCheckingOut ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Memproses...
            </>
          ) : (
            'Lanjut ke Pembayaran'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

function calculateDiscountValue(coupon: Coupon, subtotal: number): number {
  let discount = 0;
  if (coupon.discount_type === 'percentage') {
    discount = (subtotal * coupon.discount_value) / 100;
  } else {
    discount = coupon.discount_value;
  }

  if (coupon.max_discount && discount > coupon.max_discount) {
    discount = coupon.max_discount;
  }

  return Math.min(discount, subtotal);
}

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
  disabled,
  className,
}: QuantitySelectorProps) {
  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={decrease}
        disabled={disabled || value <= min}
      >
        -
      </Button>
      <span className="w-10 text-center font-medium">{value}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={increase}
        disabled={disabled || value >= max}
      >
        +
      </Button>
    </div>
  );
}
