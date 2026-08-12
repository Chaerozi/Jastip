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
import { formatDateTime } from '@/utils/format-date';
import { useAdminShipping } from '@/features/admin/operations/hooks';
import {
  DataTable,
  OperationsHeader,
  StatusBadge,
  type DataTableColumn,
} from '@/features/admin/operations/components';
import { SHIPPING_STATUS_LABELS } from '@/features/admin/operations/types/labels';
import type { AdminShipping, ListParams } from '@/features/admin/operations/types';

export default function ShippingPage() {
  const [params, setParams] = useState<ListParams>({ page: 1, limit: 10 });
  const query = useAdminShipping(params);
  const rows = query.data?.data ?? [];
  const columns: DataTableColumn<AdminShipping>[] = [
    {
      key: 'orderNumber',
      header: 'Pesanan',
      cell: (row) => (
        <Link
          className="font-semibold text-primary hover:underline"
          href={`/admin/shipping/${row.id}`}
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
    { key: 'courier', header: 'Kurir', cell: (row) => row.courier ?? '-' },
    { key: 'trackingNumber', header: 'Nomor resi', cell: (row) => row.trackingNumber ?? '-' },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => <StatusBadge type="shipping" status={row.status} />,
    },
    { key: 'updatedAt', header: 'Diperbarui', cell: (row) => formatDateTime(row.updatedAt) },
    {
      key: 'action',
      header: '',
      cell: (row) => (
        <Link aria-label="Lihat pengiriman" href={`/admin/shipping/${row.id}`}>
          <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
        </Link>
      ),
    },
  ];
  return (
    <>
      <OperationsHeader
        title="Manajemen Pengiriman"
        description="Kelola kurir, nomor resi, dan status pengiriman."
      />
      <Card className="mb-5">
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Cari nomor pesanan, resi, atau pelanggan..."
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
              {Object.entries(SHIPPING_STATUS_LABELS).map(([value, label]) => (
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
          data={rows}
          getRowKey={(row) => row.id}
          isLoading={query.isPending}
          meta={query.data?.meta}
          onPageChange={(page) => setParams({ ...params, page })}
        />
      )}
    </>
  );
}
