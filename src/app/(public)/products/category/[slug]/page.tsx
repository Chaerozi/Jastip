'use client';

import { use, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ProductGrid, ProductCard, Pagination, PaginationInfo } from '@/components/common';
import { ProductSort } from '@/components/products';
import { PageContainer, PageHeader, ProductGridSkeleton, NoResults } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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

interface CategoryProductsResponse {
  category: { id: string; name: string; slug: string; description: string | null };
  products: Product[];
  meta: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
}

async function fetchCategoryProducts(slug: string): Promise<CategoryProductsResponse | null> {
  // TODO: Replace with actual API call
  return null;
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryProductsPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || 'newest';

  const { data, isLoading, error } = useQuery({
    queryKey: ['category', slug, 'products', page, sort],
    queryFn: () => fetchCategoryProducts(slug),
    staleTime: 1000 * 60 * 5,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`/products/category/${slug}?${params.toString()}`);
  };

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    params.delete('page');
    router.push(`/products/category/${slug}?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get('q') as string;
    const params = new URLSearchParams(searchParams.toString());
    if (q) {
      params.set('q', q);
    } else {
      params.delete('q');
    }
    params.delete('page');
    router.push(`/products/category/${slug}?${params.toString()}`);
  };

  return (
    <PageContainer>
      <PageHeader
        title={data?.category.name || 'Kategori'}
        description={data?.category.description || 'Temukan produk terbaik dalam kategori ini'}
        breadcrumbs={[
          { label: 'Produk', href: '/products' },
          { label: 'Kategori', href: '/categories' },
          { label: data?.category.name || 'Loading...' },
        ]}
      />

      <div className="mt-8">
        {/* Sort and Search Bar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <form onSubmit={handleSearch} className="flex flex-1 gap-2">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input name="q" placeholder="Cari dalam kategori ini..." className="pl-10" />
            </div>
            <Button type="submit" variant="secondary">
              Cari
            </Button>
          </form>
          <ProductSort value={sort} onValueChange={handleSortChange} />
        </div>

        {isLoading ? (
          <ProductGridSkeleton count={12} />
        ) : error || !data ? (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
            <p className="text-sm text-destructive">Gagal memuat produk</p>
          </div>
        ) : data.products.length > 0 ? (
          <>
            <div className="mb-4">
              <PaginationInfo
                currentPage={page}
                totalPages={data.meta.totalPages}
                totalItems={data.meta.totalItems}
                itemsPerPage={data.meta.perPage}
              />
            </div>
            <ProductGrid>
              {data.products.map((product) => (
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
            {data.meta.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={data.meta.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <NoResults />
        )}
      </div>
    </PageContainer>
  );
}
