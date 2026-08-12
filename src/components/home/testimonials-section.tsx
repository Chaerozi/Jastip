'use client';

import { TestimonialGrid, TestimonialCard } from '@/components/common';
import { SectionHeader, Section } from '@/components/shared';
import { TestimonialCardSkeleton } from '@/components/shared/skeleton';
import { useQuery } from '@tanstack/react-query';

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  avatar?: string | null;
  content: string;
  rating?: number;
}

async function fetchTestimonials(): Promise<Testimonial[]> {
  // TODO: Replace with actual API call
  return [];
}

export function TestimonialsSection() {
  const {
    data: testimonials,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <Section>
      <SectionHeader
        title="Apa Kata Mereka"
        subtitle="Testimoni Pelanggan"
        description="Pengalaman belanja dari pelanggan setia kami"
        align="center"
      />

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <TestimonialCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
          <p className="text-sm text-destructive">Gagal memuat testimoni</p>
        </div>
      ) : testimonials && testimonials.length > 0 ? (
        <TestimonialGrid>
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              id={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              avatar={testimonial.avatar}
              content={testimonial.content}
              rating={testimonial.rating}
            />
          ))}
        </TestimonialGrid>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              content:
                'Pelayanan sangat ramah dan pengiriman cepat. Produk sesuai dengan deskripsi.',
              name: 'Budi Santoso',
              role: 'Jakarta',
            },
            {
              content:
                'Jastip dari Shopee sangat membantu. Dapat produk yang diinginkan dengan mudah.',
              name: 'Siti Rahayu',
              role: 'Bandung',
            },
            {
              content: 'Harga bersaing, kualitas terjamin. Belanja disini selalu puas!',
              name: 'Andi Pratama',
              role: 'Surabaya',
            },
          ].map((item, index) => (
            <div key={index} className="rounded-lg border bg-card p-6">
              <p className="text-muted-foreground">&quot;{item.content}&quot;</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <span className="text-sm font-medium">{item.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
