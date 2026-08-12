'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Upload, Loader2, CheckCircle, Copy, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useOrder, usePaymentByOrder, useUploadProof } from '@/hooks/use-customer';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { ROUTES } from '@/constants/routes';
import { useToast } from '@/hooks/use-toast';
import type { CustomerPaymentProvider } from '@/types/customer';
import { PAYMENT_PROVIDERS } from '@/types/customer';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const orderId = params.id as string;

  const { data: order, isLoading: orderLoading } = useOrder(orderId);
  const { data: payment, isLoading: paymentLoading } = usePaymentByOrder(orderId);
  const uploadProof = useUploadProof();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isLoading = orderLoading || paymentLoading;

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    return undefined;
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !payment) return;

    // In real implementation, upload to storage first
    // For now, just simulate success
    toast({
      title: 'Bukti Pembayaran Berhasil Diupload',
      description: 'Bukti pembayaran Anda sedang diproses.',
    });

    router.push(ROUTES.ACCOUNT.ORDER_DETAIL(orderId));
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Berhasil Disalin',
      description: 'Nomor rekening berhasil disalin ke clipboard.',
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!order || !payment) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="py-12 text-center">
          <CreditCard className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">Pembayaran tidak ditemukan</p>
          <Button asChild className="mt-4">
            <Link href={ROUTES.ACCOUNT.ORDERS}>Kembali ke Pesanan</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isBankTransfer = payment.payment_method === 'bank_transfer';
  const providerInfo = payment.payment_provider
    ? PAYMENT_PROVIDERS[payment.payment_provider as CustomerPaymentProvider]
    : null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href={ROUTES.ACCOUNT.ORDER_DETAIL(orderId)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Pesanan
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Pembayaran</h1>
        <p className="text-muted-foreground">{order.order_number}</p>
      </div>

      {/* Payment Status */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Pembayaran</p>
              <p className="text-3xl font-bold">{formatCurrency(payment.amount)}</p>
            </div>
            <Badge variant={payment.status === 'paid' ? 'default' : 'outline'}>
              {payment.status === 'paid' ? 'Lunas' : 'Menunggu Pembayaran'}
            </Badge>
          </div>

          {payment.status === 'pending' && payment.expires_at && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Berlaku hingga: {formatDate(payment.expires_at)}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bank Transfer Details */}
      {isBankTransfer && providerInfo && payment.status === 'pending' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Transfer ke Rekening Berikut
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 rounded-lg bg-muted p-4">
              <div>
                <p className="text-sm text-muted-foreground">Bank</p>
                <p className="font-semibold">{providerInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">No. Rekening</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">{providerInfo.account}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleCopyToClipboard(providerInfo.account || '')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Atas Nama</p>
                <p className="font-semibold">PT Kitorang Shop Indonesia</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nominal Transfer</p>
                <p className="text-lg font-semibold text-primary">
                  {formatCurrency(payment.amount)}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-warning/20 bg-warning/10 p-4">
              <p className="text-sm font-medium">Penting:</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Transfer sesuai nominal di atas</li>
                <li>Tidak boleh lebih atau kurang</li>
                <li>Upload bukti transfer setelah bayar</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* QRIS Payment */}
      {payment.payment_method === 'qris' && payment.status === 'pending' && (
        <Card>
          <CardHeader>
            <CardTitle>Pembayaran QRIS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="mx-auto flex aspect-square max-w-xs items-center justify-center rounded-lg bg-muted">
              <div className="text-center text-muted-foreground">
                <p>QR Code akan ditampilkan di sini</p>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Scan QR Code menggunakan aplikasi e-wallet atau m-banking Anda
            </p>
          </CardContent>
        </Card>
      )}

      {/* E-Wallet Payment */}
      {payment.payment_method === 'e_wallet' && payment.status === 'pending' && providerInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Pembayaran {providerInfo.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                Pembayaran akan diproses melalui {providerInfo.name}
              </p>
              <p className="text-lg font-semibold">{formatCurrency(payment.amount)}</p>
            </div>
            <Button className="w-full">Bayar dengan {providerInfo.name}</Button>
          </CardContent>
        </Card>
      )}

      {/* Upload Proof Section */}
      {payment.status === 'pending' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Bukti Pembayaran
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {previewUrl ? (
              <div className="space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-lg border">
                  <img
                    src={previewUrl}
                    alt="Bukti Pembayaran"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                  >
                    Ganti Gambar
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleUpload}
                    disabled={uploadProof.isPending}
                  >
                    {uploadProof.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mengupload...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Bukti
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <label
                  htmlFor="proof"
                  className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:bg-muted/50"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-medium">Klik untuk upload</span> atau drag dan drop
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG atau JPEG (MAX. 5MB)</p>
                  </div>
                  <input
                    id="proof"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Payment Complete */}
      {payment.status === 'paid' && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Pembayaran Berhasil</h3>
            <p className="mb-6 text-muted-foreground">
              Pembayaran Anda telah dikonfirmasi. Pesanan akan segera diproses.
            </p>
            <Button asChild>
              <Link href={ROUTES.ACCOUNT.ORDER_DETAIL(orderId)}>Lihat Detail Pesanan</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
