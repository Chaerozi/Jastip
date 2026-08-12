'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Loader2,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Copy,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { OrderTimeline } from '@/components/customer/order-timeline';
import { PaymentCard } from '@/components/customer/payment-card';
import { useOrder, useCancelOrder } from '@/hooks/use-customer';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { ROUTES } from '@/constants/routes';
import type { CustomerOrderStatus } from '@/types/customer';
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

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const { data: order, isLoading } = useOrder(orderId);
  const cancelOrder = useCancelOrder();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="py-12 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">Pesanan tidak ditemukan</p>
          <Button asChild className="mt-4">
            <Link href={ROUTES.ACCOUNT.ORDERS}>Kembali ke Daftar Pesanan</Link>
          </Button>
        </div>
      </div>
    );
  }

  const status = statusConfig[order.status];

  const handleCancel = async () => {
    await cancelOrder.mutateAsync(orderId);
  };

  const handlePayment = () => {
    router.push(ROUTES.ACCOUNT.PAYMENT(orderId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href={ROUTES.ACCOUNT.ORDERS}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{order.order_number}</h1>
          <p className="text-muted-foreground">{formatDate(order.created_at)}</p>
        </div>
        <Badge variant={status.variant} className="text-sm">
          <status.icon className="mr-1 h-4 w-4" />
          {status.label}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Status Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderTimeline currentStatus={order.status} createdAt={order.created_at} />
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Item Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-muted">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity}x {formatCurrency(item.price)}
                      </p>
                    </div>
                    <p className="font-semibold">{formatCurrency(item.subtotal)}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
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
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Alamat Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent>
              {order.shipping_address ? (
                <div className="space-y-2">
                  <p className="font-medium">{order.shipping_address.recipient_name}</p>
                  <p className="text-muted-foreground">{order.shipping_address.phone}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.shipping_address.full_address}, {order.shipping_address.district},{' '}
                    {order.shipping_address.city}, {order.shipping_address.province}{' '}
                    {order.shipping_address.postal_code}
                  </p>
                  {order.shipping_method && (
                    <p className="mt-2 text-sm">
                      <span className="text-muted-foreground">Metode: </span>
                      <span className="font-medium">{order.shipping_method}</span>
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">Alamat tidak tersedia</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          {/* Payment Info */}
          {order.payment && <PaymentCard payment={order.payment} onUploadProof={handlePayment} />}

          {/* Actions */}
          <Card>
            <CardContent className="space-y-3 p-6">
              {order.status === 'pending' && (
                <>
                  <Button className="w-full" onClick={handlePayment}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Bayar Sekarang
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="w-full text-destructive">
                        Batalkan Pesanan
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Batalkan Pesanan</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin membatalkan pesanan ini? Tindakan ini tidak dapat
                          dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Tidak</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleCancel}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {cancelOrder.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Membatalkan...
                            </>
                          ) : (
                            'Ya, Batalkan'
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}

              {order.status === 'delivered' && (
                <Button className="w-full" variant="outline" asChild>
                  <Link href={ROUTES.ACCOUNT.ORDER_DETAIL(orderId)}>Tulis Review</Link>
                </Button>
              )}

              <Button className="w-full" variant="outline" asChild>
                <Link href={`/contact?order=${order.order_number}`}>Hubungi Customer Service</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Order Info */}
          <Card>
            <CardContent className="space-y-3 p-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">No. Pesanan</span>
                <span className="font-medium">{order.order_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tanggal Pesanan</span>
                <span>{formatDate(order.created_at)}</span>
              </div>
              {order.notes && (
                <div>
                  <span className="text-muted-foreground">Catatan:</span>
                  <p className="mt-1">{order.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
