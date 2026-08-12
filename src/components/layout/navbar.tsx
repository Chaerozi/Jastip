'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, Menu, User, Heart, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Produk',
    href: '/products',
    children: [
      { label: 'Semua Produk', href: '/products' },
      { label: 'Elektronik', href: '/products/category/elektronik' },
      { label: 'Fashion', href: '/products/category/fashion' },
      { label: 'Rumah Tangga', href: '/products/category/rumah-tangga' },
    ],
  },
  { label: 'Jastip', href: '/jastip' },
  { label: 'Tentang', href: '/about' },
  { label: 'Kontak', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled ? 'border-b bg-background/95 backdrop-blur-sm' : 'bg-background'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">K</span>
            </div>
            <span className="font-serif text-xl font-bold text-foreground">Kitorang Shop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) =>
              item.children ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        'gap-1 font-medium',
                        pathname.startsWith(item.href) ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link href={child.href}>{child.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search - Desktop */}
            <div className="hidden lg:block">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari produk..."
                    className="w-64 pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>

            {/* Search - Mobile */}
            <Button variant="ghost" size="icon" className="lg:hidden" asChild>
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">Cari</span>
              </Link>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Keranjang</span>
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                  0
                </Badge>
              </Link>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Akun</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/login">Masuk</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register">Daftar</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account/orders">Pesanan Saya</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-1">
                  {navigation.map((item) => (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'block rounded-lg px-4 py-3 font-medium transition-colors',
                          pathname === item.href
                            ? 'bg-muted text-primary'
                            : 'text-foreground hover:bg-muted'
                        )}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <div className="ml-4 flex flex-col">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
