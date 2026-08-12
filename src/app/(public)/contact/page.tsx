'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PageContainer, PageHeader } from '@/components/shared';
import { Section } from '@/components/shared';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon tidak valid').optional().or(z.literal('')),
  subject: z.string().min(1, 'Pilih subjek pesan'),
  message: z.string().min(10, 'Pesan minimal 10 karakter'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const subjects = [
  { value: 'order', label: 'Pertanyaan Pesanan' },
  { value: 'product', label: 'Informasi Produk' },
  { value: 'shipping', label: 'Pengiriman' },
  { value: 'return', label: 'Pengembalian/Refund' },
  { value: 'jastip', label: 'Layanan Jastip' },
  { value: 'feedback', label: 'Masukan/Saran' },
  { value: 'complaint', label: 'Komplain' },
  { value: 'other', label: 'Lainnya' },
];

const businessHours = [
  { day: 'Senin - Jumat', hours: '08:00 - 17:00 WIB' },
  { day: 'Sabtu', hours: '09:00 - 15:00 WIB' },
  { day: 'Minggu & Libur', hours: 'Tutup' },
];

export default function ContactPage() {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.');
      form.reset();
    } catch {
      toast.error('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Hubungi Kami"
        description="Kami siap membantu Anda. Silakan hubungi kami melalui form di bawah atau kontak yang tersedia."
        breadcrumbs={[{ label: 'Kontak', href: '/contact' }]}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border p-6 md:p-8">
            <h2 className="mb-6 text-xl font-semibold">Kirim Pesan</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan nama lengkap" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@contoh.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon (Opsional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="08123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subjek</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih subjek" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject.value} value={subject.value}>
                                {subject.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pesan</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tuliskan pesan Anda..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Pesan'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          {/* Contact Details */}
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 font-semibold">Informasi Kontak</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:hello@kitorangshop.com"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    hello@kitorangshop.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Telepon</p>
                  <a
                    href="tel:+6281234567890"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    +62 812 3456 7890
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    +62 812 3456 7890
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Alamat</p>
                  <p className="text-sm text-muted-foreground">
                    Jl. Contoh No. 123
                    <br />
                    Jakarta Selatan, DKI Jakarta 12345
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="rounded-lg border p-6">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Jam Operasional</h3>
            </div>
            <div className="space-y-2">
              {businessHours.map((item) => (
                <div key={item.day} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.day}</span>
                  <span className="font-medium">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-lg border bg-muted p-8 text-center">
            <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Google Maps akan ditampilkan di sini
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
