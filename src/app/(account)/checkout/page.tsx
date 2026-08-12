'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, MapPin, Truck, CreditCard, CheckCircle, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AddressCard } from '@/components/customer/address-card';
import { EmptyState } from '@/components/customer/empty-states';
import { useCart, useAddresses, useCreateOrder, useCreatePayment } from '@/hooks/use-customer';
import {
  SHIPPING_METHODS,
  PAYMENT_METHODS,
  type CustomerPaymentMethod,
  type CustomerPaymentProvider,
} from '@/types/customer';
import { formatCurrency } from '@/utils/format-currency';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const shippingSchema = z.object({
  shipping_address_id: z.string().min(1, 'Pilih alamat pengiriman'),
  shipping_method: z.string().min(1, 'Pilih metode pengiriman'),
  payment_method: z.string().min(1, 'Pilih metode pembayaran'),
  payment_provider: z.string().optional(),
  notes: z.string().optional(),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cart } = useCart();
  const { data: addresses } = useAddresses();
  const createOrder = useCreateOrder();
  const createPayment = useCreatePayment();

  const [step, setStep] = useState<'address' | 'shipping' | 'payment' | 'review'>('address');
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<CustomerPaymentMethod | null>(
    null
  );
  const [selectedProvider, setSelectedProvider] = useState<CustomerPaymentProvider | null>(null);

  const subtotal = cart?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const shippingCost = SHIPPING_METHODS.find((m) => m.id === selectedShipping)?.cost || 0;
  const total = subtotal + shippingCost;

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  const handleShippingSelect = (methodId: string) => {
    setSelectedShipping(methodId);
  };

  const handlePaymentSelect = (method: string, provider?: string) => {
    setSelectedPaymentMethod(method as CustomerPaymentMethod);
    if (provider) {
      setSelectedProvider(provider as CustomerPaymentProvider);
    }
  };

  const handleNextStep = () => {
    if (step === 'address' && selectedAddress) {
      setStep('shipping');
    } else if (step === 'shipping' && selectedShipping) {
      setStep('payment');
    } else if (step === 'payment' && selectedPaymentMethod) {
      setStep('review');
    }
  };

  const handlePrevStep = () => {
    if (step === 'shipping') setStep('address');
    else if (step === 'payment') setStep('shipping');
    else if (step === 'review') setStep('payment');
  };

  const handleSubmitOrder = async () => {
    if (!selectedAddress || !selectedShipping || !selectedPaymentMethod || !cart?.items) {
      return;
    }

    try {
      const order = await createOrder.mutateAsync({
        shipping_address_id: selectedAddress,
        shipping_method: selectedShipping,
        shipping_cost: shippingCost,
        items: cart.items.map((item) => ({
          product_id: item.product_id,
          product_name: `Product ${item.product_id.slice(0, 8)}`,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal,
      });

      if (order) {
        await createPayment.mutateAsync({
          order_id: order.id,
          payment_method: selectedPaymentMethod,
          payment_provider: selectedProvider || undefined,
          amount: total,
        });

        router.push(ROUTES.ACCOUNT.PAYMENT(order.id));
      }
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl">
        <EmptyState type="cart" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {(['address', 'shipping', 'payment', 'review'] as const).map((s, i) => {
          const isActive = step === s;
          const isCompleted =
            (s === 'address' && !!selectedAddress) ||
            (s === 'shipping' && !!selectedShipping) ||
            (s === 'payment' && !!selectedPaymentMethod) ||
            (s === 'review' && false);

          return (
            <div key={s} className="flex items-center">
              <div
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : isCompleted
                      ? 'bg-success/10 text-success'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted && !isActive ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span>{i + 1}</span>
                )}
                <span className="hidden capitalize sm:inline">{s}</span>
              </div>
              {i < 3 && <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />}
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Step 1: Address Selection */}
          {step === 'address' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Pilih Alamat Pengiriman
                </CardTitle>
                <CardDescription>Pilih alamat tujuan pengiriman pesanan Anda</CardDescription>
              </CardHeader>
              <CardContent>
                {addresses && addresses.length > 0 ? (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <AddressCard
                        key={address.id}
                        address={address}
                        selectable
                        isSelected={selectedAddress === address.id}
                        onSelect={handleAddressSelect}
                        showActions={false}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="mb-4 text-muted-foreground">
                      Anda belum memiliki alamat pengiriman
                    </p>
                    <Button asChild>
                      <Link href={ROUTES.ACCOUNT.NEW_ADDRESS}>Tambah Alamat</Link>
                    </Button>
                  </div>
                )}

                <Separator className="my-4" />

                <div className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={ROUTES.CART}>Kembali ke Keranjang</Link>
                  </Button>
                  <Button disabled={!selectedAddress} onClick={handleNextStep}>
                    Lanjut: Pengiriman
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Shipping Method */}
          {step === 'shipping' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Pilih Metode Pengiriman
                </CardTitle>
                <CardDescription>
                  Pilih metode pengiriman yang sesuai dengan kebutuhan Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedShipping || ''}
                  onValueChange={setSelectedShipping}
                  className="space-y-3"
                >
                  {SHIPPING_METHODS.map((method) => (
                    <div
                      key={method.id}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                        selectedShipping === method.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div>
                          <Label htmlFor={method.id} className="cursor-pointer font-medium">
                            {method.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Estimasi: {method.estimated_days}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">{formatCurrency(method.cost)}</span>
                    </div>
                  ))}
                </RadioGroup>

                <Separator className="my-4" />

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Kembali
                  </Button>
                  <Button disabled={!selectedShipping} onClick={handleNextStep}>
                    Lanjut: Pembayaran
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Payment Method */}
          {step === 'payment' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Pilih Metode Pembayaran
                </CardTitle>
                <CardDescription>Pilih metode pembayaran yang Anda preferensikan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {PAYMENT_METHODS.map((method) => (
                    <div key={method.id} className="space-y-3">
                      <h3 className="font-medium">{method.name}</h3>
                      <RadioGroup
                        value={selectedPaymentMethod === method.id ? method.id : ''}
                        onValueChange={(value) => {
                          setSelectedPaymentMethod(value as CustomerPaymentMethod);
                          if (!method.providers) {
                            setSelectedProvider(null);
                          }
                        }}
                        className="grid gap-3 sm:grid-cols-2"
                      >
                        {method.providers ? (
                          method.providers.map((provider) => (
                            <div
                              key={provider}
                              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                                selectedPaymentMethod === method.id && selectedProvider === provider
                                  ? 'border-primary bg-primary/5'
                                  : 'hover:border-primary/50'
                              }`}
                              onClick={() => {
                                setSelectedPaymentMethod(method.id);
                                setSelectedProvider(provider);
                              }}
                            >
                              <RadioGroupItem value={method.id} id={`${method.id}-${provider}`} />
                              <Label
                                htmlFor={`${method.id}-${provider}`}
                                className="cursor-pointer"
                              >
                                {method.id === 'bank_transfer'
                                  ? `Bank ${provider.toUpperCase()}`
                                  : provider.charAt(0).toUpperCase() + provider.slice(1)}
                              </Label>
                            </div>
                          ))
                        ) : (
                          <div
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                              selectedPaymentMethod === method.id
                                ? 'border-primary bg-primary/5'
                                : 'hover:border-primary/50'
                            }`}
                          >
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label htmlFor={method.id} className="cursor-pointer">
                              Bayar dengan QRIS
                            </Label>
                          </div>
                        )}
                      </RadioGroup>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Kembali
                  </Button>
                  <Button disabled={!selectedPaymentMethod} onClick={handleNextStep}>
                    Review Pesanan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review Order */}
          {step === 'review' && (
            <Card>
              <CardHeader>
                <CardTitle>Review Pesanan Anda</CardTitle>
                <CardDescription>
                  Pastikan semua informasi sudah benar sebelum melanjutkan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Shipping Address */}
                  <div>
                    <h4 className="mb-2 font-medium">Alamat Pengiriman</h4>
                    <div className="rounded-lg bg-muted p-3">
                      {addresses?.find((a) => a.id === selectedAddress)?.full_address}
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div>
                    <h4 className="mb-2 font-medium">Metode Pengiriman</h4>
                    <div className="rounded-lg bg-muted p-3">
                      {SHIPPING_METHODS.find((m) => m.id === selectedShipping)?.name} -{' '}
                      {formatCurrency(shippingCost)}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h4 className="mb-2 font-medium">Metode Pembayaran</h4>
                    <div className="rounded-lg bg-muted p-3">
                      {selectedPaymentMethod?.charAt(0).toUpperCase()}
                      {selectedPaymentMethod?.slice(1).replace('_', ' ')}
                      {selectedProvider && ` - ${selectedProvider.toUpperCase()}`}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="mb-2 font-medium">Item Pesanan</h4>
                    <div className="space-y-2">
                      {cart?.items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between rounded-lg bg-muted p-3"
                        >
                          <span>
                            Product {item.product_id.slice(0, 8)} x {item.quantity}
                          </span>
                          <span>{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Kembali
                  </Button>
                  <Button
                    onClick={handleSubmitOrder}
                    disabled={createOrder.isPending || createPayment.isPending}
                  >
                    {createOrder.isPending || createPayment.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      'Bayar Sekarang'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cart?.items?.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Product x{item.quantity}</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Ongkos Kirim</span>
                <span>{formatCurrency(shippingCost)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
