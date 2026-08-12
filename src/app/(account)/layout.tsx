'use client';

import { AccountLayout } from '@/components/layout';

export default function AccountRootLayout({ children }: { children: React.ReactNode }) {
  return <AccountLayout>{children}</AccountLayout>;
}
