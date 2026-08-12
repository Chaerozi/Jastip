import apiClient from '@/lib/axios';
import { ADMIN_OPERATIONS_ENDPOINTS as E } from '@/constants/admin-operations';
import type {
  AdminJastip,
  AdminOrder,
  AdminPayment,
  AdminShipping,
  ListParams,
  ListResult,
  OrderTimelineEntry,
  JastipTimelineEntry,
  PaymentHistoryEntry,
  ShippingTimelineEntry,
  PaymentRejection,
  StatusUpdate,
  TrackingUpdate,
} from '../types';

type ApiEnvelope<T> = { data: T; meta?: ListResult<T>['meta'] };
const unwrap = <T>(value: ApiEnvelope<T> | T): T =>
  (typeof value === 'object' && value !== null && 'data' in value ? value.data : value) as T;
const unwrapList = <T>(value: ApiEnvelope<T[]>): ListResult<T> => ({
  data: value.data,
  meta: value.meta ?? {
    currentPage: 1,
    perPage: value.data.length,
    totalItems: value.data.length,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
});

export const orderService = {
  async list(params: ListParams) {
    const response = await apiClient.get<ApiEnvelope<AdminOrder[]>>(E.ORDERS.LIST, { params });
    return unwrapList(response.data);
  },
  async detail(id: string) {
    return unwrap((await apiClient.get<ApiEnvelope<AdminOrder>>(E.ORDERS.DETAIL(id))).data);
  },
  async updateStatus(id: string, payload: StatusUpdate) {
    return unwrap(
      (await apiClient.put<ApiEnvelope<AdminOrder>>(E.ORDERS.STATUS(id), payload)).data
    );
  },
  async timeline(id: string) {
    return unwrap(
      (await apiClient.get<ApiEnvelope<OrderTimelineEntry[]>>(E.ORDERS.TIMELINE(id))).data
    );
  },
};
export const jastipService = {
  async list(params: ListParams) {
    return unwrapList(
      (await apiClient.get<ApiEnvelope<AdminJastip[]>>(E.JASTIP.LIST, { params })).data
    );
  },
  async detail(id: string) {
    return unwrap((await apiClient.get<ApiEnvelope<AdminJastip>>(E.JASTIP.DETAIL(id))).data);
  },
  async updateStatus(id: string, payload: StatusUpdate) {
    return unwrap(
      (await apiClient.put<ApiEnvelope<AdminJastip>>(E.JASTIP.STATUS(id), payload)).data
    );
  },
  async updateTracking(id: string, payload: TrackingUpdate) {
    return unwrap(
      (await apiClient.put<ApiEnvelope<AdminJastip>>(E.JASTIP.TRACKING(id), payload)).data
    );
  },
};
export const paymentService = {
  async list(params: ListParams) {
    return unwrapList(
      (await apiClient.get<ApiEnvelope<AdminPayment[]>>(E.PAYMENTS.LIST, { params })).data
    );
  },
  async detail(id: string) {
    return unwrap((await apiClient.get<ApiEnvelope<AdminPayment>>(E.PAYMENTS.DETAIL(id))).data);
  },
  async approve(id: string) {
    return unwrap((await apiClient.put<ApiEnvelope<AdminPayment>>(E.PAYMENTS.APPROVE(id))).data);
  },
  async reject(id: string, payload: PaymentRejection) {
    return unwrap(
      (await apiClient.put<ApiEnvelope<AdminPayment>>(E.PAYMENTS.REJECT(id), payload)).data
    );
  },
};
export const shippingService = {
  async list(params: ListParams) {
    return unwrapList(
      (await apiClient.get<ApiEnvelope<AdminShipping[]>>(E.SHIPPING.LIST, { params })).data
    );
  },
  async detail(id: string) {
    return unwrap((await apiClient.get<ApiEnvelope<AdminShipping>>(E.SHIPPING.DETAIL(id))).data);
  },
  async update(id: string, payload: TrackingUpdate) {
    return unwrap(
      (await apiClient.put<ApiEnvelope<AdminShipping>>(E.SHIPPING.UPDATE(id), payload)).data
    );
  },
};
