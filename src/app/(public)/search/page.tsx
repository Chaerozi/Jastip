'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ProductGrid, ProductCard, Pagination, PaginationInfo } from '@/components/common';
import { ProductSort } from '@/components/products';
import { PageContainer, PageHeader, ProductGridSkeleton, NoResults } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Clock, X } from 'lucide-react';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  image?: string | null;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
}

interface SearchResponse {
  data: Product[];
  meta: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
  suggestions: string[];
}

async function performSearch(
  query: string,
  page: number,
  sort: string
): Promise<SearchResponse | null> {
  // TODO: Replace with actual API call
  return null;
}

const popularSearches = ['iPhone', 'Laptop', 'Headphone', 'Sepatu', 'Tas', 'Kosmetik'];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || 'relevance';

  const [inputValue, setInputValue] = useState(query);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('recentSearches');
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', query, page, sort],
    queryFn: () => performSearch(query, page, sort),
    enabled: !!query,
    staleTime: 1000 * 60 * 2,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newRecentSearches = [
      inputValue.trim(),
      ...recentSearches.filter((s) => s !== inputValue.trim()),
    ].slice(0, 5);

    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

    router.push(`/search?q=${encodeURIComponent(inputValue.trim())}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`/search?${params.toString()}`);
  };

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    params.delete('page');
    router.push(`/search?${params.toString()}`);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <PageContainer>
      <PageHeader
        title={query ? `Hasil pencarian "${query}"` : 'Cari Produk'}
        description={
          query ? `Menampilkan hasil untuk pencarian Anda` : 'Temukan produk yang Anda cari'
        }
        breadcrumbs={[{ label: 'Pencarian', href: '/search' }]}
      />

      <div className="mt-6">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex max-w-2xl gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              placeholder="Cari produk, kategori, atau merek..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="h-12 pl-10 text-base"
            />
          </div>
          <Button type="submit" size="lg">
            Cari
          </Button>
        </form>

        {/* Search History and Suggestions */}
        {!query && (
          <div className="mt-8 space-y-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-medium">
                    <Clock className="h-4 w-4" />
                    Pencarian Terakhir
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearRecentSearches}
                    className="text-muted-foreground"
                  >
                    Hapus Semua
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <Badge
                      key={term}
                      variant="secondary"
                      className="cursor-pointer gap-1 hover:bg-secondary/80"
                      onClick={() => {
                        setInputValue(term);
                        router.push(`/search?q=${encodeURIComponent(term)}`);
                      }}
                    >
                      {term}
                      <X className="h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-medium">
                <TrendingUp className="h-4 w-4" />
                Pencarian Populer
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <Badge
                    key={term}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => {
                      setInputValue(term);
                      router.push(`/search?q=${encodeURIComponent(term)}`);
                    }}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="mt-8">
            {isLoading ? (
              <ProductGridSkeleton count={12} />
            ) : error ? (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
                <p className="text-sm text-destructive">Gagal melakukan pencarian</p>
              </div>
            ) : data?.data && data.data.length > 0 ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <PaginationInfo
                    currentPage={page}
                    totalPages={data.meta.totalPages}
                    totalItems={data.meta.totalItems}
                    itemsPerPage={data.meta.perPage}
                  />
                  <ProductSort value={sort} onValueChange={handleSortChange} />
                </div>

                {/* Suggestions */}
                {data.suggestions.length > 0 && (
                  <div className="mb-4 text-sm text-muted-foreground">
                    Pencarian terkait:{' '}
                    {data.suggestions.map((suggestion, i) => (
                      <span key={suggestion}>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-primary"
                          onClick={() => router.push(`/search?q=${encodeURIComponent(suggestion)}`)}
                        >
                          {suggestion}
                        </Button>
                        {i < data.suggestions.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                )}

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
              <NoResults
                query={query}
                onClear={() => {
                  setInputValue('');
                  router.push('/search');
                }}
              />
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
