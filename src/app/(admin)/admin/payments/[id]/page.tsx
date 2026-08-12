'use client';

import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useAdminPayment,
  useApprovePayment,
  useRejectPayment,
} from '@/features/admin/operations/hooks';
import {
  OperationsHeader,
  DetailCard,
  DetailRow,
  StatusBadge,
} from '@/features/admin/operations/components';
import { PAYMENT_METHOD_LABELS } from '@/features/admin/operations/types/labels';
import { rejectionSchema, type RejectionForm } from '@/features/admin/operations/schemas';
import { formatCurrency } from '@/utils/format-currency';
import { formatDateTime } from '@/utils/format-date';
import { ErrorState, PageLoader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function PaymentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const query = useAdminPayment(id);
  const approve = useApprovePayment();
  const reject = useRejectPayment();
  const { toast } = useToast();
  const form = useForm<RejectionForm>({
    resolver: zodResolver(rejectionSchema),
    defaultValues: { reason: '' },
  });
  if (query.isPending) return <PageLoader />;
  if (query.isError || !query.data) return <ErrorState onRetry={() => query.refetch()} />;
  const payment = query.data;
  const canReview = payment.status === 'pending';
  return (
    <>
      <OperationsHeader title={`Pembayaran ${payment.paymentNumber}`} backHref="/admin/payments" />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <DetailCard title="Detail pembayaran">
            <DetailRow
              label="Status"
              value={<StatusBadge type="payment" status={payment.status} />}
            />
            <DetailRow
              label="Jumlah"
              value={<span className="text-primary">{formatCurrency(payment.amount)}</span>}
            />
            <DetailRow label="Metode" value={PAYMENT_METHOD_LABELS[payment.method]} />
            <DetailRow
              label="Tanggal pembayaran"
              value={payment.paidAt ? formatDateTime(payment.paidAt) : '-'}
            />
            <DetailRow
              label="Referensi"
              value={payment.orderNumber ?? payment.jastipNumber ?? '-'}
            />
          </DetailCard>
          <DetailCard title="Bukti pembayaran">
            {payment.proofUrl ? (
              <a href={payment.proofUrl} target="_blank" rel="noreferrer">
                <img
                  src={payment.proofUrl}
                  alt="Bukti pembayaran"
                  className="max-h-[500px] w-full rounded-lg border object-contain"
                />
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">Bukti pembayaran tidak tersedia.</p>
            )}
          </DetailCard>
        </div>
        <div className="space-y-6">
          <DetailCard title="Pelanggan">
            <DetailRow label="Nama" value={payment.customer.name} />
            <DetailRow label="Email" value={payment.customer.email} />
            <DetailRow label="Telepon" value={payment.customer.phone} />
          </DetailCard>
          {payment.rejectionReason && (
            <DetailCard title="Alasan penolakan">
              <p className="text-sm text-muted-foreground">{payment.rejectionReason}</p>
            </DetailCard>
          )}
          {canReview && (
            <DetailCard title="Tindakan">
              <div className="flex flex-col gap-3">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full">Setujui pembayaran</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Setujui pembayaran?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Pembayaran akan ditandai sebagai lunas dan transaksi dapat diproses.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          approve.mutate(id, {
                            onSuccess: () => toast({ title: 'Pembayaran disetujui' }),
                          })
                        }
                      >
                        Ya, setujui
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      Tolak pembayaran
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <form
                      onSubmit={form.handleSubmit((payload) =>
                        reject.mutate(
                          { id, payload },
                          { onSuccess: () => toast({ title: 'Pembayaran ditolak' }) }
                        )
                      )}
                    >
                      <AlertDialogHeader>
                        <AlertDialogTitle>Tolak pembayaran?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Berikan alasan agar pelanggan mengetahui penyebab penolakan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="my-4 space-y-2">
                        <Label htmlFor="reason">Alasan penolakan</Label>
                        <Textarea id="reason" {...form.register('reason')} />
                        {form.formState.errors.reason && (
                          <p className="text-xs text-destructive">
                            {form.formState.errors.reason.message}
                          </p>
                        )}
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button type="submit" variant="destructive" disabled={reject.isPending}>
                            {reject.isPending ? 'Mengirim...' : 'Tolak pembayaran'}
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </DetailCard>
          )}
        </div>
      </div>
    </>
  );
}
