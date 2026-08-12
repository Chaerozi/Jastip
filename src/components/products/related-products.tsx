'use client';

import { ProductGrid, ProductCard } from '@/components/common';
import { SectionHeader } from '@/components/shared';
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
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  inStock?: boolean;
}

async function fetchRelatedProducts(productId: string, categoryId: string): Promise<Product[]> {
  // TODO: Replace with actual API call
  return [];
}

interface RelatedProductsProps {
  productId: string;
  categoryId: string;
}

export function RelatedProducts({ productId, categoryId }: RelatedProductsProps) {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'related', productId, categoryId],
    queryFn: () => fetchRelatedProducts(productId, categoryId),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className="mt-12">
      <SectionHeader title="Produk Terkait" description="Produk serupa yang mungkin Anda sukai" />

      {isLoading ? (
        <ProductGridSkeleton count={4} />
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
              isFeatured={product.isFeatured}
              isNewArrival={product.isNewArrival}
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
                <p className="truncate text-sm font-medium">Produk Terkait</p>
                <p className="mt-1 font-semibold text-primary">Rp ---</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
