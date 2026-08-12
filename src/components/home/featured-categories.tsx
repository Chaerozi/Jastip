'use client';

import { CategoryGrid, CategoryCard } from '@/components/common';
import { SectionHeader, Section } from '@/components/shared';
import { CategoryCardSkeleton } from '@/components/shared/skeleton';
import { useQuery } from '@tanstack/react-query';

// Placeholder type for category data
interface Category {
  id: string;
  slug: string;
  name: string;
  image?: string | null;
  productCount?: number;
}

async function fetchFeaturedCategories(): Promise<Category[]> {
  // TODO: Replace with actual API call
  return [];
}

export function FeaturedCategories() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories', 'featured'],
    queryFn: fetchFeaturedCategories,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Section>
      <SectionHeader
        title="Kategori Populer"
        description="Temukan produk sesuai kebutuhan Anda"
        action={{ label: 'Lihat Semua', href: '/categories' }}
      />

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
          <p className="text-sm text-destructive">Gagal memuat kategori</p>
        </div>
      ) : categories && categories.length > 0 ? (
        <CategoryGrid columns={6}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              slug={category.slug}
              name={category.name}
              image={category.image}
              productCount={category.productCount}
            />
          ))}
        </CategoryGrid>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
          {['Elektronik', 'Fashion', 'Rumah Tangga', 'Otomotif', 'Kecantikan', 'Kesehatan'].map(
            (name, index) => (
              <div key={name} className="group overflow-hidden rounded-lg">
                <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
                  <span className="text-4xl font-bold text-primary/40">{name.charAt(0)}</span>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium">{name}</p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </Section>
  );
}
