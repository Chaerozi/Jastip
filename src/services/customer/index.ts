import { apiClient } from '@/lib/axios';
import type {
  Profile,
  ProfileUpdate,
  CustomerAddress,
  CustomerAddressInput,
  WishlistItem,
  Cart,
  CartItem,
  AddToCartInput,
  CustomerOrder,
  CustomerOrderInput,
  CustomerOrderFilters,
  CustomerPayment,
  CustomerPaymentInput,
  Notification,
  Coupon,
  DashboardStats,
  RecentOrder,
} from '@/types/customer';

// Profile Service
export const profileService = {
  async getProfile(): Promise<Profile | null> {
    const { data } = await apiClient.get<Profile>('/customer/profile');
    return data;
  },

  async createProfile(profile: ProfileUpdate): Promise<Profile> {
    const { data } = await apiClient.post<Profile>('/customer/profile', profile);
    return data;
  },

  async updateProfile(updates: ProfileUpdate): Promise<Profile> {
    const { data } = await apiClient.put<Profile>('/customer/profile', updates);
    return data;
  },

  async updateAvatar(avatarUrl: string): Promise<Profile> {
    const { data } = await apiClient.put<Profile>('/customer/profile/avatar', {
      avatar_url: avatarUrl,
    });
    return data;
  },
};

// Address Service
export const addressService = {
  async getAddresses(): Promise<CustomerAddress[]> {
    const { data } = await apiClient.get<CustomerAddress[]>('/customer/addresses');
    return data || [];
  },

  async getAddress(id: string): Promise<CustomerAddress | null> {
    const { data } = await apiClient.get<CustomerAddress>(`/customer/addresses/${id}`);
    return data;
  },

  async createAddress(address: CustomerAddressInput): Promise<CustomerAddress> {
    const { data } = await apiClient.post<CustomerAddress>('/customer/addresses', address);
    return data;
  },

  async updateAddress(
    id: string,
    updates: Partial<CustomerAddressInput>
  ): Promise<CustomerAddress> {
    const { data } = await apiClient.put<CustomerAddress>(`/customer/addresses/${id}`, updates);
    return data;
  },

  async deleteAddress(id: string): Promise<void> {
    await apiClient.delete(`/customer/addresses/${id}`);
  },

  async setDefaultAddress(id: string): Promise<void> {
    await apiClient.put(`/customer/addresses/${id}/default`);
  },
};

// Wishlist Service
export const wishlistService = {
  async getWishlist(): Promise<WishlistItem[]> {
    const { data } = await apiClient.get<WishlistItem[]>('/customer/wishlist');
    return data || [];
  },

  async addToWishlist(productId: string): Promise<WishlistItem> {
    const { data } = await apiClient.post<WishlistItem>('/customer/wishlist', {
      product_id: productId,
    });
    return data;
  },

  async removeFromWishlist(productId: string): Promise<void> {
    await apiClient.delete(`/customer/wishlist/${productId}`);
  },

  async isInWishlist(productId: string): Promise<boolean> {
    const { data } = await apiClient.get<{ exists: boolean }>(
      `/customer/wishlist/check/${productId}`
    );
    return data.exists;
  },
};

// Cart Service
export const cartService = {
  async getCart(): Promise<Cart | null> {
    const { data } = await apiClient.get<Cart>('/customer/cart');
    return data;
  },

  async addToCart(input: AddToCartInput): Promise<CartItem> {
    const { data } = await apiClient.post<CartItem>('/customer/cart/items', input);
    return data;
  },

  async updateCartItem(itemId: string, quantity: number): Promise<CartItem> {
    const { data } = await apiClient.put<CartItem>(`/customer/cart/items/${itemId}`, { quantity });
    return data;
  },

  async removeCartItem(itemId: string): Promise<void> {
    await apiClient.delete(`/customer/cart/items/${itemId}`);
  },

  async clearCart(): Promise<void> {
    await apiClient.delete('/customer/cart/items');
  },

  async applyCoupon(code: string): Promise<Cart> {
    const { data } = await apiClient.post<Cart>('/customer/cart/coupon', { code });
    return data;
  },

  async removeCoupon(): Promise<Cart> {
    const { data } = await apiClient.delete<Cart>('/customer/cart/coupon');
    return data;
  },
};

// Order Service
export const orderService = {
  async getOrders(filters?: CustomerOrderFilters): Promise<CustomerOrder[]> {
    const { data } = await apiClient.get<CustomerOrder[]>('/customer/orders', { params: filters });
    return data || [];
  },

  async getOrder(id: string): Promise<CustomerOrder | null> {
    const { data } = await apiClient.get<CustomerOrder>(`/customer/orders/${id}`);
    return data;
  },

  async getOrderByNumber(orderNumber: string): Promise<CustomerOrder | null> {
    const { data } = await apiClient.get<CustomerOrder>(`/customer/orders/number/${orderNumber}`);
    return data;
  },

  async createOrder(
    input: CustomerOrderInput & {
      items: { product_id: string; product_name: string; quantity: number; price: number }[];
      subtotal: number;
      discount?: number;
    }
  ): Promise<CustomerOrder> {
    const { data } = await apiClient.post<CustomerOrder>('/customer/orders', input);
    return data;
  },

  async cancelOrder(id: string): Promise<CustomerOrder> {
    const { data } = await apiClient.put<CustomerOrder>(`/customer/orders/${id}/cancel`);
    return data;
  },
};

// Payment Service
export const paymentService = {
  async getPayment(id: string): Promise<CustomerPayment | null> {
    const { data } = await apiClient.get<CustomerPayment>(`/customer/payments/${id}`);
    return data;
  },

  async getPaymentByOrder(orderId: string): Promise<CustomerPayment | null> {
    const { data } = await apiClient.get<CustomerPayment>(`/customer/payments/order/${orderId}`);
    return data;
  },

  async createPayment(input: CustomerPaymentInput): Promise<CustomerPayment> {
    const { data } = await apiClient.post<CustomerPayment>('/customer/payments', input);
    return data;
  },

  async uploadProof(paymentId: string, proofUrl: string): Promise<CustomerPayment> {
    const { data } = await apiClient.put<CustomerPayment>(`/customer/payments/${paymentId}/proof`, {
      proof_url: proofUrl,
    });
    return data;
  },

  async updateStatus(
    paymentId: string,
    status: CustomerPayment['status']
  ): Promise<CustomerPayment> {
    const { data } = await apiClient.put<CustomerPayment>(
      `/customer/payments/${paymentId}/status`,
      {
        status,
      }
    );
    return data;
  },
};

// Notification Service
export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    const { data } = await apiClient.get<Notification[]>('/customer/notifications');
    return data || [];
  },

  async getUnreadCount(): Promise<number> {
    const { data } = await apiClient.get<{ count: number }>('/customer/notifications/unread-count');
    return data.count;
  },

  async markAsRead(id: string): Promise<void> {
    await apiClient.put(`/customer/notifications/${id}/read`);
  },

  async markAllAsRead(): Promise<void> {
    await apiClient.put('/customer/notifications/read-all');
  },

  async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(`/customer/notifications/${id}`);
  },
};

// Coupon Service
export const couponService = {
  async validateCoupon(code: string, subtotal: number): Promise<Coupon | null> {
    const { data } = await apiClient.get<Coupon>('/customer/coupons/validate', {
      params: { code, subtotal },
    });
    return data;
  },

  calculateDiscount(coupon: Coupon, subtotal: number): number {
    let discount = 0;

    if (coupon.discount_type === 'percentage') {
      discount = (subtotal * coupon.discount_value) / 100;
    } else {
      discount = coupon.discount_value;
    }

    // Apply max discount cap
    if (coupon.max_discount && discount > coupon.max_discount) {
      discount = coupon.max_discount;
    }

    return Math.min(discount, subtotal);
  },
};

// Dashboard Service
export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const { data } = await apiClient.get<DashboardStats>('/customer/dashboard/stats');
    return data;
  },

  async getRecentOrders(limit = 5): Promise<RecentOrder[]> {
    const { data } = await apiClient.get<RecentOrder[]>('/customer/dashboard/recent-orders', {
      params: { limit },
    });
    return data || [];
  },
};
