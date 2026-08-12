'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAddress, useUpdateAddress } from '@/hooks/use-customer';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

const addressSchema = z.object({
  label: z.string().min(1, 'Label alamat wajib diisi'),
  recipient_name: z.string().min(3, 'Nama penerima minimal 3 karakter'),
  phone: z.string().min(10, 'Nomor telepon tidak valid'),
  province: z.string().min(1, 'Provinsi wajib diisi'),
  city: z.string().min(1, 'Kota wajib diisi'),
  district: z.string().min(1, 'Kecamatan wajib diisi'),
  postal_code: z.string().min(5, 'Kode pos tidak valid'),
  full_address: z.string().min(10, 'Alamat lengkap minimal 10 karakter'),
  is_default: z.boolean().default(false),
});

type AddressFormData = z.infer<typeof addressSchema>;

export default function EditAddressPage() {
  const router = useRouter();
  const params = useParams();
  const addressId = params.id as string;
  const { data: address, isLoading } = useAddress(addressId);
  const updateAddress = useUpdateAddress();

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    values: address
      ? {
          label: address.label,
          recipient_name: address.recipient_name,
          phone: address.phone,
          province: address.province,
          city: address.city,
          district: address.district,
          postal_code: address.postal_code,
          full_address: address.full_address,
          is_default: address.is_default,
        }
      : undefined,
  });

  const onSubmit = async (data: AddressFormData) => {
    await updateAddress.mutateAsync({ id: addressId, updates: data });
    router.push(ROUTES.ACCOUNT.ADDRESSES);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!address) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Alamat tidak ditemukan</p>
          <Button asChild className="mt-4">
            <Link href={ROUTES.ACCOUNT.ADDRESSES}>Kembali ke Daftar Alamat</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href={ROUTES.ACCOUNT.ADDRESSES}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Alamat</h1>
        <p className="text-muted-foreground">Perbarui informasi alamat</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detail Alamat</CardTitle>
          <CardDescription>Ubah informasi alamat di bawah ini</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label Alamat</FormLabel>
                      <FormControl>
                        <Input placeholder="Rumah, Kantor, dll" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipient_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Penerima</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama lengkap penerima" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="08xxxxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provinsi</FormLabel>
                      <FormControl>
                        <Input placeholder="Provinsi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kota/Kabupaten</FormLabel>
                      <FormControl>
                        <Input placeholder="Kota/Kabupaten" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kecamatan</FormLabel>
                      <FormControl>
                        <Input placeholder="Kecamatan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Pos</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="full_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama jalan, nomor rumah, RT/RW, patokan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_default"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal">Jadikan alamat utama</FormLabel>
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={updateAddress.isPending}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={updateAddress.isPending}>
                  {updateAddress.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    'Simpan Perubahan'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
