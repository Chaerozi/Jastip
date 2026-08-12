import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  SHIPPING_STATUS_LABELS,
  JASTIP_STATUS_LABELS,
} from '../types/labels';
import type {
  AdminOrderStatus,
  AdminPaymentStatus,
  AdminShippingStatus,
  JastipStatus,
} from '../types';

type StatusValue = AdminOrderStatus | AdminPaymentStatus | AdminShippingStatus | JastipStatus;
export function StatusBadge({
  status,
  type = 'order',
}: {
  status: StatusValue;
  type?: 'order' | 'payment' | 'shipping' | 'jastip';
}) {
  const labels: Record<string, string> =
    type === 'order'
      ? ORDER_STATUS_LABELS
      : type === 'payment'
        ? PAYMENT_STATUS_LABELS
        : type === 'shipping'
          ? SHIPPING_STATUS_LABELS
          : JASTIP_STATUS_LABELS;
  const tone =
    status === 'cancelled' || status === 'failed'
      ? 'bg-red-50 text-red-700 border-red-200'
      : status === 'completed' || status === 'paid' || status === 'delivered'
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : status === 'pending' || status === 'waiting_confirmation'
          ? 'bg-amber-50 text-amber-700 border-amber-200'
          : 'bg-blue-50 text-blue-700 border-blue-200';
  return (
    <Badge variant="outline" className={cn('whitespace-nowrap font-medium', tone)}>
      {labels[status] ?? status}
    </Badge>
  );
}
