'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { statusUpdateSchema, type StatusUpdateForm } from '../schemas';

export function StatusForm({
  statuses,
  currentStatus,
  isPending,
  onSubmit,
}: {
  statuses: { value: string; label: string }[];
  currentStatus: string;
  isPending?: boolean;
  onSubmit: (values: StatusUpdateForm) => void;
}) {
  const form = useForm<StatusUpdateForm>({
    resolver: zodResolver(statusUpdateSchema),
    defaultValues: { status: currentStatus, adminNotes: '' },
  });
  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={form.watch('status')}
          onValueChange={(value) => form.setValue('status', value, { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.status && (
          <p className="text-xs text-destructive">{form.formState.errors.status.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Catatan admin</Label>
        <Textarea
          placeholder="Tambahkan catatan bila diperlukan"
          {...form.register('adminNotes')}
        />
        {form.formState.errors.adminNotes && (
          <p className="text-xs text-destructive">{form.formState.errors.adminNotes.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Menyimpan...' : 'Simpan perubahan'}
      </Button>
    </form>
  );
}
