'use client';

import { useState } from 'react';
import { Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState, LoadingState } from '@/components/customer/empty-states';
import { CartSummary, QuantitySelector } from '@/components/customer/cart-summary';
import {
  useCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useApplyCoupon,
  useRemoveCoupon,
} from '@/hooks/use-customer';
import { formatCurrency } from '@/utils/format-currency';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function CartPage() {
  const router = useRouter();
  const { data: cart, isLoading } = useCart();
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();
  const applyCoupon = useApplyCoupon();
  const removeCoupon = useRemoveCoupon();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    if (quantity > 0) {
      await updateCartItem.mutateAsync({ itemId, quantity });
    }
  };

  const handleRemoveClick = (itemId: string) => {
    setSelectedItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmRemove = async () => {
    if (selectedItemId) {
      await removeCartItem.mutateAsync(selectedItemId);
      setDeleteDialogOpen(false);
      setSelectedItemId(null);
    }
  };

  const handleCheckout = () => {
    router.push(ROUTES.CHECKOUT);
  };

  if (isLoading) {
    return <LoadingState type="list" count={3} />;
  }

  const hasItems = cart?.items && cart.items.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Keranjang Belanja</h1>
        <p className="text-muted-foreground">
          {hasItems ? `${cart.items.length} item dalam keranjang` : 'Keranjang kosong'}
        </p>
      </div>

      {hasItems ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cart.items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded bg-muted">
                      <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link href={ROUTES.PRODUCTS.DETAIL(item.product_id)}>
                            <h3 className="line-clamp-1 font-medium hover:text-primary">
                              Product #{item.product_id.slice(0, 8)}
                            </h3>
                          </Link>
                          <p className="mt-1 text-lg font-semibold">{formatCurrency(item.price)}</p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveClick(item.id)}
                          disabled={removeCartItem.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(qty) => handleQuantityChange(item.id, qty)}
                          disabled={updateCartItem.isPending}
                        />

                        <p className="text-lg font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              cart={cart}
              coupon={null}
              isApplyingCoupon={applyCoupon.isPending}
              isRemovingCoupon={removeCoupon.isPending}
              onApplyCoupon={(code) => applyCoupon.mutateAsync(code)}
              onRemoveCoupon={() => removeCoupon.mutateAsync()}
              onCheckout={handleCheckout}
              checkoutDisabled={false}
            />
          </div>
        </div>
      ) : (
        <EmptyState type="cart" />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Item</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus item ini dari keranjang?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRemove}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {removeCartItem.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menghapus...
                </>
              ) : (
                'Hapus'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
