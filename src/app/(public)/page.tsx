'use client';

import { PublicLayout } from '@/components/layout';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturedCategories } from '@/components/home/featured-categories';
import { FeaturedProducts } from '@/components/home/featured-products';
import { BestSellers } from '@/components/home/best-sellers';
import { NewArrivals } from '@/components/home/new-arrivals';
import { JastipSection } from '@/components/home/jastip-section';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { FaqPreview } from '@/components/home/faq-preview';
import { NewsletterSection } from '@/components/home/newsletter-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <BestSellers />
      <NewArrivals />
      <JastipSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <FaqPreview />
      <NewsletterSection />
    </>
  );
}
