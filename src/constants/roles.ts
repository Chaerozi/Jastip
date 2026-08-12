export const ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  JASTIP: 'jastip',
  SELLER: 'seller',
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrator',
  customer: 'Pelanggan',
  jastip: 'Jastip',
  seller: 'Penjual',
};

export const ROLE_PERMISSIONS = {
  admin: ['manage_products', 'manage_orders', 'manage_users', 'view_analytics', 'manage_settings'],
  seller: ['manage_own_products', 'view_own_orders', 'update_order_status'],
  jastip: ['create_jastip', 'manage_own_jastip', 'view_jastip_orders'],
  customer: ['place_order', 'view_own_orders', 'manage_cart', 'manage_profile'],
} as const;

export type Permission = (typeof ROLE_PERMISSIONS)[UserRole][number];

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission as never);
}
