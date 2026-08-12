'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Minus, Plus, Share2, Truck, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Rating, PriceDisplay } from '@/components/common';
import { cn } from '@/lib/utils';

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice: number | null;
    quantity: number;
    category: { id: string; name: string; slug: string };
    variants: { id: string; name: string; options: { name: string; value: string }[] }[];
    isFeatured: boolean;
    isNewArrival: boolean;
    isBestSeller: boolean;
    rating: number;
    reviewCount: number;
    weight: number | null;
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const inStock = product.quantity > 0;

  const incrementQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity((q) => q + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.isNewArrival && <Badge variant="secondary">Baru</Badge>}
        {product.isBestSeller && <Badge>Terlaris</Badge>}
        {product.isFeatured && <Badge className="bg-primary">Pilihan</Badge>}
        {!inStock && <Badge variant="destructive">Stok Habis</Badge>}
      </div>

      {/* Name and Rating */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {product.name}
        </h1>
        <div className="mt-2 flex items-center gap-4">
          <Rating value={product.rating} showValue count={product.reviewCount} />
          <Link href="#reviews" className="text-sm text-primary hover:underline">
            Lihat ulasan
          </Link>
        </div>
      </div>

      {/* Price */}
      <PriceDisplay price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />

      {/* Category */}
      <div className="text-sm">
        <span className="text-muted-foreground">Kategori: </span>
        <Link
          href={`/products/category/${product.category.slug}`}
          className="text-primary hover:underline"
        >
          {product.category.name}
        </Link>
      </div>

      <Separator />

      {/* Variants */}
      {product.variants.length > 0 && (
        <div className="space-y-4">
          {product.variants.map((variant) => (
            <div key={variant.id}>
              <Label className="mb-2 block">{variant.name}</Label>
              <Select value={selectedVariant || undefined} onValueChange={setSelectedVariant}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Pilih ${variant.name}`} />
                </SelectTrigger>
                <SelectContent>
                  {variant.options.map((option) => (
                    <SelectItem
                      key={`${variant.id}-${option.value}`}
                      value={`${variant.id}-${option.value}`}
                    >
                      {option.name}: {option.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}

      {/* Quantity */}
      <div>
        <Label className="mb-2 block">Jumlah</Label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Math.min(product.quantity, Number(e.target.value))))
            }
            className="w-20 text-center"
            min={1}
            max={product.quantity}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={incrementQuantity}
            disabled={quantity >= product.quantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <span className="ml-2 text-sm text-muted-foreground">{product.quantity} tersedia</span>
        </div>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="flex-1 gap-2" disabled={!inStock}>
          <ShoppingCart className="h-5 w-5" />
          {inStock ? 'Tambah ke Keranjang' : 'Stok Habis'}
        </Button>
        <Button size="lg" variant="secondary" className="flex-1" disabled={!inStock}>
          Beli Sekarang
        </Button>
        <Button size="lg" variant="outline">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Wishlist</span>
        </Button>
        <Button size="lg" variant="outline">
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Share</span>
        </Button>
      </div>

      {/* Additional Info */}
      <div className="grid gap-4 rounded-lg bg-muted/50 p-4 text-sm sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Truck className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-medium">Pengiriman</p>
            <p className="text-muted-foreground">Ke seluruh Indonesia</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-medium">Garansi</p>
            <p className="text-muted-foreground">100% Original</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <RefreshCw className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-medium">Pengembalian</p>
            <p className="text-muted-foreground">7 hari maksimal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
