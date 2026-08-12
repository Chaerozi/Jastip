export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    VERIFY_EMAIL: '/verify-email',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (slug: string) => `/products/${slug}`,
    CATEGORY: (slug: string) => `/products/category/${slug}`,
    SEARCH: '/products/search',
  },
  CART: '/account/cart',
  CHECKOUT: '/account/checkout',
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    TRACK: (id: string) => `/orders/${id}/track`,
  },
  ACCOUNT: {
    HOME: '/account/dashboard',
    PROFILE: '/account/profile',
    EDIT_PROFILE: '/account/profile/edit',
    CHANGE_PASSWORD: '/account/change-password',
    ADDRESSES: '/account/addresses',
    NEW_ADDRESS: '/account/addresses/new',
    EDIT_ADDRESS: (id: string) => `/account/addresses/${id}/edit`,
    WISHLIST: '/account/wishlist',
    ORDERS: '/account/orders',
    ORDER_DETAIL: (id: string) => `/account/orders/${id}`,
    NOTIFICATIONS: '/account/notifications',
    SETTINGS: '/account/settings',
    PAYMENT: (orderId: string) => `/account/orders/${orderId}/payment`,
    PAYMENT_SUCCESS: (orderId: string) => `/account/orders/${orderId}/payment/success`,
    PAYMENT_FAILED: (orderId: string) => `/account/orders/${orderId}/payment/failed`,
  },
  DASHBOARD: {
    MAIN: '/admin',
    PRODUCTS: '/admin/products',
    CATEGORIES: '/admin/categories',
    BANNERS: '/admin/banners',
    ORDERS: '/admin/orders',
    JASTIP: '/admin/jastip',
    PAYMENTS: '/admin/payments',
    SHIPPING: '/admin/shipping',
    CUSTOMERS: '/admin/customers',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
  },
  JASTIP: {
    LIST: '/jastip',
    CREATE: '/jastip/create',
    DETAIL: (id: string) => `/jastip/${id}`,
  },
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  TERMS: '/terms',
  PRIVACY: '/privacy',
} as const;

export type AppRoutes = typeof ROUTES;

export function getRouteKey(path: string): string | undefined {
  return Object.keys(ROUTES).find((key) => {
    const route = ROUTES[key as keyof typeof ROUTES];
    if (typeof route === 'string') {
      return route === path;
    }
    return false;
  });
}
