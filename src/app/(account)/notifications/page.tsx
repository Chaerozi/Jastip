'use client';

import { useState } from 'react';
import { Bell, CheckCheck, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NotificationCard } from '@/components/customer/notification-card';
import { EmptyState, LoadingState } from '@/components/customer/empty-states';
import {
  useNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification,
} from '@/hooks/use-customer';

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useNotifications();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();
  const deleteNotification = useDeleteNotification();

  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications?.filter((n) =>
    activeTab === 'unread' ? !n.read_at : true
  );

  const unreadCount = notifications?.filter((n) => !n.read_at).length || 0;

  const handleMarkAsRead = async (id: string) => {
    await markAsRead.mutateAsync(id);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead.mutateAsync();
  };

  const handleDelete = async (id: string) => {
    await deleteNotification.mutateAsync(id);
  };

  if (isLoading) {
    return <LoadingState type="list" count={5} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifikasi</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `${unreadCount} notifikasi belum dibaca`
              : 'Semua notifikasi sudah dibaca'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            onClick={handleMarkAllAsRead}
            disabled={markAllAsRead.isPending}
          >
            {markAllAsRead.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menandai...
              </>
            ) : (
              <>
                <CheckCheck className="mr-2 h-4 w-4" />
                Tandai Semua Dibaca
              </>
            )}
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'all' | 'unread')}>
        <TabsList>
          <TabsTrigger value="all">
            Semua
            {notifications && notifications.length > 0 && (
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                {notifications.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Belum Dibaca
            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {notifications && notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <EmptyState type="notifications" />
          )}
        </TabsContent>

        <TabsContent value="unread" className="mt-6">
          {filteredNotifications && filteredNotifications.length > 0 ? (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              type="notifications"
              title="Tidak ada notifikasi baru"
              description="Semua notifikasi sudah Anda baca."
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
