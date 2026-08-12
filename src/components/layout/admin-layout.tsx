'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  ChevronLeft,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Truck,
  Users,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';

const items = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD.MAIN, icon: LayoutDashboard },
  { label: 'Produk', href: ROUTES.DASHBOARD.PRODUCTS, icon: ShoppingBag },
  { label: 'Kategori', href: ROUTES.DASHBOARD.CATEGORIES, icon: ClipboardList },
  { label: 'Banner', href: ROUTES.DASHBOARD.BANNERS, icon: Package },
  { label: 'Pesanan', href: ROUTES.DASHBOARD.ORDERS, icon: ClipboardList },
  { label: 'Jastip', href: ROUTES.DASHBOARD.JASTIP, icon: ShoppingBag },
  { label: 'Verifikasi Pembayaran', href: ROUTES.DASHBOARD.PAYMENTS, icon: CreditCard },
  { label: 'Pengiriman', href: ROUTES.DASHBOARD.SHIPPING, icon: Truck },
  { label: 'Pelanggan', href: ROUTES.DASHBOARD.CUSTOMERS, icon: Users },
  { label: 'Analitik', href: ROUTES.DASHBOARD.ANALYTICS, icon: BarChart3 },
  { label: 'Pengaturan', href: ROUTES.DASHBOARD.SETTINGS, icon: Settings },
];

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="flex h-full w-72 flex-col bg-[#2d211a] text-white">
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <div>
          <p className="font-serif text-xl font-semibold">Kitorang</p>
          <p className="text-xs text-white/60">Panel Administrasi</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {items.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== ROUTES.DASHBOARD.MAIN && pathname.startsWith(`${href}/`));
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors',
                active
                  ? 'bg-white font-semibold text-[#2d211a] shadow-sm'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Kembali ke Toko
        </Link>
      </div>
    </aside>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex">
        <AdminSidebar />
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            aria-label="Tutup menu"
            className="flex-1 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0">
            <AdminSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Kitorang Shop</p>
          </div>
          <p className="hidden text-sm font-medium sm:block">Administrator</p>
        </header>
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
