'use client';

import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useAdminJastipDetail,
  useUpdateJastipStatus,
  useUpdateJastipTracking,
} from '@/features/admin/operations/hooks';
import {
  OperationsHeader,
  DetailCard,
  DetailRow,
  StatusBadge,
  StatusForm,
} from '@/features/admin/operations/components';
import { JASTIP_STATUS_LABELS } from '@/features/admin/operations/types/labels';
import { trackingSchema, type TrackingForm } from '@/features/admin/operations/schemas';
import { formatCurrency } from '@/utils/format-currency';
import { formatDateTime } from '@/utils/format-date';
import { ErrorState, PageLoader } from '@/components/shared';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function JastipDetailPage() {
  const { id } = useParams<{ id: string }>();
  const query = useAdminJastipDetail(id);
  const statusUpdate = useUpdateJastipStatus();
  const trackingUpdate = useUpdateJastipTracking();
  const { toast } = useToast();
  const form = useForm<TrackingForm>({
    resolver: zodResolver(trackingSchema),
    values: {
      trackingNumber: query.data?.trackingNumber ?? '',
      courier: query.data?.courier ?? '',
      status: query.data?.status ?? 'pending',
    },
  });
  if (query.isPending) return <PageLoader />;
  if (query.isError || !query.data) return <ErrorState onRetry={() => query.refetch()} />;
  const item = query.data;
  return (
    <>
      <OperationsHeader title={`Jastip ${item.requestNumber}`} backHref="/admin/jastip" />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <DetailCard title="Detail permintaan">
            <DetailRow label="Pelanggan" value={item.customer.name} />
            <DetailRow label="Produk" value={item.productName} />
            <DetailRow label="Jumlah" value={`${item.quantity} item`} />
            <DetailRow
              label="URL produk"
              value={
                <a
                  className="max-w-56 truncate text-primary hover:underline"
                  href={item.productUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.productUrl}
                </a>
              }
            />
            <DetailRow label="Dibuat" value={formatDateTime(item.createdAt)} />
          </DetailCard>
          <DetailCard title="Rincian biaya">
            <DetailRow label="Estimasi harga" value={formatCurrency(item.estimatedPrice)} />
            <DetailRow label="Biaya layanan" value={formatCurrency(item.serviceFee)} />
            <DetailRow label="Biaya pengiriman" value={formatCurrency(item.shippingFee)} />
            <DetailRow
              label="Total"
              value={<span className="text-primary">{formatCurrency(item.totalPrice)}</span>}
            />
          </DetailCard>
        </div>
        <div className="space-y-6">
          <DetailCard title="Status saat ini">
            <StatusBadge type="jastip" status={item.status} />
          </DetailCard>
          <DetailCard title="Perbarui status">
            <StatusForm
              statuses={Object.entries(JASTIP_STATUS_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
              currentStatus={item.status}
              isPending={statusUpdate.isPending}
              onSubmit={(payload) =>
                statusUpdate.mutate(
                  { id, payload },
                  { onSuccess: () => toast({ title: 'Status jastip diperbarui' }) }
                )
              }
            />
          </DetailCard>
          <DetailCard title="Informasi pengiriman">
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit((payload) =>
                trackingUpdate.mutate(
                  { id, payload },
                  { onSuccess: () => toast({ title: 'Informasi pengiriman diperbarui' }) }
                )
              )}
            >
              <div className="space-y-2">
                <Label>Nomor resi</Label>
                <Input {...form.register('trackingNumber')} />
                {form.formState.errors.trackingNumber && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.trackingNumber.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Kurir</Label>
                <Input {...form.register('courier')} />
                {form.formState.errors.courier && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.courier.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={trackingUpdate.isPending}>
                {trackingUpdate.isPending ? 'Menyimpan...' : 'Simpan pengiriman'}
              </Button>
            </form>
          </DetailCard>
        </div>
      </div>
    </>
  );
}
