import { Package, Search, FileQuestion, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type EmptyStateVariant = 'default' | 'search' | 'products' | 'orders' | 'error';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  variant?: EmptyStateVariant;
  className?: string;
}

const variantIcons: Record<EmptyStateVariant, React.ReactNode> = {
  default: <Inbox className="h-12 w-12 text-muted-foreground" />,
  search: <Search className="h-12 w-12 text-muted-foreground" />,
  products: <Package className="h-12 w-12 text-muted-foreground" />,
  orders: <Package className="h-12 w-12 text-muted-foreground" />,
  error: <FileQuestion className="h-12 w-12 text-muted-foreground" />,
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  variant = 'default',
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="mb-4 rounded-full bg-muted p-4">{icon || variantIcons[variant]}</div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      {description && <p className="mb-6 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && (
        <Button onClick={action.onClick} asChild={!!action.href}>
          {action.href ? <a href={action.href}>{action.label}</a> : <span>{action.label}</span>}
        </Button>
      )}
    </div>
  );
}

interface NoResultsProps {
  query?: string;
  onClear?: () => void;
}

export function NoResults({ query, onClear }: NoResultsProps) {
  return (
    <EmptyState
      variant="search"
      title="Tidak ada hasil"
      description={
        query
          ? `Tidak ditemukan hasil untuk "${query}". Coba kata kunci lain.`
          : 'Coba kata kunci lain atau ubah filter pencarian.'
      }
      action={onClear ? { label: 'Hapus pencarian', onClick: onClear } : undefined}
    />
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Terjadi kesalahan',
  description = 'Gagal memuat data. Silakan coba lagi.',
  onRetry,
}: ErrorStateProps) {
  return (
    <EmptyState
      variant="error"
      title={title}
      description={description}
      action={onRetry ? { label: 'Coba lagi', onClick: onRetry } : undefined}
    />
  );
}
