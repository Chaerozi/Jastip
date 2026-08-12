'use client';

import { useState } from 'react';
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
import { useCreateAddress } from '@/hooks/use-customer';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

export default function NewAddressPage() {
  const router = useRouter();
  const createAddress = useCreateAddress();

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: 'Rumah',
      recipient_name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      postal_code: '',
      full_address: '',
      is_default: false,
    },
  });

  const onSubmit = async (data: AddressFormData) => {
    await createAddress.mutateAsync(data);
    router.push(ROUTES.ACCOUNT.ADDRESSES);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href={ROUTES.ACCOUNT.ADDRESSES}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Tambah Alamat Baru</h1>
        <p className="text-muted-foreground">Masukkan detail alamat pengiriman</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detail Alamat</CardTitle>
          <CardDescription>Lengkapi informasi alamat di bawah ini</CardDescription>
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
                  disabled={createAddress.isPending}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={createAddress.isPending}>
                  {createAddress.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    'Simpan Alamat'
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
