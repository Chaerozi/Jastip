'use client';

import { SectionHeader, Section } from '@/components/shared';
import { NewsletterForm } from '@/components/common';

export function NewsletterSection() {
  const handleSubmit = async (data: { email: string }) => {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeader
          title="Berlangganan Newsletter"
          subtitle="Stay Updated"
          description="Dapatkan info promo, produk terbaru, dan tips belanja langsung di inbox Anda."
          align="center"
        />
        <NewsletterForm className="flex justify-center" onSubmit={handleSubmit} />
        <p className="mt-3 text-xs text-muted-foreground">
          Dengan berlangganan, Anda menyetujui kebijakan privasi kami.
        </p>
      </div>
    </Section>
  );
}
