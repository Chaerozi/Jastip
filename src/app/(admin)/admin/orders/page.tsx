'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ErrorState } from '@/components/shared';
import { formatCurrency } from '@/utils/format-currency';
import { formatDateTime } from '@/utils/format-date';
import { useAdminOrders } from '@/features/admin/operations/hooks';
import {
  DataTable,
  OperationsHeader,
  StatusBadge,
  type DataTableColumn,
} from '@/features/admin/operations/components';
import {
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
} from '@/features/admin/operations/types/labels';
import type { AdminOrder, ListParams } from '@/features/admin/operations/types';

const orderStatuses = Object.entries(ORDER_STATUS_LABELS);
export default function OrdersPage() {
  const [params, setParams] = useState<ListParams>({ page: 1, limit: 10 });
  const query = useAdminOrders(params);
  const orders = query.data?.data ?? [];
  const columns: DataTableColumn<AdminOrder>[] = [
    {
      key: 'orderNumber',
      header: 'Pesanan',
      sortable: true,
      cell: (row) => (
        <Link
          className="font-semibold text-primary hover:underline"
          href={`/admin/orders/${row.id}`}
        >
          {row.orderNumber}
        </Link>
      ),
    },
    {
      key: 'customer',
      header: 'Pelanggan',
      cell: (row) => (
        <div>
          <p className="font-medium">{row.customer.name}</p>
          <p className="text-xs text-muted-foreground">{row.customer.email}</p>
        </div>
      ),
    },
    {
      key: 'totalAmount',
      header: 'Total',
      sortable: true,
      cell: (row) => formatCurrency(row.totalAmount),
    },
    { key: 'status', header: 'Status', cell: (row) => <StatusBadge status={row.status} /> },
    {
      key: 'paymentStatus',
      header: 'Pembayaran',
      cell: (row) => <StatusBadge type="payment" status={row.paymentStatus} />,
    },
    {
      key: 'createdAt',
      header: 'Tanggal',
      sortable: true,
      cell: (row) => formatDateTime(row.createdAt),
    },
    {
      key: 'action',
      header: '',
      cell: (row) => (
        <Link aria-label="Lihat pesanan" href={`/admin/orders/${row.id}`}>
          <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
        </Link>
      ),
    },
  ];
  return (
    <>
      <OperationsHeader
        title="Manajemen Pesanan"
        description="Kelola pesanan, pembayaran, dan proses pengiriman pelanggan."
      />
      <Card className="mb-5">
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Cari nomor pesanan atau pelanggan..."
              value={params.search ?? ''}
              onChange={(event) =>
                setParams({ ...params, search: event.target.value || undefined, page: 1 })
              }
            />
          </div>
          <Select
            value={params.status ?? 'all'}
            onValueChange={(value) =>
              setParams({ ...params, status: value === 'all' ? undefined : value, page: 1 })
            }
          >
            <SelectTrigger className="w-full md:w-52">
              <SelectValue placeholder="Semua status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua status</SelectItem>
              {orderStatuses.map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      {query.isError ? (
        <ErrorState onRetry={() => query.refetch()} />
      ) : (
        <DataTable
          columns={columns}
          data={orders}
          getRowKey={(row) => row.id}
          isLoading={query.isPending}
          meta={query.data?.meta}
          onPageChange={(page) => setParams({ ...params, page })}
          onSort={(sortBy) =>
            setParams({ ...params, sortBy, sortOrder: params.sortOrder === 'asc' ? 'desc' : 'asc' })
          }
        />
      )}
    </>
  );
}
