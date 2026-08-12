'use client';

import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AddressCard } from '@/components/customer/address-card';
import { EmptyState, LoadingState } from '@/components/customer/empty-states';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAddresses, useDeleteAddress, useSetDefaultAddress } from '@/hooks/use-customer';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

export default function AddressesPage() {
  const { data: addresses, isLoading } = useAddresses();
  const deleteAddress = useDeleteAddress();
  const setDefaultAddress = useSetDefaultAddress();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    window.location.href = ROUTES.ACCOUNT.EDIT_ADDRESS(id);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedAddressId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedAddressId) {
      await deleteAddress.mutateAsync(selectedAddressId);
      setDeleteDialogOpen(false);
      setSelectedAddressId(null);
    }
  };

  const handleSetDefault = async (id: string) => {
    await setDefaultAddress.mutateAsync(id);
  };

  if (isLoading) {
    return <LoadingState type="list" count={3} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Alamat Saya</h1>
          <p className="text-muted-foreground">Kelola alamat pengiriman Anda</p>
        </div>
        <Button asChild>
          <Link href={ROUTES.ACCOUNT.NEW_ADDRESS}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Alamat
          </Link>
        </Button>
      </div>

      {addresses && addresses.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      ) : (
        <EmptyState type="addresses" />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Alamat</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus alamat ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteAddress.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menghapus...
                </>
              ) : (
                'Hapus'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
