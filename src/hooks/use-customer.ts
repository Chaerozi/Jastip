import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  profileService,
  addressService,
  wishlistService,
  cartService,
  orderService,
  paymentService,
  notificationService,
  couponService,
  dashboardService,
} from '@/services/customer';
import type {
  ProfileUpdate,
  CustomerAddressInput,
  AddToCartInput,
  CustomerOrderInput,
  CustomerOrderFilters,
  CustomerPaymentInput,
} from '@/types/customer';

// Profile Hooks
export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => profileService.getProfile(),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: ProfileUpdate) => profileService.updateProfile(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (avatarUrl: string) => profileService.updateAvatar(avatarUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

// Address Hooks
export function useAddresses() {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressService.getAddresses(),
  });
}

export function useAddress(id: string) {
  return useQuery({
    queryKey: ['address', id],
    queryFn: () => addressService.getAddress(id),
    enabled: !!id,
  });
}

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: CustomerAddressInput) => addressService.createAddress(address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<CustomerAddressInput> }) =>
      addressService.updateAddress(id, updates),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      queryClient.invalidateQueries({ queryKey: ['address', id] });
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => addressService.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => addressService.setDefaultAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
}

// Wishlist Hooks
export function useWishlist() {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistService.getWishlist(),
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => wishlistService.addToWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => wishlistService.removeFromWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
}

export function useIsInWishlist(productId: string) {
  return useQuery({
    queryKey: ['wishlist', productId],
    queryFn: () => wishlistService.isInWishlist(productId),
    enabled: !!productId,
  });
}

// Cart Hooks
export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => cartService.getCart(),
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AddToCartInput) => cartService.addToCart(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartService.updateCartItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => cartService.removeCartItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useApplyCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => cartService.applyCoupon(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useRemoveCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartService.removeCoupon(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

// Order Hooks
export function useOrders(filters?: CustomerOrderFilters) {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: () => orderService.getOrders(filters),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrder(id),
    enabled: !!id,
  });
}

export function useOrderByNumber(orderNumber: string) {
  return useQuery({
    queryKey: ['order', orderNumber],
    queryFn: () => orderService.getOrderByNumber(orderNumber),
    enabled: !!orderNumber,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      input: CustomerOrderInput & {
        items: { product_id: string; product_name: string; quantity: number; price: number }[];
        subtotal: number;
        discount?: number;
      }
    ) => orderService.createOrder(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => orderService.cancelOrder(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', id] });
    },
  });
}

// Payment Hooks
export function usePayment(id: string) {
  return useQuery({
    queryKey: ['payment', id],
    queryFn: () => paymentService.getPayment(id),
    enabled: !!id,
  });
}

export function usePaymentByOrder(orderId: string) {
  return useQuery({
    queryKey: ['payment', 'order', orderId],
    queryFn: () => paymentService.getPaymentByOrder(orderId),
    enabled: !!orderId,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CustomerPaymentInput) => paymentService.createPayment(input),
    onSuccess: (_, input) => {
      queryClient.invalidateQueries({ queryKey: ['payment'] });
      queryClient.invalidateQueries({ queryKey: ['order', input.order_id] });
    },
  });
}

export function useUploadProof() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ paymentId, proofUrl }: { paymentId: string; proofUrl: string }) =>
      paymentService.uploadProof(paymentId, proofUrl),
    onSuccess: (_, { paymentId }) => {
      queryClient.invalidateQueries({ queryKey: ['payment', paymentId] });
    },
  });
}

// Notification Hooks
export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getNotifications(),
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: () => notificationService.getUnreadCount(),
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationService.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

// Coupon Hooks
export function useValidateCoupon(code: string | null, subtotal: number) {
  return useQuery({
    queryKey: ['coupon', code, subtotal],
    queryFn: () => (code ? couponService.validateCoupon(code, subtotal) : null),
    enabled: !!code && subtotal > 0,
  });
}

// Dashboard Hooks
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardService.getStats(),
  });
}

export function useRecentOrders(limit = 5) {
  return useQuery({
    queryKey: ['dashboard', 'recent-orders', limit],
    queryFn: () => dashboardService.getRecentOrders(limit),
  });
}
