'use client';

import { MapPin, Phone, User, MoreVertical, Star, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CustomerAddress } from '@/types/customer';

interface AddressCardProps {
  address: CustomerAddress;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
  selectable?: boolean;
  showActions?: boolean;
  className?: string;
}

export function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  onSelect,
  isSelected = false,
  selectable = false,
  showActions = true,
  className,
}: AddressCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-colors',
        isSelected && 'border-primary ring-1 ring-primary',
        selectable && 'hover:border-primary/50',
        className
      )}
      onClick={() => selectable && onSelect?.(address.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {address.label}
              </Badge>
              {address.is_default && (
                <Badge variant="default" className="text-xs">
                  <Star className="mr-1 h-3 w-3" />
                  Utama
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="font-medium">{address.recipient_name}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">{address.phone}</span>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {address.full_address}, {address.district}, {address.city}, {address.province}{' '}
                  {address.postal_code}
                </span>
              </div>
            </div>
          </div>

          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(address.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                {!address.is_default && (
                  <DropdownMenuItem onClick={() => onSetDefault?.(address.id)}>
                    <Star className="mr-2 h-4 w-4" />
                    Jadikan Utama
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onDelete?.(address.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
