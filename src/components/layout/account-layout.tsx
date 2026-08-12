'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  MapPin,
  Heart,
  Package,
  Bell,
  Settings,
  ChevronLeft,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/use-auth';
import { ProfileCard } from '@/components/customer/profile-card';
import type { User as UserType } from '@/types/user';

const navItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: ROUTES.ACCOUNT.HOME,
  },
  {
    icon: Package,
    label: 'Pesanan Saya',
    href: ROUTES.ACCOUNT.ORDERS,
  },
  {
    icon: Heart,
    label: 'Wishlist',
    href: ROUTES.ACCOUNT.WISHLIST,
  },
  {
    icon: MapPin,
    label: 'Alamat',
    href: ROUTES.ACCOUNT.ADDRESSES,
  },
  {
    icon: User,
    label: 'Profil',
    href: ROUTES.ACCOUNT.PROFILE,
  },
  {
    icon: Bell,
    label: 'Notifikasi',
    href: ROUTES.ACCOUNT.NOTIFICATIONS,
  },
  {
    icon: Settings,
    label: 'Pengaturan',
    href: ROUTES.ACCOUNT.SETTINGS,
  },
];

interface AccountSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  email?: string;
  profile?: UserType | null;
}

function AccountSidebar({ isOpen, onClose, email, profile }: AccountSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-6">
        <ProfileCard profile={profile ?? null} email={email} />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ChevronLeft className="h-5 w-5" />
          Kembali ke Toko
        </Link>
      </div>
    </div>
  );
}

interface AccountLayoutProps {
  children: React.ReactNode;
}

export function AccountLayout({ children }: AccountLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden border-r bg-background lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
          <AccountSidebar email={user?.email} profile={user} />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetContent side="left" className="w-72 p-0">
            <AccountSidebar
              isOpen={isMobileOpen}
              onClose={() => setIsMobileOpen(false)}
              email={user?.email}
              profile={user}
            />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 lg:pl-72">
          {/* Mobile Header */}
          <header className="sticky top-0 z-40 flex items-center gap-4 border-b bg-background px-4 py-3 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </Sheet>
            <span className="font-semibold">Akun Saya</span>
          </header>

          <main className="p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
