/**
 * Fleetbase Hooks - Logistics & Fulfillment
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fleetbaseService } from "@/lib/mock/fleetbase"
import type { DeliveryOrder, DeliverySlot, DeliveryZone, ReturnShipment } from "@/lib/mock/fleetbase"

// Query Keys
export const fleetbaseKeys = {
  all: ["fleetbase"] as const,
  zones: () => [...fleetbaseKeys.all, "zones"] as const,
  slots: (zoneId: string, date?: string) => [...fleetbaseKeys.all, "slots", zoneId, date] as const,
  delivery: (orderId: string) => [...fleetbaseKeys.all, "delivery", orderId] as const,
  tracking: (trackingId: string) => [...fleetbaseKeys.all, "tracking", trackingId] as const,
  returns: (customerId: string) => [...fleetbaseKeys.all, "returns", customerId] as const,
  returnDetail: (returnId: string) => [...fleetbaseKeys.all, "return", returnId] as const,
  warehouses: () => [...fleetbaseKeys.all, "warehouses"] as const,
  driverLocation: (driverId: string) => [...fleetbaseKeys.all, "driver", driverId] as const,
}

// Delivery Zones
export function useDeliveryZones() {
  return useQuery({
    queryKey: fleetbaseKeys.zones(),
    queryFn: () => fleetbaseService.getDeliveryZones(),
  })
}

export function useCheckDeliveryZone(postalCode: string) {
  return useQuery({
    queryKey: [...fleetbaseKeys.zones(), postalCode],
    queryFn: () => fleetbaseService.checkDeliveryZone(postalCode),
    enabled: !!postalCode,
  })
}

// Delivery Slots
export function useDeliverySlots(zoneId: string, date?: string) {
  return useQuery({
    queryKey: fleetbaseKeys.slots(zoneId, date),
    queryFn: () => fleetbaseService.getDeliverySlots(zoneId, date),
    enabled: !!zoneId,
  })
}

// Delivery Order / Tracking
export function useDeliveryOrder(orderId: string) {
  return useQuery({
    queryKey: fleetbaseKeys.delivery(orderId),
    queryFn: () => fleetbaseService.getDeliveryOrder(orderId),
    enabled: !!orderId,
    refetchInterval: 30000, // Refresh every 30 seconds for live tracking
  })
}

export function useDeliveryTracking(trackingId: string) {
  return useQuery({
    queryKey: fleetbaseKeys.tracking(trackingId),
    queryFn: () => fleetbaseService.getDeliveryTracking(trackingId),
    enabled: !!trackingId,
  })
}

export function useCreateDeliveryOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (orderId: string) => fleetbaseService.createDeliveryOrder(orderId),
    onSuccess: (data) => {
      queryClient.setQueryData(fleetbaseKeys.delivery(data.orderId), data)
    },
  })
}

// Returns
export function useReturnShipments(customerId: string) {
  return useQuery({
    queryKey: fleetbaseKeys.returns(customerId),
    queryFn: () => fleetbaseService.listReturnShipments(customerId),
    enabled: !!customerId,
  })
}

export function useReturnShipment(returnId: string) {
  return useQuery({
    queryKey: fleetbaseKeys.returnDetail(returnId),
    queryFn: () => fleetbaseService.getReturnShipment(returnId),
    enabled: !!returnId,
  })
}

export function useCreateReturnShipment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) =>
      fleetbaseService.createReturnShipment(orderId, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: fleetbaseKeys.returns("") })
    },
  })
}

// Warehouses
export function useWarehouses() {
  return useQuery({
    queryKey: fleetbaseKeys.warehouses(),
    queryFn: () => fleetbaseService.getWarehouses(),
  })
}

// Driver Location (for live tracking)
export function useDriverLocation(driverId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: fleetbaseKeys.driverLocation(driverId),
    queryFn: () => fleetbaseService.getDriverLocation(driverId),
    enabled: !!driverId && enabled,
    refetchInterval: 5000, // Update every 5 seconds
  })
}
