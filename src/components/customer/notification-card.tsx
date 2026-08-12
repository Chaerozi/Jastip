'use client';

import {
  Bell,
  Package,
  CreditCard,
  Tag,
  Info,
  CheckCircle,
  MoreVertical,
  Trash2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/format-date';
import type { Notification, NotificationType } from '@/types/customer';

const typeConfig: Record<NotificationType, { label: string; icon: typeof Bell; color: string }> = {
  order: { label: 'Pesanan', icon: Package, color: 'text-primary' },
  payment: { label: 'Pembayaran', icon: CreditCard, color: 'text-success' },
  promotion: { label: 'Promo', icon: Tag, color: 'text-warning' },
  system: { label: 'Sistem', icon: Info, color: 'text-muted-foreground' },
};

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
  className?: string;
}

export function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
  onClick,
  className,
}: NotificationCardProps) {
  const config = typeConfig[notification.type];
  const Icon = config.icon;
  const isRead = !!notification.read_at;

  return (
    <Card
      className={cn(
        'cursor-pointer transition-colors',
        !isRead && 'border-primary/20 bg-primary/5',
        className
      )}
      onClick={() => onClick?.(notification.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
              isRead ? 'bg-muted' : 'bg-primary/10'
            )}
          >
            <Icon className={cn('h-5 w-5', isRead ? 'text-muted-foreground' : config.color)} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className={cn('font-medium', !isRead && 'text-primary')}>
                    {notification.title}
                  </p>
                  {!isRead && (
                    <Badge variant="default" className="shrink-0 text-xs">
                      Baru
                    </Badge>
                  )}
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">{notification.message}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!isRead && (
                    <DropdownMenuItem onClick={() => onMarkAsRead?.(notification.id)}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Tandai Dibaca
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDelete?.(notification.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              {formatDate(notification.created_at)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
