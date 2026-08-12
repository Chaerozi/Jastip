'use client';

import { useQuery } from '@tanstack/react-query';
import { CategoryGrid, CategoryCard } from '@/components/common';
import { PageContainer, PageHeader, CategoryGridSkeleton } from '@/components/shared';
import { Folder } from 'lucide-react';

interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  productCount: number;
}

async function fetchCategories(): Promise<Category[]> {
  // TODO: Replace with actual API call
  return [];
}

export default function CategoriesPage() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories', 'all'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <PageContainer>
      <PageHeader
        title="Semua Kategori"
        description="Jelajahi produk berdasarkan kategori yang sesuai dengan kebutuhan Anda"
        breadcrumbs={[{ label: 'Kategori', href: '/categories' }]}
      />

      <div className="mt-8">
        {isLoading ? (
          <CategoryGridSkeleton count={12} />
        ) : error ? (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
            <p className="text-sm text-destructive">Gagal memuat kategori</p>
          </div>
        ) : categories && categories.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6">
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
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6">
            {[
              { name: 'Elektronik', slug: 'elektronik' },
              { name: 'Fashion', slug: 'fashion' },
              { name: 'Rumah Tangga', slug: 'rumah-tangga' },
              { name: 'Otomotif', slug: 'otomotif' },
              { name: 'Kecantikan', slug: 'kecantikan' },
              { name: 'Kesehatan', slug: 'kesehatan' },
              { name: 'Olahraga', slug: 'olahraga' },
              { name: 'Mainan', slug: 'mainan' },
              { name: 'Makanan', slug: 'makanan' },
              { name: 'Minuman', slug: 'minuman' },
              { name: 'Buku', slug: 'buku' },
              { name: 'Lainnya', slug: 'lainnya' },
            ].map((category) => (
              <div key={category.slug} className="group overflow-hidden rounded-lg border bg-card">
                <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
                  <Folder className="h-12 w-12 text-primary/40" />
                </div>
                <div className="p-3">
                  <p className="text-center text-sm font-medium">{category.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
