'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SectionHeader, Section } from '@/components/shared';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

async function fetchFAQs(): Promise<FAQ[]> {
  // TODO: Replace with actual API call
  return [];
}

const defaultFAQs = [
  {
    id: '1',
    question: 'Bagaimana cara memesan produk?',
    answer:
      'Anda dapat memesan produk dengan menambahkan ke keranjang dan melakukan checkout. Pilih metode pembayaran, dan pesanan akan langsung diproses.',
  },
  {
    id: '2',
    question: 'Apa itu layanan Jastip?',
    answer:
      'Jastip adalah layanan jasa titip belanja dari Shopee. Anda cukup mengirim link produk Shopee yang ingin dibeli, dan kami akan membelikan serta mengirimkannya ke alamat Anda.',
  },
  {
    id: '3',
    question: 'Berapa lama waktu pengiriman?',
    answer:
      'Waktu pengiriman tergantung lokasi Anda dan pilihan kurir. Untuk area Jawa biasanya 2-4 hari kerja, luar Jawa 4-7 hari kerja.',
  },
  {
    id: '4',
    question: 'Bagaimana jika produk yang diterima rusak?',
    answer:
      'Kami memberikan garansi pengembalian 7 hari. Jika produk rusak atau tidak sesuai, hubungi customer service kami untuk proses pengembalian atau penukaran.',
  },
];

export function FaqPreview() {
  const { data: faqs } = useQuery({
    queryKey: ['faqs', 'home'],
    queryFn: fetchFAQs,
    staleTime: 1000 * 60 * 10,
  });

  const displayFAQs = faqs && faqs.length > 0 ? faqs : defaultFAQs;

  return (
    <Section className="bg-muted/30">
      <SectionHeader
        title="Pertanyaan yang Sering Diajukan"
        subtitle="FAQ"
        action={{ label: 'Lihat Semua FAQ', href: '/faq' }}
      />

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {displayFAQs.slice(0, 4).map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-6 text-center">
          <Button variant="link" asChild>
            <Link href="/faq" className="gap-1">
              Lihat semua pertanyaan
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
