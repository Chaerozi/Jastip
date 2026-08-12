import type {
  AdminOrderStatus,
  AdminPaymentStatus,
  AdminShippingStatus,
  JastipStatus,
} from './index';

export const ORDER_STATUS_LABELS: Record<AdminOrderStatus, string> = {
  pending: 'Menunggu',
  confirmed: 'Dikonfirmasi',
  processing: 'Diproses',
  shipped: 'Dikirim',
  delivered: 'Diterima',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
};
export const PAYMENT_STATUS_LABELS: Record<AdminPaymentStatus, string> = {
  pending: 'Menunggu',
  paid: 'Lunas',
  failed: 'Gagal',
  refunded: 'Dikembalikan',
};
export const SHIPPING_STATUS_LABELS: Record<AdminShippingStatus, string> = {
  pending: 'Menunggu',
  processing: 'Diproses',
  shipped: 'Dikirim',
  in_transit: 'Dalam Perjalanan',
  delivered: 'Terkirim',
};
export const JASTIP_STATUS_LABELS: Record<JastipStatus, string> = {
  pending: 'Menunggu',
  waiting_confirmation: 'Menunggu Konfirmasi',
  confirmed: 'Dikonfirmasi',
  purchased: 'Sudah Dibeli',
  shipping_to_papua: 'Dikirim ke Papua',
  arrived_in_papua: 'Tiba di Papua',
  delivered: 'Terkirim',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
};
export const PAYMENT_METHOD_LABELS = {
  bank_transfer: 'Transfer Bank',
  e_wallet: 'E-Wallet',
  credit_card: 'Kartu Kredit',
  cod: 'Bayar di Tempat',
  virtual_account: 'Virtual Account',
} as const;
