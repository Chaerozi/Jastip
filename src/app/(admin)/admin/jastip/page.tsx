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
import { useAdminJastip } from '@/features/admin/operations/hooks';
import {
  DataTable,
  OperationsHeader,
  StatusBadge,
  type DataTableColumn,
} from '@/features/admin/operations/components';
import { JASTIP_STATUS_LABELS } from '@/features/admin/operations/types/labels';
import type { AdminJastip, ListParams } from '@/features/admin/operations/types';

export default function JastipPage() {
  const [params, setParams] = useState<ListParams>({ page: 1, limit: 10 });
  const query = useAdminJastip(params);
  const rows = query.data?.data ?? [];
  const columns: DataTableColumn<AdminJastip>[] = [
    {
      key: 'requestNumber',
      header: 'Permintaan',
      cell: (row) => (
        <Link
          className="font-semibold text-primary hover:underline"
          href={`/admin/jastip/${row.id}`}
        >
          {row.requestNumber}
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
      key: 'productName',
      header: 'Produk',
      cell: (row) => <span className="line-clamp-2 max-w-48">{row.productName}</span>,
    },
    { key: 'totalPrice', header: 'Total', cell: (row) => formatCurrency(row.totalPrice) },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => <StatusBadge type="jastip" status={row.status} />,
    },
    { key: 'createdAt', header: 'Tanggal', cell: (row) => formatDateTime(row.createdAt) },
    {
      key: 'action',
      header: '',
      cell: (row) => (
        <Link aria-label="Lihat jastip" href={`/admin/jastip/${row.id}`}>
          <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
        </Link>
      ),
    },
  ];
  return (
    <>
      <OperationsHeader
        title="Manajemen Jastip"
        description="Kelola permintaan titip beli dari pelanggan."
      />
      <Card className="mb-5">
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Cari nomor, pelanggan, atau produk..."
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
            <SelectTrigger className="w-full md:w-60">
              <SelectValue placeholder="Semua status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua status</SelectItem>
              {Object.entries(JASTIP_STATUS_LABELS).map(([value, label]) => (
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
