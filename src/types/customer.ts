// Customer Profile Types
export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdate {
  full_name?: string;
  phone?: string;
  avatar_url?: string;
}

// Address Types
export interface CustomerAddress {
  id: string;
  user_id: string;
  label: string;
  recipient_name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  postal_code: string;
  full_address: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomerAddressInput {
  label: string;
  recipient_name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  postal_code: string;
  full_address: string;
  is_default?: boolean;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product?: ProductPreview;
}

export interface ProductPreview {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

// Cart Types
export interface Cart {
  id: string;
  user_id: string;
  coupon_code: string | null;
  created_at: string;
  updated_at: string;
  items: CartItem[];
  coupon?: Coupon;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  product?: ProductPreview;
}

export interface CartItemInput {
  product_id: string;
  quantity: number;
  price: number;
}

export interface AddToCartInput {
  product_id: string;
  quantity?: number;
}

// Order Types (Customer-specific)
export type CustomerOrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface CustomerOrder {
  id: string;
  order_number: string;
  user_id: string;
  status: CustomerOrderStatus;
  shipping_address_id: string | null;
  shipping_method: string | null;
  shipping_cost: number;
  subtotal: number;
  discount: number;
  total: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  items: CustomerOrderItem[];
  shipping_address?: CustomerAddress;
  payment?: CustomerPayment;
}

export interface CustomerOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  subtotal: number;
  created_at: string;
}

export interface CustomerOrderInput {
  shipping_address_id: string;
  shipping_method: string;
  shipping_cost: number;
  notes?: string;
}

export interface CustomerOrderFilters {
  status?: CustomerOrderStatus;
  search?: string;
  from_date?: string;
  to_date?: string;
}

// Payment Types (Customer-specific)
export type CustomerPaymentMethod = 'bank_transfer' | 'qris' | 'e_wallet';
export type CustomerPaymentProvider =
  'bca' | 'mandiri' | 'bni' | 'bri' | 'gopay' | 'ovo' | 'dana' | 'shopeepay';
export type CustomerPaymentStatus = 'pending' | 'paid' | 'failed' | 'expired';

export interface CustomerPayment {
  id: string;
  order_id: string;
  user_id: string;
  payment_method: CustomerPaymentMethod;
  payment_provider: CustomerPaymentProvider | null;
  amount: number;
  status: CustomerPaymentStatus;
  proof_url: string | null;
  paid_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerPaymentInput {
  order_id: string;
  payment_method: CustomerPaymentMethod;
  payment_provider?: CustomerPaymentProvider;
  amount: number;
}

export interface CustomerPaymentProofUpload {
  payment_id: string;
  proof_url: string;
}

// Notification Types
export type NotificationType = 'order' | 'payment' | 'promotion' | 'system';

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  read_at: string | null;
  created_at: string;
}

// Coupon Types
export type DiscountType = 'percentage' | 'fixed';

export interface Coupon {
  id: string;
  code: string;
  discount_type: DiscountType;
  discount_value: number;
  min_purchase: number | null;
  max_discount: number | null;
  usage_limit: number | null;
  used_count: number;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  created_at: string;
}

export interface CouponValidation {
  code: string;
  subtotal: number;
}

// Dashboard Types
export interface DashboardStats {
  total_orders: number;
  pending_orders: number;
  wishlist_count: number;
  notifications_unread: number;
}

export interface RecentOrder {
  id: string;
  order_number: string;
  status: CustomerOrderStatus;
  total: number;
  created_at: string;
}

// Shipping Types
export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  cost: number;
  estimated_days: string;
}

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'regular',
    name: 'Reguler',
    description: 'Pengiriman standar 3-5 hari',
    cost: 15000,
    estimated_days: '3-5 hari',
  },
  {
    id: 'express',
    name: 'Express',
    description: 'Pengiriman cepat 1-2 hari',
    cost: 30000,
    estimated_days: '1-2 hari',
  },
  {
    id: 'sameday',
    name: 'Same Day',
    description: 'Pengiriman hari ini',
    cost: 50000,
    estimated_days: 'Hari ini',
  },
];

// Payment Method Options
export const PAYMENT_METHODS: {
  id: CustomerPaymentMethod;
  name: string;
  providers?: CustomerPaymentProvider[];
}[] = [
  {
    id: 'bank_transfer',
    name: 'Transfer Bank',
    providers: ['bca', 'mandiri', 'bni', 'bri'],
  },
  {
    id: 'qris',
    name: 'QRIS',
  },
  {
    id: 'e_wallet',
    name: 'E-Wallet',
    providers: ['gopay', 'ovo', 'dana', 'shopeepay'],
  },
];

export const PAYMENT_PROVIDERS: Record<
  CustomerPaymentProvider,
  { name: string; account?: string }
> = {
  bca: { name: 'Bank BCA', account: '1234567890' },
  mandiri: { name: 'Bank Mandiri', account: '0987654321' },
  bni: { name: 'Bank BNI', account: '1122334455' },
  bri: { name: 'Bank BRI', account: '5566778899' },
  gopay: { name: 'GoPay' },
  ovo: { name: 'OVO' },
  dana: { name: 'DANA' },
  shopeepay: { name: 'ShopeePay' },
};
