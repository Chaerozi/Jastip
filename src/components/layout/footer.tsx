'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  company: [
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Karir', href: '/careers' },
    { label: 'Blog', href: '/blog' },
  ],
  shopping: [
    { label: 'Semua Produk', href: '/products' },
    { label: 'Promosi', href: '/promotions' },
    { label: 'Jastip', href: '/jastip' },
  ],
  support: [
    { label: 'Pusat Bantuan', href: '/faq' },
    { label: 'Kontak', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ],
  legal: [
    { label: 'Syarat & Ketentuan', href: '/terms' },
    { label: 'Kebijakan Privasi', href: '/privacy' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'Youtube' },
];

export function PublicFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">K</span>
              </div>
              <span className="font-serif text-xl font-bold">Kitorang Shop</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Platform belanja online terpercaya dengan produk berkualitas dan harga terjangkau.
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+62 812 3456 7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@kitorangshop.com</span>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Perusahaan</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shopping */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Belanja</h3>
            <ul className="space-y-3">
              {footerLinks.shopping.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Dukungan</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="mb-4 text-sm font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">Dapatkan info promo dan produk terbaru.</p>
            <form className="mt-4 flex gap-2">
              <Input type="email" placeholder="Email Anda" className="flex-1" required />
              <Button type="submit">Daftar</Button>
            </form>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Kitorang Shop. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
