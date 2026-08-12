'use client';

import { Package, Heart, ShoppingCart, Bell, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type EmptyStateType = 'orders' | 'wishlist' | 'cart' | 'notifications' | 'addresses' | 'search';

interface EmptyStateProps {
  type: EmptyStateType;
  title?: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

const emptyStateConfig: Record<
  EmptyStateType,
  { icon: typeof Package; defaultTitle: string; defaultDescription: string }
> = {
  orders: {
    icon: Package,
    defaultTitle: 'Belum ada pesanan',
    defaultDescription: 'Anda belum memiliki pesanan. Mulai berbelanja sekarang!',
  },
  wishlist: {
    icon: Heart,
    defaultTitle: 'Wishlist kosong',
    defaultDescription: 'Simpan produk favorit Anda di wishlist.',
  },
  cart: {
    icon: ShoppingCart,
    defaultTitle: 'Keranjang kosong',
    defaultDescription: 'Tambahkan produk ke keranjang untuk mulai berbelanja.',
  },
  notifications: {
    icon: Bell,
    defaultTitle: 'Tidak ada notifikasi',
    defaultDescription: 'Anda tidak memiliki notifikasi saat ini.',
  },
  addresses: {
    icon: MapPin,
    defaultTitle: 'Belum ada alamat',
    defaultDescription: 'Tambahkan alamat pengiriman untuk kemudahan checkout.',
  },
  search: {
    icon: Search,
    defaultTitle: 'Tidak ada hasil',
    defaultDescription: 'Coba kata kunci lain atau ubah filter pencarian.',
  },
};

const defaultActions: Record<EmptyStateType, { label: string; href: string } | null> = {
  orders: { label: 'Mulai Belanja', href: '/products' },
  wishlist: { label: 'Jelajahi Produk', href: '/products' },
  cart: { label: 'Belanja Sekarang', href: '/products' },
  notifications: null,
  addresses: { label: 'Tambah Alamat', href: '/account/addresses/new' },
  search: null,
};

export function EmptyState({ type, title, description, action, className }: EmptyStateProps) {
  const config = emptyStateConfig[type];
  const Icon = config.icon;
  const defaultAction = defaultActions[type];

  const finalTitle = title || config.defaultTitle;
  const finalDescription = description || config.defaultDescription;
  const finalAction = action || defaultAction;

  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{finalTitle}</h3>
      <p className="mb-6 max-w-sm text-muted-foreground">{finalDescription}</p>
      {finalAction && (
        <>
          {'href' in finalAction && finalAction.href ? (
            <Button asChild>
              <Link href={finalAction.href}>{finalAction.label}</Link>
            </Button>
          ) : (
            <Button onClick={'onClick' in finalAction ? finalAction.onClick : undefined}>
              {finalAction.label}
            </Button>
          )}
        </>
      )}
    </div>
  );
}

interface LoadingStateProps {
  type?: 'card' | 'list' | 'grid';
  count?: number;
  className?: string;
}

export function LoadingState({ type = 'card', count = 3, className }: LoadingStateProps) {
  if (type === 'grid') {
    return (
      <div className={cn('grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className={cn('space-y-4', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-4 rounded-lg bg-muted/50 p-4">
            <div className="h-16 w-16 animate-pulse rounded bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
      ))}
    </div>
  );
}
