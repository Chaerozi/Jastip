'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  useAdminOrder,
  useOrderTimeline,
  useUpdateOrderStatus,
} from '@/features/admin/operations/hooks';
import {
  OperationsHeader,
  DetailCard,
  DetailRow,
  OperationsTimeline,
  StatusBadge,
  StatusForm,
} from '@/features/admin/operations/components';
import {
  ORDER_STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
} from '@/features/admin/operations/types/labels';
import { formatCurrency } from '@/utils/format-currency';
import { formatDateTime } from '@/utils/format-date';
import { ErrorState, PageLoader } from '@/components/shared';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { AdminOrderStatus } from '@/features/admin/operations/types';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const order = useAdminOrder(id);
  const timeline = useOrderTimeline(id);
  const update = useUpdateOrderStatus();
  const { toast } = useToast();
  if (order.isPending) return <PageLoader />;
  if (order.isError || !order.data) return <ErrorState onRetry={() => order.refetch()} />;
  const value = order.data;
  const address = value.shippingAddress;
  return (
    <>
      <OperationsHeader title={`Pesanan ${value.orderNumber}`} backHref="/admin/orders" />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <DetailCard title="Informasi Pesanan">
            <div className="grid gap-3 sm:grid-cols-2">
              <DetailRow label="Tanggal dibuat" value={formatDateTime(value.createdAt)} />
              <DetailRow
                label="Metode pembayaran"
                value={PAYMENT_METHOD_LABELS[value.paymentMethod]}
              />
              <DetailRow label="Status pesanan" value={<StatusBadge status={value.status} />} />
              <DetailRow
                label="Status pembayaran"
                value={<StatusBadge type="payment" status={value.paymentStatus} />}
              />
            </div>
          </DetailCard>
          <DetailCard title="Produk">
            <div className="divide-y">
              {value.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.variantName ? `${item.variantName} · ` : ''}
                      {item.quantity} × {formatCurrency(item.unitPrice)}
                    </p>
                  </div>
                  <p className="font-medium">{formatCurrency(item.totalPrice)}</p>
                </div>
              ))}
            </div>
          </DetailCard>
          <DetailCard title="Ringkasan harga">
            <DetailRow label="Subtotal" value={formatCurrency(value.subtotal)} />
            <DetailRow label="Pengiriman" value={formatCurrency(value.shippingCost)} />
            <DetailRow label="Diskon" value={`-${formatCurrency(value.discountAmount)}`} />
            <DetailRow
              label="Total"
              value={
                <span className="text-base text-primary">{formatCurrency(value.totalAmount)}</span>
              }
            />
          </DetailCard>
          <DetailCard title="Riwayat status">
            <OperationsTimeline items={timeline.data ?? []} />
          </DetailCard>
        </div>
        <div className="space-y-6">
          <DetailCard title="Pelanggan">
            <DetailRow label="Nama" value={value.customer.name} />
            <DetailRow label="Email" value={value.customer.email} />
            <DetailRow label="Telepon" value={value.customer.phone} />
          </DetailCard>
          <DetailCard title="Alamat pengiriman">
            {address ? (
              <>
                <p className="font-medium">{address.recipientName}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {address.streetAddress}, {address.district}, {address.city}, {address.province}{' '}
                  {address.postalCode}
                </p>
                <p className="text-sm text-muted-foreground">{address.phone}</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Alamat tidak tersedia.</p>
            )}
          </DetailCard>
          <DetailCard title="Perbarui status">
            <StatusForm
              statuses={Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
              currentStatus={value.status}
              isPending={update.isPending}
              onSubmit={(payload) =>
                update.mutate(
                  { id, payload },
                  { onSuccess: () => toast({ title: 'Status pesanan diperbarui' }) }
                )
              }
            />
          </DetailCard>
        </div>
      </div>
    </>
  );
}
