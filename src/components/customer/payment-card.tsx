'use client';

import { CreditCard, Clock, CheckCircle, XCircle, AlertCircle, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { cn } from '@/lib/utils';
import type { CustomerPayment, CustomerPaymentStatus } from '@/types/customer';

const statusConfig: Record<
  CustomerPaymentStatus,
  {
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
    icon: typeof Clock;
  }
> = {
  pending: { label: 'Menunggu Pembayaran', variant: 'outline', icon: Clock },
  paid: { label: 'Pembayaran Diterima', variant: 'default', icon: CheckCircle },
  failed: { label: 'Pembayaran Gagal', variant: 'destructive', icon: XCircle },
  expired: { label: 'Pembayaran Kedaluwarsa', variant: 'destructive', icon: AlertCircle },
};

interface PaymentCardProps {
  payment: CustomerPayment;
  onUploadProof?: () => void;
  className?: string;
}

export function PaymentCard({ payment, onUploadProof, className }: PaymentCardProps) {
  const status = statusConfig[payment.status];
  const StatusIcon = status.icon;

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="h-5 w-5" />
            Detail Pembayaran
          </CardTitle>
          <Badge variant={status.variant}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Metode Pembayaran</span>
            <span className="font-medium capitalize">
              {payment.payment_method.replace('_', ' ')}
            </span>
          </div>

          {payment.payment_provider && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Provider</span>
              <span className="font-medium capitalize">{payment.payment_provider}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">Nominal</span>
            <span className="text-lg font-semibold">{formatCurrency(payment.amount)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Tanggal Transaksi</span>
            <span>{formatDate(payment.created_at)}</span>
          </div>

          {payment.paid_at && (
            <div className="flex justify-between text-success">
              <span>Dibayar pada</span>
              <span>{formatDate(payment.paid_at)}</span>
            </div>
          )}

          {payment.expires_at && payment.status === 'pending' && (
            <div className="flex justify-between text-muted-foreground">
              <span>Berlaku hingga</span>
              <span>{formatDate(payment.expires_at)}</span>
            </div>
          )}
        </div>

        {payment.status === 'pending' && !payment.proof_url && onUploadProof && (
          <Button onClick={onUploadProof} className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Upload Bukti Pembayaran
          </Button>
        )}

        {payment.proof_url && (
          <div className="border-t pt-2">
            <p className="mb-2 text-sm text-muted-foreground">Bukti Pembayaran</p>
            <div className="overflow-hidden rounded-lg border">
              {/* Placeholder for proof image */}
              <div className="flex h-40 items-center justify-center bg-muted">
                <span className="text-sm text-muted-foreground">
                  Bukti pembayaran telah diupload
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface PaymentMethodCardProps {
  id: string;
  name: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function PaymentMethodCard({
  id,
  name,
  icon,
  isSelected,
  onSelect,
  disabled,
}: PaymentMethodCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-colors',
        isSelected && 'border-primary ring-1 ring-primary',
        disabled && 'cursor-not-allowed opacity-50'
      )}
      onClick={() => !disabled && onSelect()}
    >
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
          {icon || <CreditCard className="h-5 w-5" />}
        </div>
        <span className="font-medium">{name}</span>
        {isSelected && <CheckCircle className="ml-auto h-5 w-5 text-primary" />}
      </CardContent>
    </Card>
  );
}
