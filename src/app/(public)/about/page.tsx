import { Section, SectionHeader } from '@/components/shared';
import { FeatureGrid } from '@/components/common';
import { FeatureCard } from '@/components/common/feature-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Target, Eye, Heart, Users, Shield, Award, Zap, Globe, ArrowRight } from 'lucide-react';
import { PageContainer, PageHeader } from '@/components/shared';

const values = [
  {
    icon: Heart,
    title: 'Integritas',
    description: 'Kejujuran dan transparansi dalam setiap transaksi dan layanan.',
  },
  {
    icon: Users,
    title: 'Pelanggan First',
    description: 'Mengutamakan kepuasan dan pengalaman belanja terbaik pelanggan.',
  },
  {
    icon: Shield,
    title: 'Kualitas',
    description: 'Menyediakan produk original dengan standar kualitas tinggi.',
  },
  {
    icon: Zap,
    title: 'Inovasi',
    description: 'Terus berinovasi untuk memberikan layanan yang lebih baik.',
  },
];

const services = [
  {
    icon: Globe,
    title: 'E-Commerce Terpercaya',
    description: 'Platform belanja online dengan berbagai produk berkualitas.',
  },
  {
    icon: Award,
    title: 'Layanan Jastip',
    description: 'Jasa titip belanja dari Shopee dengan proses mudah dan aman.',
  },
  {
    icon: Target,
    title: 'Pengiriman Nasional',
    description: 'Melayani pengiriman ke seluruh wilayah Indonesia.',
  },
];

export default function AboutPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Tentang Kitorang Shop"
        description="Platform belanja online terpercaya untuk semua kebutuhan Anda"
        breadcrumbs={[{ label: 'Tentang Kami', href: '/about' }]}
      />

      {/* Story Section */}
      <Section>
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div>
            <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
              Cerita Kami
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Dari Ide Menjadi Platform Belanja Terpercaya
            </h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                Kitorang Shop didirikan dengan satu tujuan sederhana: membuat belanja online menjadi
                lebih mudah, aman, dan menyenangkan bagi semua orang Indonesia.
              </p>
              <p>
                Berawal dari keprihatinan melihat banyak masyarakat yang kesulitan mengakses produk
                berkualitas dengan harga terjangkau, kami membangun platform yang menjembatani
                kesenjangan tersebut.
              </p>
              <p>
                Dengan fitur Jastip inovatif, kami memungkinkan pelanggan untuk berbelanja dari
                berbagai marketplace dengan bantuan tim kami yang berdedikasi.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center rounded-lg bg-muted p-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary">2+</div>
              <p className="mt-2 text-muted-foreground">Tahun Melayani Pelanggan</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section className="bg-muted/30">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-background p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">Visi</h3>
            <p className="text-muted-foreground">
              Menjadi platform e-commerce terpercaya di Indonesia yang memberikan akses mudah kepada
              produk berkualitas dengan harga terjangkau bagi semua kalangan masyarakat.
            </p>
          </div>
          <div className="rounded-lg bg-background p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">Misi</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Menyediakan produk original dengan kualitas terjamin</li>
              <li>• Memberikan layanan customer service 24/7</li>
              <li>• Menawarkan fitur Jastip untuk kemudahan belanja</li>
              <li>• Menghadirkan proses pengiriman yang cepat dan aman</li>
              <li>• Membangun kepercayaan dengan transparansi penuh</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section>
        <SectionHeader
          title="Layanan Kami"
          subtitle="Apa yang Kami Tawarkan"
          description="Berbagai layanan untuk memenuhi kebutuhan belanja Anda"
        />
        <FeatureGrid>
          {services.map((service) => (
            <FeatureCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </FeatureGrid>
      </Section>

      {/* Values */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Nilai-Nilai Kami"
          subtitle="What We Stand For"
          description="Prinsip yang memandu setiap keputusan dan tindakan kami"
        />
        <FeatureGrid>
          {values.map((value) => (
            <FeatureCard
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </FeatureGrid>
      </Section>

      {/* CTA */}
      <Section>
        <div className="rounded-lg bg-primary/10 p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">Siap untuk Belanja?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Jelajahi ribuan produk berkualitas dengan harga terjangkau. Atau gunakan layanan Jastip
            kami untuk belanja dari Shopee dengan mudah.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/products">
                Belanja Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/jastip">Gunakan Jastip</Link>
            </Button>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}
