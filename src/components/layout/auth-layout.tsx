import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">K</span>
            </div>
            <span className="font-serif text-xl font-bold">Kitorang Shop</span>
          </Link>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="px-4 py-6 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Kitorang Shop. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
