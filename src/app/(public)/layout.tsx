import { PublicLayout } from '@/components/layout';

export default function PublicRootLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
