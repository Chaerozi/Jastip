'use client';

import { useState } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OrderCard } from '@/components/customer/order-card';
import { EmptyState, LoadingState } from '@/components/customer/empty-states';
import { useOrders } from '@/hooks/use-customer';
import type { CustomerOrderStatus } from '@/types/customer';
import { formatDate } from '@/utils/format-date';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const statusFilters: { value: CustomerOrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua Status' },
  { value: 'pending', label: 'Menunggu Pembayaran' },
  { value: 'processing', label: 'Diproses' },
  { value: 'shipped', label: 'Dikirim' },
  { value: 'delivered', label: 'Selesai' },
  { value: 'cancelled', label: 'Dibatalkan' },
];

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CustomerOrderStatus | 'all'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const { data: orders, isLoading } = useOrders({
    status: statusFilter !== 'all' ? statusFilter : undefined,
    search: search || undefined,
    from_date: dateFrom || undefined,
    to_date: dateTo || undefined,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the query key change
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pesanan Saya</h1>
        <p className="text-muted-foreground">Lihat dan kelola semua pesanan Anda</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Pesanan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nomor pesanan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </form>

            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as CustomerOrderStatus | 'all')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="date"
              placeholder="Dari tanggal"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />

            <Input
              type="date"
              placeholder="Sampai tanggal"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      {isLoading ? (
        <LoadingState type="list" count={3} />
      ) : orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <EmptyState type="orders" />
      )}
    </div>
  );
}
