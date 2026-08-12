'use client';

import { Bell, Shield, Moon, Sun, Globe, Info, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground">Kelola preferensi akun Anda</p>
      </div>

      <div className="space-y-4">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tampilan</CardTitle>
            <CardDescription>Sesuaikan tampilan aplikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <div>
                  <Label className="font-medium">Mode Gelap</Label>
                  <p className="text-sm text-muted-foreground">
                    {theme === 'dark' ? 'Mode gelap aktif' : 'Mode terang aktif'}
                  </p>
                </div>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notifikasi</CardTitle>
            <CardDescription>Atur preferensi notifikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5" />
                <div>
                  <Label className="font-medium">Notifikasi Email</Label>
                  <p className="text-sm text-muted-foreground">Terima notifikasi via email</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5" />
                <div>
                  <Label className="font-medium">Notifikasi Push</Label>
                  <p className="text-sm text-muted-foreground">Terima notifikasi di browser</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5" />
                <div>
                  <Label className="font-medium">Promo dan Penawaran</Label>
                  <p className="text-sm text-muted-foreground">Terima info promo dan diskon</p>
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Keamanan</CardTitle>
            <CardDescription>Kelola keamanan akun Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-between" asChild>
              <Link href={ROUTES.ACCOUNT.CHANGE_PASSWORD}>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5" />
                  <span>Ubah Password</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bahasa</CardTitle>
            <CardDescription>Pilih bahasa aplikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5" />
                <div>
                  <Label className="font-medium">Bahasa</Label>
                  <p className="text-sm text-muted-foreground">Bahasa Indonesia</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Ubah
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tentang Aplikasi</CardTitle>
            <CardDescription>Informasi aplikasi Kitorang Shop</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5" />
                <div>
                  <Label className="font-medium">Versi Aplikasi</Label>
                  <p className="text-sm text-muted-foreground">1.0.0</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href={ROUTES.TERMS}>Syarat & Ketentuan</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={ROUTES.PRIVACY}>Kebijakan Privasi</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
