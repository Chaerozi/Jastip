import type { Address } from './user';
import type { Product } from './product';

export type OrderStatus =
  'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partial_refund';

export type PaymentMethod =
  'bank_transfer' | 'e_wallet' | 'credit_card' | 'cod' | 'virtual_account';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user: { id: string; name: string; email: string };
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address | null;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  notes: string | null;
  trackingNumber: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Pick<Product, 'id' | 'name' | 'slug' | 'images'>;
  variantId: string | null;
  variant: { name: string; options: { name: string; value: string }[] } | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderFilters {
  search?: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  startDate?: string;
  endDate?: string;
  userId?: string;
}

export interface OrderSummary {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

export interface CreateOrderData {
  items: { productId: string; variantId?: string; quantity: number }[];
  shippingAddressId: string;
  billingAddressId?: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Menunggu Pembayaran',
  confirmed: 'Pembayaran Dikonfirmasi',
  processing: 'Sedang Diproses',
  shipped: 'Dikirim',
  delivered: 'Diterima',
  cancelled: 'Dibatalkan',
  refunded: 'Dikembalikan',
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: 'Menunggu Pembayaran',
  paid: 'Lunas',
  failed: 'Gagal',
  refunded: 'Dikembalikan',
  partial_refund: 'Sebagian Dikembalikan',
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  bank_transfer: 'Transfer Bank',
  e_wallet: 'E-Wallet',
  credit_card: 'Kartu Kredit',
  cod: 'Bayar di Tempat',
  virtual_account: 'Virtual Account',
};
