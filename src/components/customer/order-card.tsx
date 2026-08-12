'use client';

import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { cn } from '@/lib/utils';
import type { CustomerOrder, CustomerOrderStatus } from '@/types/customer';
import Link from 'next/link';

const statusConfig: Record<
  CustomerOrderStatus,
  {
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
    icon: typeof Package;
  }
> = {
  pending: { label: 'Menunggu Pembayaran', variant: 'outline', icon: Clock },
  processing: { label: 'Diproses', variant: 'secondary', icon: Package },
  shipped: { label: 'Dikirim', variant: 'default', icon: Truck },
  delivered: { label: 'Selesai', variant: 'default', icon: CheckCircle },
  cancelled: { label: 'Dibatalkan', variant: 'destructive', icon: XCircle },
};

interface OrderCardProps {
  order: CustomerOrder;
  showItems?: boolean;
  className?: string;
}

export function OrderCard({ order, showItems = true, className }: OrderCardProps) {
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/account/orders/${order.id}`}
                className="font-semibold hover:text-primary"
              >
                {order.order_number}
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
          </div>
          <Badge variant={status.variant} className="shrink-0">
            <StatusIcon className="mr-1 h-3 w-3" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showItems && order.items && order.items.length > 0 && (
          <div className="space-y-2">
            {order.items.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-sm">
                <div className="h-12 w-12 shrink-0 rounded bg-muted" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.product_name}</p>
                  <p className="text-muted-foreground">
                    {item.quantity}x {formatCurrency(item.price)}
                  </p>
                </div>
              </div>
            ))}
            {order.items.length > 3 && (
              <p className="text-xs text-muted-foreground">
                +{order.items.length - 3} produk lainnya
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between border-t pt-2">
          <div>
            <p className="text-sm text-muted-foreground">Total Pesanan</p>
            <p className="text-lg font-semibold">{formatCurrency(order.total)}</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={`/account/orders/${order.id}`}>Lihat Detail</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface OrderSummaryProps {
  order: CustomerOrder;
  className?: string;
}

export function OrderSummary({ order, className }: OrderSummaryProps) {
  return (
    <Card className={cn('', className)}>
      <CardContent className="space-y-4 p-6">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Ongkos Kirim</span>
          <span>{formatCurrency(order.shipping_cost)}</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Diskon</span>
            <span>-{formatCurrency(order.discount)}</span>
          </div>
        )}
        <div className="flex justify-between border-t pt-2 font-semibold">
          <span>Total</span>
          <span className="text-lg">{formatCurrency(order.total)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
