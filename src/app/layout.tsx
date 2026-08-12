import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { GlobalProvider } from '@/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'Kitorang Shop';
const APP_DESCRIPTION =
  'Platform belanja online terpercaya dengan berbagai produk berkualitas dan harga terjangkau. Temukan produk fashion, elektronik, dan kebutuhan sehari-hari.';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    'kitorang shop',
    'online shop',
    'belanja online',
    'e-commerce',
    'toko online',
    'fashion',
    'elektronik',
    'jastip',
  ],
  authors: [{ name: 'Kitorang Shop Team' }],
  creator: 'Kitorang Shop',
  publisher: 'Kitorang Shop',
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: APP_URL,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
