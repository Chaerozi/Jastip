'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, HelpCircle, MessageCircle } from 'lucide-react';
import { PageContainer, PageHeader, Section } from '@/components/shared';
import { Card, CardContent } from '@/components/ui/card';

const faqCategories = [
  { value: 'all', label: 'Semua' },
  { value: 'order', label: 'Pemesanan' },
  { value: 'shipping', label: 'Pengiriman' },
  { value: 'payment', label: 'Pembayaran' },
  { value: 'jastip', label: 'Jastip' },
  { value: 'return', label: 'Pengembalian' },
];

const defaultFAQs = [
  {
    category: 'order',
    question: 'Bagaimana cara memesan produk di Kitorang Shop?',
    answer:
      'Anda dapat memesan produk dengan menambahkannya ke keranjang, lalu lakukan proses checkout. Pilih metode pengiriman dan pembayaran, dan pesanan Anda akan langsung diproses.',
  },
  {
    category: 'order',
    question: 'Apakah saya perlu mendaftar untuk berbelanja?',
    answer:
      'Ya, Anda perlu membuat akun untuk berbelanja di Kitorang Shop. Ini membantu kami melacak pesanan dan memberikan layanan yang lebih baik kepada Anda.',
  },
  {
    category: 'payment',
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer:
      'Kami menerima berbagai metode pembayaran termasuk transfer bank, e-wallet (GoPay, OVO, Dana), kartu kredit, dan COD (bayar di tempat) untuk area tertentu.',
  },
  {
    category: 'shipping',
    question: 'Berapa lama waktu pengiriman?',
    answer:
      'Waktu pengiriman tergantung lokasi Anda dan pilihan kurir. Untuk area Jawa biasanya 2-4 hari kerja, sedangkan luar Jawa membutuhkan 4-7 hari kerja.',
  },
  {
    category: 'shipping',
    question: 'Berapa biaya pengiriman?',
    answer:
      'Biaya pengiriman tergantung pada lokasi, berat paket, dan pilihan kurir. Anda dapat melihat estimasi ongkir saat proses checkout sebelum membayar.',
  },
  {
    category: 'jastip',
    question: 'Apa itu layanan Jastip?',
    answer:
      'Jastip adalah layanan jasa titip belanja dari Shopee. Anda mengirimkan link produk Shopee yang ingin dibeli, dan kami akan membelikan serta mengirimkannya ke alamat Anda.',
  },
  {
    category: 'jastip',
    question: 'Bagaimana cara menggunakan layanan Jastip?',
    answer:
      'Kunjungi halaman Jastip, kirimkan link produk Shopee yang ingin Anda beli melalui formulir yang tersedia. Tim kami akan memverifikasi ketersediaan dan memberikan estimasi harga.',
  },
  {
    category: 'return',
    question: 'Bagaimana jika produk yang diterima rusak atau salah?',
    answer:
      'Anda dapat mengajukan pengembalian dalam waktu 7 hari setelah menerima produk. Hubungi customer service kami dengan menyertakan foto/video sebagai bukti.',
  },
  {
    category: 'return',
    question: 'Berapa lama proses pengembalian dana?',
    answer:
      'Proses pengembalian dana biasanya membutuhkan 3-7 hari kerja setelah produk dikembalikan dan diverifikasi oleh tim kami. Dana akan dikembalikan melalui metode pembayaran asli.',
  },
];

export default function FAQPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = defaultFAQs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedFAQs = filteredFAQs.reduce(
    (acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category]!.push(faq);
      return acc;
    },
    {} as Record<string, typeof defaultFAQs>
  );

  return (
    <PageContainer>
      <PageHeader
        title="Pertanyaan yang Sering Diajukan"
        description="Temukan jawaban untuk pertanyaan umum tentang layanan kami"
        breadcrumbs={[{ label: 'FAQ', href: '/faq' }]}
      />

      <div className="mt-8 space-y-8">
        {/* Search */}
        <div className="mx-auto max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari pertanyaan..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          {faqCategories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-3xl space-y-6">
          {Object.entries(groupedFAQs).map(([category, faqs]) => (
            <div key={category}>
              {selectedCategory === 'all' && (
                <Badge variant="secondary" className="mb-4">
                  {faqCategories.find((c) => c.value === category)?.label}
                </Badge>
              )}
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={`${category}-${index}`} value={`${category}-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {filteredFAQs.length === 0 && (
            <div className="rounded-lg border p-8 text-center">
              <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 font-semibold">Tidak ada hasil</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tidak ditemukan pertanyaan yang sesuai. Coba kata kunci lain atau hubungi kami
                langsung.
              </p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mx-auto max-w-3xl">
          <Card className="bg-muted/50">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <MessageCircle className="h-10 w-10 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Tidak menemukan jawaban?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tim customer service kami siap membantu Anda 24/7
              </p>
              <Button className="mt-4" asChild>
                <Link href="/contact">Hubungi Kami</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
