import type { Address } from '@/types/user';
import type { PaginationMeta } from '@/constants/pagination';

export type AdminOrderStatus =
  'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
export type AdminPaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type AdminShippingStatus = 'pending' | 'processing' | 'shipped' | 'in_transit' | 'delivered';
export type JastipStatus =
  | 'pending'
  | 'waiting_confirmation'
  | 'confirmed'
  | 'purchased'
  | 'shipping_to_papua'
  | 'arrived_in_papua'
  | 'delivered'
  | 'completed'
  | 'cancelled';
export type PaymentMethod =
  'bank_transfer' | 'e_wallet' | 'credit_card' | 'cod' | 'virtual_account';

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
}
export interface AdminOrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variantName?: string | null;
}
export interface AdminOrder {
  id: string;
  orderNumber: string;
  customer: AdminCustomer;
  items: AdminOrderItem[];
  shippingAddress: Address | null;
  status: AdminOrderStatus;
  paymentStatus: AdminPaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  notes?: string | null;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface OrderTimelineEntry {
  id: string;
  status: string;
  label: string;
  note?: string | null;
  createdAt: string;
  createdBy?: string | null;
}

export interface AdminJastip {
  id: string;
  requestNumber: string;
  customer: AdminCustomer;
  productName: string;
  productUrl: string;
  quantity: number;
  estimatedPrice: number;
  serviceFee: number;
  shippingFee: number;
  totalPrice: number;
  status: JastipStatus;
  adminNotes?: string | null;
  trackingNumber?: string | null;
  courier?: string | null;
  createdAt: string;
  updatedAt: string;
  timeline?: JastipTimelineEntry[];
}
export interface JastipTimelineEntry {
  id: string;
  status: JastipStatus;
  label: string;
  note?: string | null;
  createdAt: string;
  createdBy?: string | null;
}

export interface AdminPayment {
  id: string;
  paymentNumber: string;
  customer: AdminCustomer;
  orderId?: string | null;
  orderNumber?: string | null;
  jastipId?: string | null;
  jastipNumber?: string | null;
  amount: number;
  method: PaymentMethod;
  status: AdminPaymentStatus;
  proofUrl?: string | null;
  paidAt?: string | null;
  rejectionReason?: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface PaymentHistoryEntry {
  id: string;
  status: AdminPaymentStatus;
  note?: string | null;
  createdAt: string;
  createdBy?: string | null;
}

export interface AdminShipping {
  id: string;
  orderId: string;
  orderNumber: string;
  customer: AdminCustomer;
  address: Address | null;
  courier?: string | null;
  trackingNumber?: string | null;
  status: AdminShippingStatus;
  createdAt: string;
  updatedAt: string;
  timeline?: ShippingTimelineEntry[];
}
export interface ShippingTimelineEntry {
  id: string;
  status: AdminShippingStatus;
  label: string;
  note?: string | null;
  createdAt: string;
  createdBy?: string | null;
}

export interface ListResult<T> {
  data: T[];
  meta: PaginationMeta;
}
export interface ListParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
export interface StatusUpdate {
  status: string;
  adminNotes?: string;
}
export interface TrackingUpdate {
  trackingNumber: string;
  courier: string;
  status?: string;
}
export interface PaymentRejection {
  reason: string;
}
