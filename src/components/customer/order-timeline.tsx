'use client';

import { Package, Truck, CheckCircle, Clock, Home, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/format-date';
import type { CustomerOrderStatus } from '@/types/customer';

interface TimelineStep {
  status: CustomerOrderStatus;
  label: string;
  description: string;
  timestamp?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface OrderTimelineProps {
  currentStatus: CustomerOrderStatus;
  createdAt: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  className?: string;
}

const statusOrder: CustomerOrderStatus[] = ['pending', 'processing', 'shipped', 'delivered'];

export function OrderTimeline({
  currentStatus,
  createdAt,
  shippedAt,
  deliveredAt,
  cancelledAt,
  className,
}: OrderTimelineProps) {
  const isCancelled = currentStatus === 'cancelled';
  const currentIndex = statusOrder.indexOf(currentStatus);

  const steps: TimelineStep[] = [
    {
      status: 'pending',
      label: 'Pesanan Dibuat',
      description: 'Menunggu pembayaran',
      timestamp: createdAt,
      isCompleted: !isCancelled,
      isCurrent: currentStatus === 'pending',
    },
    {
      status: 'processing',
      label: 'Pembayaran Dikonfirmasi',
      description: 'Pesanan sedang diproses',
      isCompleted: currentIndex >= 1 && !isCancelled,
      isCurrent: currentStatus === 'processing',
    },
    {
      status: 'shipped',
      label: 'Dikirim',
      description: 'Pesanan dalam pengiriman',
      timestamp: shippedAt,
      isCompleted: currentIndex >= 2 && !isCancelled,
      isCurrent: currentStatus === 'shipped',
    },
    {
      status: 'delivered',
      label: 'Selesai',
      description: 'Pesanan telah sampai',
      timestamp: deliveredAt,
      isCompleted: currentStatus === 'delivered',
      isCurrent: currentStatus === 'delivered',
    },
  ];

  if (isCancelled) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
            <XCircle className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <p className="font-medium">Pesanan Dibatalkan</p>
            <p className="text-sm text-muted-foreground">
              {cancelledAt ? formatDate(cancelledAt) : '-'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-0', className)}>
      {steps.map((step, index) => {
        const Icon =
          step.status === 'pending'
            ? Clock
            : step.status === 'processing'
              ? Package
              : step.status === 'shipped'
                ? Truck
                : Home;

        return (
          <div key={step.status} className="relative">
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'absolute bottom-0 left-[18px] top-10 w-0.5',
                  step.isCompleted ? 'bg-primary' : 'bg-border'
                )}
              />
            )}

            <div className="flex items-start gap-3 pb-8">
              <div
                className={cn(
                  'z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                  step.isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : step.isCurrent
                      ? 'border-2 border-primary bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                )}
              >
                {step.isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>

              <div className="min-w-0 flex-1 pt-1">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={cn(
                      'font-medium',
                      step.isCurrent ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.timestamp && (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatDate(step.timestamp)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
