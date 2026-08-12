export const ADMIN_OPERATIONS_ENDPOINTS = {
  ORDERS: {
    LIST: '/admin/orders',
    DETAIL: (id: string) => `/admin/orders/${id}`,
    STATUS: (id: string) => `/admin/orders/${id}/status`,
    TIMELINE: (id: string) => `/admin/orders/${id}/timeline`,
  },
  JASTIP: {
    LIST: '/admin/jastip',
    DETAIL: (id: string) => `/admin/jastip/${id}`,
    STATUS: (id: string) => `/admin/jastip/${id}/status`,
    TRACKING: (id: string) => `/admin/jastip/${id}/tracking`,
  },
  PAYMENTS: {
    LIST: '/admin/payments',
    DETAIL: (id: string) => `/admin/payments/${id}`,
    APPROVE: (id: string) => `/admin/payments/${id}/approve`,
    REJECT: (id: string) => `/admin/payments/${id}/reject`,
  },
  SHIPPING: {
    LIST: '/admin/shipping',
    DETAIL: (id: string) => `/admin/shipping/${id}`,
    UPDATE: (id: string) => `/admin/shipping/${id}`,
  },
} as const;
