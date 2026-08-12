'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jastipService, orderService, paymentService, shippingService } from '../services';
import { adminOperationsKeys as K } from './query-keys';
import type { ListParams, PaymentRejection, StatusUpdate, TrackingUpdate } from '../types';

export function useAdminOrders(params: ListParams) {
  return useQuery({ queryKey: K.orderList(params), queryFn: () => orderService.list(params) });
}
export function useAdminOrder(id: string) {
  return useQuery({
    queryKey: K.order(id),
    queryFn: () => orderService.detail(id),
    enabled: Boolean(id),
  });
}
export function useOrderTimeline(id: string) {
  return useQuery({
    queryKey: K.orderTimeline(id),
    queryFn: () => orderService.timeline(id),
    enabled: Boolean(id),
  });
}
export function useUpdateOrderStatus() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: StatusUpdate }) =>
      orderService.updateStatus(id, payload),
    onSuccess: (_, variables) => {
      client.invalidateQueries({ queryKey: K.order(variables.id) });
      client.invalidateQueries({ queryKey: K.orders() });
      client.invalidateQueries({ queryKey: K.orderTimeline(variables.id) });
    },
  });
}

export function useAdminJastip(params: ListParams) {
  return useQuery({ queryKey: K.jastipList(params), queryFn: () => jastipService.list(params) });
}
export function useAdminJastipDetail(id: string) {
  return useQuery({
    queryKey: K.jastipDetail(id),
    queryFn: () => jastipService.detail(id),
    enabled: Boolean(id),
  });
}
export function useJastipTimeline(id: string) {
  return useQuery({
    queryKey: [...K.jastipDetail(id), 'timeline'],
    queryFn: async () => (await jastipService.detail(id)).timeline ?? [],
    enabled: Boolean(id),
  });
}
export function useUpdateJastipStatus() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: StatusUpdate }) =>
      jastipService.updateStatus(id, payload),
    onSuccess: (_, variables) => {
      client.invalidateQueries({ queryKey: K.jastipDetail(variables.id) });
      client.invalidateQueries({ queryKey: K.jastip() });
    },
  });
}
export function useUpdateJastipTracking() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TrackingUpdate }) =>
      jastipService.updateTracking(id, payload),
    onSuccess: (_, variables) => {
      client.invalidateQueries({ queryKey: K.jastipDetail(variables.id) });
      client.invalidateQueries({ queryKey: K.jastip() });
    },
  });
}

export function useAdminPayments(params: ListParams) {
  return useQuery({ queryKey: K.paymentList(params), queryFn: () => paymentService.list(params) });
}
export function useAdminPayment(id: string) {
  return useQuery({
    queryKey: K.payment(id),
    queryFn: () => paymentService.detail(id),
    enabled: Boolean(id),
  });
}
export function useApprovePayment() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => paymentService.approve(id),
    onSuccess: (_, id) => {
      client.invalidateQueries({ queryKey: K.payment(id) });
      client.invalidateQueries({ queryKey: K.payments() });
    },
  });
}
export function useRejectPayment() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: PaymentRejection }) =>
      paymentService.reject(id, payload),
    onSuccess: (_, variables) => {
      client.invalidateQueries({ queryKey: K.payment(variables.id) });
      client.invalidateQueries({ queryKey: K.payments() });
    },
  });
}

export function useAdminShipping(params: ListParams) {
  return useQuery({
    queryKey: K.shippingList(params),
    queryFn: () => shippingService.list(params),
  });
}
export function useAdminShippingDetail(id: string) {
  return useQuery({
    queryKey: K.shippingDetail(id),
    queryFn: () => shippingService.detail(id),
    enabled: Boolean(id),
  });
}
export function useShippingTimeline(id: string) {
  return useQuery({
    queryKey: [...K.shippingDetail(id), 'timeline'],
    queryFn: async () => (await shippingService.detail(id)).timeline ?? [],
    enabled: Boolean(id),
  });
}
export function useUpdateShipping() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TrackingUpdate }) =>
      shippingService.update(id, payload),
    onSuccess: (_, variables) => {
      client.invalidateQueries({ queryKey: K.shippingDetail(variables.id) });
      client.invalidateQueries({ queryKey: K.shipping() });
    },
  });
}
