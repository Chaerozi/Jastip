import { z } from 'zod';

export const statusUpdateSchema = z.object({
  status: z.string().min(1, 'Status wajib dipilih'),
  adminNotes: z.string().max(500, 'Catatan maksimal 500 karakter').optional(),
});
export const trackingSchema = z.object({
  trackingNumber: z
    .string()
    .trim()
    .min(3, 'Nomor resi wajib diisi')
    .max(80, 'Nomor resi maksimal 80 karakter'),
  courier: z
    .string()
    .trim()
    .min(2, 'Kurir wajib dipilih')
    .max(80, 'Nama kurir maksimal 80 karakter'),
  status: z.string().optional(),
});
export const rejectionSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(5, 'Alasan penolakan minimal 5 karakter')
    .max(500, 'Alasan maksimal 500 karakter'),
});
export type StatusUpdateForm = z.infer<typeof statusUpdateSchema>;
export type TrackingForm = z.infer<typeof trackingSchema>;
export type RejectionForm = z.infer<typeof rejectionSchema>;
