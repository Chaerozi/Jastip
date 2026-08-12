'use client';

import Link from 'next/link';
import { ShoppingBag, Truck, Shield, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader, Section } from '@/components/shared';
import { FeatureGrid } from '@/components/common';
import { FeatureCard } from '@/components/common/feature-card';

const jastipFeatures = [
  {
    icon: ShoppingBag,
    title: 'Kirim Link Shopee',
    description: 'Kirimkan link produk Shopee yang ingin Anda beli melalui formulir kami.',
  },
  {
    icon: Shield,
    title: 'Verifikasi Harga',
    description: 'Tim kami akan memverifikasi harga dan ketersediaan produk.',
  },
  {
    icon: Truck,
    title: 'Pengiriman Aman',
    description: 'Produk dikirim langsung ke alamat Anda dengan packing aman.',
  },
  {
    icon: Clock,
    title: 'Proses Cepat',
    description: 'Estimasi pengiriman 3-7 hari kerja setelah produk tiba di gudang kami.',
  },
];

export function JastipSection() {
  return (
    <Section>
      <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
        <div>
          <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
            Layanan Jastip
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Belanja dari Shopee dengan Mudah
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ingin beli produk dari Shopee tapi bingung dengan pengiriman? Gunakan layanan Jastip
            kami! Cukup kirimkan link produk Shopee, dan kami akan membelikan serta mengirimkannya
            langsung ke alamat Anda.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">Minimal order Rp 50.000</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">Jaminan produk original atau uang kembali</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Truck className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">Ongkir terjangkau ke seluruh Indonesia</span>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/jastip">
                Gunakan Jastip
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/jastip">Pelajari Lebih Lanjut</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Cara Kerja Jastip</h3>
            <p className="mt-1 text-sm text-muted-foreground">Proses mudah dalam 4 langkah</p>
          </div>
          <FeatureGrid>
            {jastipFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{feature.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </FeatureGrid>
        </div>
      </div>
    </Section>
  );
}
