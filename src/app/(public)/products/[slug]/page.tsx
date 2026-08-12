'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PageContainer, PageHeader, ProductDetailSkeleton } from '@/components/shared';
import { ProductGallery } from '@/components/products/product-gallery';
import { ProductInfo } from '@/components/products/product-info';
import { ProductDescription } from '@/components/products/product-description';
import { ProductReviews } from '@/components/products/product-reviews';
import { RelatedProducts } from '@/components/products/related-products';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductDetail {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  shortDescription: string | null;
  price: number;
  compareAtPrice: number | null;
  quantity: number;
  sku: string | null;
  categoryId: string;
  category: { id: string; name: string; slug: string };
  images: { id: string; url: string; alt: string | null; isPrimary: boolean }[];
  variants: { id: string; name: string; options: { name: string; value: string }[] }[];
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  weight: number | null;
  dimensions: { length: number; width: number; height: number; unit: string } | null;
  rating: number;
  reviewCount: number;
}

async function fetchProductDetail(slug: string): Promise<ProductDetail | null> {
  // TODO: Replace with actual API call
  return null;
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = use(params);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProductDetail(slug),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <PageContainer>
        <ProductDetailSkeleton />
      </PageContainer>
    );
  }

  if (error || !product) {
    return (
      <PageContainer>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
          <h1 className="text-lg font-semibold">Produk Tidak Ditemukan</h1>
          <p className="mt-2 text-muted-foreground">Maaf, produk yang Anda cari tidak tersedia.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title={product.name}
        breadcrumbs={[
          { label: 'Produk', href: '/products' },
          { label: product.category.name, href: `/products/category/${product.category.slug}` },
          { label: product.name },
        ]}
        className="mb-6"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>

      <Separator className="my-8" />

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description">Deskripsi</TabsTrigger>
          <TabsTrigger value="reviews">Ulasan ({product.reviewCount})</TabsTrigger>
          <TabsTrigger value="specifications">Spesifikasi</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <ProductDescription
            description={product.description}
            shortDescription={product.shortDescription}
            tags={product.tags}
          />
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <ProductReviews
            productId={product.id}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 font-semibold">Spesifikasi Produk</h3>
            <dl className="space-y-2 text-sm">
              {product.sku && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">SKU</dt>
                  <dd>{product.sku}</dd>
                </div>
              )}
              {product.weight && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Berat</dt>
                  <dd>{product.weight} gram</dd>
                </div>
              )}
              {product.dimensions && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Dimensi</dt>
                  <dd>
                    {product.dimensions.length} x {product.dimensions.width} x{' '}
                    {product.dimensions.height} {product.dimensions.unit}
                  </dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Kategori</dt>
                <dd>{product.category.name}</dd>
              </div>
            </dl>
          </div>
        </TabsContent>
      </Tabs>

      <RelatedProducts productId={product.id} categoryId={product.categoryId} />

      <Separator className="my-8" />
    </PageContainer>
  );
}
