'use client';

import Link from 'next/link';
import { ArrowRight, ShoppingBag, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroBanner } from '@/components/common';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

const slides = [
  {
    title: 'Belanja Mudah, Hemat Maksimal',
    subtitle: 'Promo Spesial',
    description:
      'Temukan ribuan produk berkualitas dengan harga terbaik. Gratis ongkir untuk pembelian pertama!',
    primaryCta: { label: 'Belanja Sekarang', href: '/products' },
    secondaryCta: { label: 'Lihat Promo', href: '/promotions' },
    image:
      'https://images.pexels.com/photo/2303781/pexels-photo-2303781.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    title: 'Jastip - Belanja dari Shopee',
    subtitle: 'Layanan Jasa Titip',
    description:
      'Mau beli dari Shopee tapi bingung pengirimannya? Gunakan Jastip kami untuk pembelian yang mudah.',
    primaryCta: { label: 'Gunakan Jastip', href: '/jastip' },
    secondaryCta: { label: 'Pelajari Lebih', href: '/jastip' },
    image:
      'https://images.pexels.com/photo-2303781/pexels-photo-2303781.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    title: 'Flash Sale Weekend',
    subtitle: 'Hemat Hingga 50%',
    description:
      'Diskon besar-besaran untuk produk pilihan. Promo terbatas, jangan sampai kehabisan!',
    primaryCta: { label: 'Lihat Flash Sale', href: '/products?sale=true' },
    image:
      'https://images.pexels.com/photo-2303781/pexels-photo-2303781.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
];

export function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [api]);

  return (
    <section className="relative">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <HeroBanner
                title={slide.title}
                subtitle={slide.subtitle}
                description={slide.description}
                primaryCta={slide.primaryCta}
                secondaryCta={slide.secondaryCta}
                image={slide.image}
                imageAlt={slide.title}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              current === index ? 'w-4 bg-primary' : 'bg-white/50'
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
