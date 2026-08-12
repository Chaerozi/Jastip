import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function OperationsHeader({
  title,
  description,
  backHref,
}: {
  title: string;
  description?: string;
  backHref?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      {' '}
      <div>
        {backHref && (
          <Button variant="ghost" size="sm" className="-ml-3 mb-2 gap-2" asChild>
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>
          </Button>
        )}
        <h1 className="font-serif text-3xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
