'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ProductGrid, ProductCard, Pagination, PaginationInfo } from '@/components/common';
import { PageContainer, PageHeader, ProductGridSkeleton, NoResults } from '@/components/shared';
import { ProductFilters } from '@/components/products/product-filters';
import { ProductSort } from '@/components/products/product-sort';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

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

interface ProductListResponse {
  data: Product[];
  meta: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
}

async function fetchProducts(params: URLSearchParams): Promise<ProductListResponse> {
  // TODO: Replace with actual API call
  return {
    data: [],
    meta: { currentPage: 1, perPage: 12, totalItems: 0, totalPages: 0 },
  };
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const page = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products', page, sort, search, category],
    queryFn: () => fetchProducts(new URLSearchParams(searchParams.toString())),
    staleTime: 1000 * 60 * 2,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`/products?${params.toString()}`);
  };

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    params.delete('page');
    router.push(`/products?${params.toString()}`);
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
    router.push(`/products?${params.toString()}`);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Semua Produk"
        description="Temukan produk terbaik dengan kualitas premium"
        breadcrumbs={[{ label: 'Produk', href: '/products' }]}
      />

      <div className="mt-8">
        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <form onSubmit={handleSearch} className="flex flex-1 gap-2">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="q"
                placeholder="Cari produk..."
                defaultValue={search}
                className="pl-10"
              />
            </div>
            <Button type="submit" variant="secondary">
              Cari
            </Button>
          </form>

          <div className="flex items-center gap-2">
            <ProductSort value={sort} onValueChange={handleSortChange} />
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 md:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle>Filter Produk</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <ProductFilters />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden w-64 shrink-0 md:block">
            <div className="sticky top-24">
              <ProductFilters />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <ProductGridSkeleton count={12} />
            ) : error ? (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
                <p className="text-sm text-destructive">Gagal memuat produk</p>
                <Button variant="outline" onClick={() => refetch()} className="mt-2">
                  Coba Lagi
                </Button>
              </div>
            ) : data?.data && data.data.length > 0 ? (
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
                  {data.data.map((product) => (
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
              <NoResults query={search} onClear={() => router.push('/products')} />
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
