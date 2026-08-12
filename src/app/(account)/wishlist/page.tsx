'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState, LoadingState } from '@/components/customer/empty-states';
import { useWishlist, useRemoveFromWishlist } from '@/hooks/use-customer';
import { formatCurrency } from '@/utils/format-currency';
import { ROUTES } from '@/constants/routes';
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

interface WishlistProduct {
  id: string;
  name?: string;
  price?: number;
  image?: string;
  slug?: string;
}

// Mock product data - in real app, this would come from product fetch
const mockProducts: Record<string, WishlistProduct> = {
  // Placeholder for product data
};

export default function WishlistPage() {
  const { data: wishlistItems, isLoading } = useWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleRemoveClick = (productId: string) => {
    setSelectedProductId(productId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmRemove = async () => {
    if (selectedProductId) {
      await removeFromWishlist.mutateAsync(selectedProductId);
      setDeleteDialogOpen(false);
      setSelectedProductId(null);
    }
  };

  const handleMoveToCart = async (productId: string) => {
    // In real app, add to cart and remove from wishlist
  };

  if (isLoading) {
    return <LoadingState type="grid" count={6} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Wishlist Saya</h1>
          <p className="text-muted-foreground">{wishlistItems?.length || 0} produk disimpan</p>
        </div>
      </div>

      {wishlistItems && wishlistItems.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((item) => {
            const product = mockProducts[item.product_id] || {
              id: item.product_id,
              name: 'Product Name',
              price: 0,
              image: null,
              slug: item.product_id,
            };

            return (
              <Card key={item.id} className="group overflow-hidden">
                <div className="relative aspect-square bg-muted">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Heart className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => handleRemoveClick(item.product_id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Badge className="absolute bottom-2 left-2" variant="secondary">
                    <Heart className="mr-1 h-3 w-3 fill-current" />
                    Wishlist
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <Link href={ROUTES.PRODUCTS.DETAIL(product.slug || product.id)}>
                    <h3 className="mb-2 line-clamp-2 font-medium hover:text-primary">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="mb-4 text-lg font-semibold">{formatCurrency(product.price || 0)}</p>
                  <Button className="w-full" onClick={() => handleMoveToCart(item.product_id)}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Pindahkan ke Keranjang
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState type="wishlist" />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus dari Wishlist</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus produk ini dari wishlist Anda?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRemove}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {removeFromWishlist.isPending ? (
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
