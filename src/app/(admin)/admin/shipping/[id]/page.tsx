'use client';

import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useAdminShippingDetail,
  useShippingTimeline,
  useUpdateShipping,
} from '@/features/admin/operations/hooks';
import {
  OperationsHeader,
  DetailCard,
  DetailRow,
  OperationsTimeline,
  StatusBadge,
} from '@/features/admin/operations/components';
import { SHIPPING_STATUS_LABELS } from '@/features/admin/operations/types/labels';
import { trackingSchema, type TrackingForm } from '@/features/admin/operations/schemas';
import { ErrorState, PageLoader } from '@/components/shared';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function ShippingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const query = useAdminShippingDetail(id);
  const timeline = useShippingTimeline(id);
  const update = useUpdateShipping();
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
  const shipping = query.data;
  return (
    <>
      <OperationsHeader title={`Pengiriman ${shipping.orderNumber}`} backHref="/admin/shipping" />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <DetailCard title="Detail pengiriman">
            <DetailRow label="Pesanan" value={shipping.orderNumber} />
            <DetailRow
              label="Status"
              value={<StatusBadge type="shipping" status={shipping.status} />}
            />
            <DetailRow label="Kurir" value={shipping.courier} />
            <DetailRow label="Nomor resi" value={shipping.trackingNumber} />
          </DetailCard>
          <DetailCard title="Alamat pengiriman">
            {shipping.address ? (
              <>
                <p className="font-medium">{shipping.address.recipientName}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {shipping.address.streetAddress}, {shipping.address.district},{' '}
                  {shipping.address.city}, {shipping.address.province} {shipping.address.postalCode}
                </p>
                <p className="text-sm text-muted-foreground">{shipping.address.phone}</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Alamat tidak tersedia.</p>
            )}
          </DetailCard>
          <DetailCard title="Riwayat pengiriman">
            <OperationsTimeline items={timeline.data ?? []} />
          </DetailCard>
        </div>
        <div className="space-y-6">
          <DetailCard title="Pelanggan">
            <DetailRow label="Nama" value={shipping.customer.name} />
            <DetailRow label="Email" value={shipping.customer.email} />
            <DetailRow label="Telepon" value={shipping.customer.phone} />
          </DetailCard>
          <DetailCard title="Perbarui pengiriman">
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit((payload) =>
                update.mutate(
                  { id, payload },
                  { onSuccess: () => toast({ title: 'Informasi pengiriman diperbarui' }) }
                )
              )}
            >
              <div className="space-y-2">
                <Label>Kurir</Label>
                <Input {...form.register('courier')} />
                {form.formState.errors.courier && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.courier.message}
                  </p>
                )}
              </div>
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
                <Label>Status pengiriman</Label>
                <Select
                  value={form.watch('status')}
                  onValueChange={(value) =>
                    form.setValue('status', value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SHIPPING_STATUS_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={update.isPending}>
                {update.isPending ? 'Menyimpan...' : 'Simpan perubahan'}
              </Button>
            </form>
          </DetailCard>
        </div>
      </div>
    </>
  );
}
