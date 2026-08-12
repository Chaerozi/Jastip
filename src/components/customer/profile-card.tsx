'use client';

import { User as UserIcon, Mail, Phone, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Profile } from '@/types/customer';
import type { User } from '@/types/user';

type ProfileLike =
  Profile | User | { full_name?: string | null; avatar_url?: string | null } | null;

interface ProfileCardProps {
  profile: ProfileLike;
  email?: string;
  phone?: string | null;
  onEditAvatar?: () => void;
  className?: string;
}

function getDisplayName(profile: ProfileLike): string | null {
  if (!profile) return null;
  if ('full_name' in profile && profile.full_name) return profile.full_name;
  if ('name' in profile && profile.name) return profile.name;
  return null;
}

function getAvatarUrl(profile: ProfileLike): string | null {
  if (!profile) return null;
  if ('avatar_url' in profile && profile.avatar_url) return profile.avatar_url;
  if ('avatar' in profile && profile.avatar) return profile.avatar;
  return null;
}

export function ProfileCard({ profile, email, phone, onEditAvatar, className }: ProfileCardProps) {
  const profilePhone = phone ?? ('phone' in (profile || {}) ? (profile as Profile)?.phone : null);
  const displayName = getDisplayName(profile);
  const avatarUrl = getAvatarUrl(profile);
  const initials = displayName
    ? displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <Card className={cn('', className)}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl || undefined} />
              <AvatarFallback className="text-xl">{initials}</AvatarFallback>
            </Avatar>
            {onEditAvatar && (
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                onClick={onEditAvatar}
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>

          <h3 className="text-lg font-semibold">{displayName || 'Pengguna'}</h3>

          <div className="mt-4 w-full space-y-2">
            {email && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{email}</span>
              </div>
            )}

            {profilePhone && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{profilePhone}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ProfileCompletionCardProps {
  completion: number;
  className?: string;
}

export function ProfileCompletionCard({ completion, className }: ProfileCompletionCardProps) {
  return (
    <Card className={cn('', className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Kelengkapan Profil</span>
              <span className="text-sm text-muted-foreground">{completion}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
          <UserIcon className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}
