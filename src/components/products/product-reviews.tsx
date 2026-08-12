'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Rating, RatingSummary } from '@/components/common';
import { useQuery } from '@tanstack/react-query';

interface Review {
  id: string;
  userId: string;
  user: { name: string };
  rating: number;
  comment: string;
  images: { id: string; url: string }[];
  createdAt: string;
}

interface ReviewsResponse {
  data: Review[];
  average: number;
  total: number;
  distribution: Record<number, number>;
}

async function fetchReviews(
  productId: string,
  page: number,
  sort: string
): Promise<ReviewsResponse | null> {
  // TODO: Replace with actual API call
  return null;
}

interface ProductReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

export function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('newest');

  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ['reviews', productId, page, sort],
    queryFn: () => fetchReviews(productId, page, sort),
    staleTime: 1000 * 60 * 5,
  });

  const sortOptions = [
    { value: 'newest', label: 'Terbaru' },
    { value: 'oldest', label: 'Terlama' },
    { value: 'highest', label: 'Rating Tertinggi' },
    { value: 'lowest', label: 'Rating Terendah' },
  ];

  // Default distribution
  const distribution = reviewsData?.distribution || {
    5: Math.round(reviewCount * 0.6),
    4: Math.round(reviewCount * 0.2),
    3: Math.round(reviewCount * 0.1),
    2: Math.round(reviewCount * 0.05),
    1: Math.round(reviewCount * 0.05),
  };

  return (
    <div id="reviews" className="scroll-mt-24">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Ulasan Pelanggan</h3>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-md border px-3 py-1.5 text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {/* Rating Summary */}
        <div className="rounded-lg border p-6">
          <RatingSummary
            average={reviewsData?.average || rating}
            total={reviewsData?.total || reviewCount}
            distribution={distribution}
          />
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div className="space-y-2">
                      <div className="h-4 w-24 rounded bg-muted" />
                      <div className="h-3 w-16 rounded bg-muted" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-2/3 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : reviewsData?.data && reviewsData.data.length > 0 ? (
            <>
              {reviewsData.data.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
              {reviewsData.total > reviewsData.data.length && (
                <div className="text-center">
                  <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
                    Lihat Lebih Banyak
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">Belum ada ulasan untuk produk ini.</p>
              <Button variant="outline" className="mt-4">
                Tulis Ulasan
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-medium">
            {review.user.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{review.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
        <Rating value={review.rating} size="sm" />
      </div>
      <p className="mt-3 text-muted-foreground">{review.comment}</p>
      {review.images.length > 0 && (
        <div className="mt-3 flex gap-2">
          {review.images.map((image) => (
            <div key={image.id} className="relative h-16 w-16 overflow-hidden rounded-lg">
              <Image
                src={image.url}
                alt="Review image"
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
