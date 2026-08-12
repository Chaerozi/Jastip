'use client';

import { Truck, Shield, CreditCard, Headphones, RefreshCw, Award } from 'lucide-react';
import { SectionHeader, Section } from '@/components/shared';
import { FeatureGrid } from '@/components/common';
import { FeatureCard } from '@/components/common/feature-card';

const features = [
  {
    icon: Truck,
    title: 'Pengiriman Cepat',
    description: 'Kirim ke seluruh Indonesia dengan berbagai pilihan kurir terpercaya.',
  },
  {
    icon: Shield,
    title: 'Produk Original',
    description: 'Jaminan 100% produk original dari supplier terpercaya.',
  },
  {
    icon: CreditCard,
    title: 'Pembayaran Aman',
    description: 'Berbagai metode pembayaran dengan sistem yang aman dan terpercaya.',
  },
  {
    icon: Headphones,
    title: 'Customer Service 24/7',
    description: 'Tim support siap membantu kapanpun Anda membutuhkan.',
  },
  {
    icon: RefreshCw,
    title: 'Garansi Pengembalian',
    description: '7 hari pengembalian jika produk tidak sesuai atau rusak.',
  },
  {
    icon: Award,
    title: 'Kualitas Terjamin',
    description: 'Kurasi produk terbaik dengan standar kualitas tinggi.',
  },
];

export function WhyChooseUs() {
  return (
    <Section className="bg-muted/30">
      <SectionHeader
        title="Kenapa Belanja di Kitorang Shop?"
        subtitle="Keunggulan Kami"
        description="Kami berkomitmen memberikan pengalaman belanja terbaik untuk Anda"
        align="center"
      />
      <FeatureGrid>
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </FeatureGrid>
    </Section>
  );
}
