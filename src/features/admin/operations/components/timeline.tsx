import { CheckCircle2, Circle } from 'lucide-react';
import { formatDateTime } from '@/utils/format-date';

interface TimelineItem {
  id: string;
  label: string;
  createdAt: string;
  note?: string | null;
}
export function OperationsTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="space-y-5">
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Belum ada riwayat.</p>
      ) : (
        items.map((item, index) => (
          <div key={item.id} className="relative flex gap-3">
            {index < items.length - 1 && (
              <span className="absolute left-[9px] top-6 h-full w-px bg-border" />
            )}
            <span className="relative z-10 mt-0.5 bg-card text-primary">
              {index === 0 ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
            </span>
            <div>
              <p className="font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{formatDateTime(item.createdAt)}</p>
              {item.note && <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
