'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  isPrimary: boolean;
}

interface ProductGalleryProps {
  images: ProductImage[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const hasImages = images && images.length > 0;

  const sortedImages = hasImages
    ? [...images].sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
    : [];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        {hasImages && sortedImages[selectedIndex] ? (
          <Image
            src={sortedImages[selectedIndex].url}
            alt={sortedImages[selectedIndex].alt || name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {hasImages && sortedImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sortedImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                selectedIndex === index
                  ? 'border-primary'
                  : 'border-transparent hover:border-muted-foreground/30'
              )}
            >
              <Image
                src={image.url}
                alt={image.alt || `${name} ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
