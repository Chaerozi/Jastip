'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, Camera, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProfileCard } from '@/components/customer/profile-card';
import { useProfile, useUpdateProfile, useUpdateAvatar } from '@/hooks/use-customer';
import { useAuth } from '@/hooks/use-auth';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

const profileSchema = z.object({
  full_name: z.string().min(3, 'Nama minimal 3 karakter'),
  phone: z.string().min(10, 'Nomor telepon tidak valid').optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfile();
  const { user } = useAuth();
  const updateProfile = useUpdateProfile();
  const updateAvatar = useUpdateAvatar();
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
    },
    values: profile
      ? {
          full_name: profile.full_name || '',
          phone: profile.phone || '',
        }
      : undefined,
  });

  const onSubmit = async (data: ProfileFormData) => {
    await updateProfile.mutateAsync(data);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In real implementation, upload to storage first
      // For now, just close the dialog
      setIsAvatarDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const initials = profile?.full_name
    ? profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profil Saya</h1>
        <p className="text-muted-foreground">Kelola informasi profil Anda</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <ProfileCard
            profile={profile ?? null}
            email={user?.email}
            onEditAvatar={() => setIsAvatarDialogOpen(true)}
          />

          <Card className="mt-4">
            <CardContent className="space-y-2 p-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={ROUTES.ACCOUNT.CHANGE_PASSWORD}>Ubah Password</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Profil</CardTitle>
              <CardDescription>Perbarui informasi profil Anda di sini</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Nama lengkap Anda" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="bg-muted pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Email tidak dapat diubah. Hubungi support jika perlu bantuan.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="tel"
                              placeholder="08xxxxxxxxxx"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3">
                    <Button type="submit" disabled={updateProfile.isPending}>
                      {updateProfile.isPending ? (
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
      </div>

      {/* Avatar Dialog */}
      <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Foto Profil</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="text-xl">{initials}</AvatarFallback>
              </Avatar>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="avatar" className="text-sm font-medium text-muted-foreground">
                Pilih gambar (JPG, PNG max 2MB)
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleAvatarChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <Button className="w-full" disabled={updateAvatar.isPending}>
              {updateAvatar.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengupload...
                </>
              ) : (
                <>
                  <Camera className="mr-2 h-4 w-4" />
                  Upload Foto
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
