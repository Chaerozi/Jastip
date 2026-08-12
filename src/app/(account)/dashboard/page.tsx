'use client';

import { Package, Heart, Bell, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/customer/dashboard-cards';
import { LoadingState } from '@/components/customer/empty-states';
import { useDashboardStats, useRecentOrders, useProfile } from '@/hooks/use-customer';
import { ROUTES } from '@/constants/routes';
import { formatCurrency } from '@/utils/format-currency';

export default function AccountDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: recentOrders, isLoading: ordersLoading } = useRecentOrders(5);
  const { data: profile } = useProfile();

  const firstName = profile?.full_name?.split(' ')[0] || 'Pengguna';

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Selamat datang, {firstName}!</h1>
          <p className="text-muted-foreground">Kelola pesanan dan akun Anda di sini.</p>
        </div>
      </div>

      {/* Stats Overview */}
      {statsLoading ? (
        <LoadingState type="card" count={4} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Pesanan"
            value={stats?.total_orders || 0}
            icon={<Package className="h-5 w-5" />}
          />
          <StatCard
            title="Pesanan Aktif"
            value={stats?.pending_orders || 0}
            icon={<Clock className="h-5 w-5" />}
            variant="warning"
            description="Menunggu pembayaran"
          />
          <StatCard
            title="Wishlist"
            value={stats?.wishlist_count || 0}
            icon={<Heart className="h-5 w-5" />}
          />
          <StatCard
            title="Notifikasi"
            value={stats?.notifications_unread || 0}
            icon={<Bell className="h-5 w-5" />}
            variant="primary"
            description="Belum dibaca"
          />
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Akses Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href={ROUTES.ACCOUNT.ORDERS}>
                <Package className="h-5 w-5" />
                <span className="text-xs">Pesanan Saya</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href={ROUTES.ACCOUNT.WISHLIST}>
                <Heart className="h-5 w-5" />
                <span className="text-xs">Wishlist</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href={ROUTES.ACCOUNT.ADDRESSES}>
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs">Alamat</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href={ROUTES.ACCOUNT.PROFILE}>
                <Package className="h-5 w-5" />
                <span className="text-xs">Profil</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Pesanan Terbaru</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.ACCOUNT.ORDERS}>
              Lihat Semua
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {ordersLoading ? (
            <LoadingState type="list" count={3} />
          ) : recentOrders && recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{order.order_number}</p>
                      <p className="text-sm text-muted-foreground">{formatCurrency(order.total)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        order.status === 'delivered'
                          ? 'default'
                          : order.status === 'cancelled'
                            ? 'destructive'
                            : 'secondary'
                      }
                    >
                      {order.status}
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={ROUTES.ACCOUNT.ORDER_DETAIL(order.id)}>Detail</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">Belum ada pesanan</p>
              <Button className="mt-4" asChild>
                <Link href={ROUTES.PRODUCTS.LIST}>Mulai Belanja</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Completion */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kelengkapan Akun</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Profil</span>
              <Badge variant={profile?.full_name ? 'default' : 'outline'}>
                {profile?.full_name ? 'Lengkap' : 'Belum Lengkap'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Email</span>
              <Badge variant="default">Terverifikasi</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Alamat Utama</span>
              <Badge variant="outline">Belum Ada</Badge>
            </div>

            <Button variant="outline" className="mt-4 w-full" asChild>
              <Link href={ROUTES.ACCOUNT.PROFILE}>Lengkapi Profil</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
