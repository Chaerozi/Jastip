'use client';

import { ProductGrid, ProductCard } from '@/components/common';
import { SectionHeader, Section } from '@/components/shared';
import { ProductGridSkeleton } from '@/components/shared/skeleton';
import { useQuery } from '@tanstack/react-query';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  image?: string | null;
  rating?: number;
  reviewCount?: number;
  isBestSeller?: boolean;
  inStock?: boolean;
}

async function fetchBestSellers(): Promise<Product[]> {
  // TODO: Replace with actual API call
  return [];
}

export function BestSellers() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', 'best-sellers'],
    queryFn: fetchBestSellers,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Section>
      <SectionHeader
        title="Produk Terlaris"
        subtitle="Best Sellers"
        description="Produk paling diminati oleh pelanggan kami"
        action={{ label: 'Lihat Semua', href: '/products?bestseller=true' }}
      />

      {isLoading ? (
        <ProductGridSkeleton count={4} />
      ) : error ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
          <p className="text-sm text-destructive">Gagal memuat produk</p>
        </div>
      ) : products && products.length > 0 ? (
        <ProductGrid>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              image={product.image}
              rating={product.rating}
              reviewCount={product.reviewCount}
              isBestSeller={product.isBestSeller}
              inStock={product.inStock}
            />
          ))}
        </ProductGrid>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="group overflow-hidden rounded-lg border bg-card">
              <div className="flex aspect-square items-center justify-center bg-muted">
                <span className="text-muted-foreground">Produk {index + 1}</span>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium">Produk Terlaris</p>
                <p className="mt-1 font-semibold text-primary">Rp ---</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
