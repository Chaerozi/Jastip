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
import { useAdminPayments } from '@/features/admin/operations/hooks';
import {
  DataTable,
  OperationsHeader,
  StatusBadge,
  type DataTableColumn,
} from '@/features/admin/operations/components';
import {
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
} from '@/features/admin/operations/types/labels';
import type { AdminPayment, ListParams } from '@/features/admin/operations/types';

export default function PaymentsPage() {
  const [params, setParams] = useState<ListParams>({ page: 1, limit: 10, status: 'pending' });
  const query = useAdminPayments(params);
  const rows = query.data?.data ?? [];
  const columns: DataTableColumn<AdminPayment>[] = [
    {
      key: 'paymentNumber',
      header: 'Pembayaran',
      cell: (row) => (
        <Link
          className="font-semibold text-primary hover:underline"
          href={`/admin/payments/${row.id}`}
        >
          {row.paymentNumber}
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
      key: 'reference',
      header: 'Referensi',
      cell: (row) => row.orderNumber ?? row.jastipNumber ?? '-',
    },
    { key: 'amount', header: 'Jumlah', cell: (row) => formatCurrency(row.amount) },
    { key: 'method', header: 'Metode', cell: (row) => PAYMENT_METHOD_LABELS[row.method] },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => <StatusBadge type="payment" status={row.status} />,
    },
    { key: 'createdAt', header: 'Tanggal', cell: (row) => formatDateTime(row.createdAt) },
    {
      key: 'action',
      header: '',
      cell: (row) => (
        <Link aria-label="Lihat pembayaran" href={`/admin/payments/${row.id}`}>
          <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
        </Link>
      ),
    },
  ];
  return (
    <>
      <OperationsHeader
        title="Verifikasi Pembayaran"
        description="Periksa bukti pembayaran dan konfirmasi transaksi pelanggan."
      />
      <Card className="mb-5">
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Cari nomor pembayaran atau pelanggan..."
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
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua status</SelectItem>
              {Object.entries(PAYMENT_STATUS_LABELS).map(([value, label]) => (
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
